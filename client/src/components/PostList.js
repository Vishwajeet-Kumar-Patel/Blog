import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [commentContent, setCommentContent] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchUserProfile(token);
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('https://vishwajeets-blog.onrender.com/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPosts = async (page) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://vishwajeets-blog.onrender.com/posts', {
        params: { page, limit: 10 },
      });
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://vishwajeets-blog.onrender.com/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Error deleting post');
    }
  };

  const handleLike = async (postId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `https://vishwajeets-blog.onrender.com/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(posts.map((post) => (post._id === postId ? response.data : post)));
    } catch (err) {
      console.error('Error liking post:', err);
      alert('Error liking post');
    }
  };

  const handleComment = async (postId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `https://vishwajeets-blog.onrender.com/posts/${postId}/comment`,
        { content: commentContent[postId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(posts.map((post) => (post._id === postId ? response.data : post)));
      setCommentContent({ ...commentContent, [postId]: '' });
    } catch (err) {
      console.error('Error commenting on post:', err);
      alert('Error commenting on post');
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === 'myPosts' && user && post.author._id !== user._id) return false;
    if (categoryFilter && post.category !== categoryFilter) return false;
    if (tagFilter && !post.tags.includes(tagFilter)) return false;
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase()) && !post.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const renderPostCard = (post) => (
    <div className="post-card" key={post._id}>
      <div className="card">
        {post.image && <img src={`https://vishwajeets-blog.onrender.com/${post.image}`} className="card-img-top post-image" alt={post.title} />}
        <div className="card-body">
          <h5 className="post-title">{post.title}</h5>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) }} />
          <p className="post-category"><strong>Category:</strong> {post.category}</p>
          <p className="post-tags"><strong>Tags:</strong> {post.tags.join(', ')}</p>
          <Link to={`/posts/${post._id}`} className="btn btn-primary w-100 mb-2">Read More</Link>
          {user && user._id === post.author._id && (
            <button onClick={() => handleDelete(post._id)} className="btn btn-danger w-100 mb-2">Delete</button>
          )}
          <button onClick={() => handleLike(post._id)} className={`btn btn-${post.likes.includes(user?._id) ? 'secondary' : 'outline-primary'} w-100 mb-2`}>
            {post.likes.includes(user?._id) ? 'Unlike' : 'Like'} ({post.likes.length})
          </button>
          <textarea
            value={commentContent[post._id] || ''}
            onChange={(e) => setCommentContent({ ...commentContent, [post._id]: e.target.value })}
            className="form-control comment-box mb-2"
            placeholder="Add a comment..."
          />
          <button onClick={() => handleComment(post._id)} className="btn btn-success w-100">Submit Comment</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Explore Blog Posts</h1>
      <div className="filters d-flex flex-wrap justify-content-between mb-4">
        <div className="btn-group">
          <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('all')}>All Posts</button>
          <button className={`btn ${filter === 'myPosts' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('myPosts')}>My Posts</button>
        </div>
        <div className="d-flex">
          <select className="form-select me-2" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All Categories</option>
            <option value="education">Education</option>
            <option value="fitness">Fitness</option>
            <option value="entertainment">Entertainment</option>
            <option value="technology">Technology</option>
          </select>
          <input type="text" className="form-control me-2" placeholder="Filter by tag" value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} />
          <input type="text" className="form-control" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>
      {loading ? (
        <div className="spinner-border text-center" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <>
          <div className="post-grid">
            {filteredPosts.map(renderPostCard)}
          </div>
          <div className="pagination mt-4 text-center">
            {[...Array(totalPages)].map((_, idx) => (
              <button key={idx} onClick={() => setCurrentPage(idx + 1)} className={`btn btn-outline-primary me-2 ${currentPage === idx + 1 ? 'active' : ''}`}>
                {idx + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;
