import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AuthorDashboard.css';

const AuthorDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('https://vishwajeets-blog.onrender.com/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
          setName(response.data.username);
          setEmail(response.data.email);
          fetchPosts(response.data._id); // Fetch posts after setting the user
        })
        .catch((error) => console.error('Error fetching user profile:', error));
    }
  }, []);

  const fetchPosts = async (userId) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://vishwajeets-blog.onrender.com/users/posts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', name);
    formData.append('email', email);
    if (avatar) formData.append('avatar', avatar);

    try {
      const token = localStorage.getItem('token');
      await axios.put('https://vishwajeets-blog.onrender.com/users/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://vishwajeets-blog.onrender.com/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Author Dashboard</h1>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      ) : (
        <>
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Update Profile</h5>
                  <form onSubmit={handleUpdateProfile}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="avatar">Avatar</label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="avatar"
                        onChange={(e) => setAvatar(e.target.files[0])}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                      Update Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* My Posts Section */}
          <h2 className="section-title">My Posts</h2>
          <div className="row g-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div className="col-md-6 col-lg-4" key={post._id}>
                  <div className="card post-card">
                    {post.image && (
                      <img
                        src={`https://vishwajeets-blog.onrender.com/${post.image}`}
                        className="post-card-img"
                        alt={post.title}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">{post.content}</p>
                      <Link
                        to={`/edit/${post._id}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="btn btn-danger mt-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted text-center w-100">No posts found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AuthorDashboard;
