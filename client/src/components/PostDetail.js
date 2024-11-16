import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';

const PostDetail = () => {
  const { id } = useParams(); // Extract post ID from URL
  const [post, setPost] = useState(null); // Post data
  const [user, setUser] = useState(null); // Current logged-in user
  const navigate = useNavigate(); // Navigation handler

  useEffect(() => {
    // Fetch the current user's profile
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/users/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    // Fetch the post details
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchUserProfile();
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Post deleted successfully');
      navigate('/posts'); // Redirect to posts list
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  if (!post) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading post details...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Title and Actions */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4">{post.title}</h1>
        {user && user._id === post.author._id && (
          <div>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => navigate(`/edit/${post._id}`)}
            >
              <i className="fas fa-pen"></i> Edit
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              <i className="fas fa-trash"></i> Delete
            </button>
          </div>
        )}
      </div>

      {/* Image */}
      {post.image && (
        <img
          src={`http://localhost:5000/${post.image}`}
          className="img-fluid rounded mb-4"
          alt={post.title}
        />
      )}

      {/* Author Info */}
      <div className="d-flex align-items-center mb-4">
        <img
          src={`http://localhost:5000/${post.author.avatar}`}
          alt="Author Avatar"
          className="rounded-circle me-2"
          width="50"
          height="50"
        />
        <p className="mb-0">
          <strong>{post.author.username}</strong>
        </p>
      </div>

      {/* Content */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} className="mb-4"></div>

      {/* Metadata */}
      <p>
        <strong>Category:</strong> {post.category}
      </p>
      <p>
        <strong>Tags:</strong> {post.tags.join(', ')}
      </p>

      {/* Comments Section */}
      <div className="mt-5">
        <h5>Comments</h5>
        {post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment._id} className="border p-3 rounded mb-3">
              <div className="d-flex align-items-center mb-2">
                <img
                  src={`http://localhost:5000/${comment.user.avatar}`}
                  alt="Commenter Avatar"
                  className="rounded-circle me-2"
                  width="30"
                  height="30"
                />
                <p className="mb-0">{comment.user.username}</p>
              </div>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
