import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill';
import '../styles.css';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://vishwajeets-blog.onrender.com/posts/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setCategory(response.data.category);
        setTags(response.data.tags.join(', '));
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedContent = content.replace(/<span class="ql-cursor">﻿<\/span>/g, '');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', cleanedContent);
    formData.append('category', category);
    formData.append('tags', tags);
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://vishwajeets-blog.onrender.com/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error(error);
      alert('Error updating post');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="display-4 text-center mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="form-control"
            id="content"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="education">Education</option>
            <option value="fitness">Fitness</option>
            <option value="entertainment">Entertainment</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            className="form-control"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg mt-3">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
