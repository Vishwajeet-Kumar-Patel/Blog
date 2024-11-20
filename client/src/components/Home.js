import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        // Fetch the first 3 posts from the server to display as featured
        const response = await axios.get('http://localhost:5000/posts');
        console.log('Fetched posts:', response.data); // Log the fetched posts
        if (Array.isArray(response.data.posts)) {
          // Assume the first 3 posts are featured
          setFeaturedPosts(response.data.posts.slice(0, 3));
        } else {
          console.error('Fetched data is not an array:', response.data);
          throw new Error('Fetched data is not an array');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchFeaturedPosts();
  }, []); // This runs only once when the component is mounted

  // This will update the active index to create the carousel effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (featuredPosts.length > 0) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % featuredPosts.length);
      }
    }, 3000); // Change every 3 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [featuredPosts]);

  /* Render carousel indicators
  const renderCarouselIndicators = () =>
    featuredPosts.map((_, index) => (
      <li
        key={index}
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to={index}
        className={activeIndex === index ? 'active' : ''}
      ></li>
    )); */

  // Render carousel items (images and content)
  const renderCarouselItems = () =>
    featuredPosts.map((post, index) => (
      <div key={post._id} className={`carousel-item ${activeIndex === index ? 'active' : ''}`}>
        {post.image && (
          <img
            src={`http://localhost:5000/${post.image}`} // Assuming your API returns the correct path for the image
            className="d-block w-100"
            alt={post.title}
          />
        )}
        <div className="carousel-caption d-none d-md-block">
          <h5>{post.title}</h5>
        </div>
      </div>
    ));

  // Render the featured blogs in the grid below the carousel
  const renderFeaturedBlogs = () =>
    featuredPosts.map((post) => (
      <div className="col-md-4" key={post._id}>
        <div className="card mb-4 shadow-sm">
          {post.image && (
            <img
              src={`http://localhost:5000/${post.image}`} // Same image path as the carousel
              className="card-img-top"
              alt={post.title}
            />
          )}
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text"><strong>Author:</strong> {post.author.username}</p>
            <p className="card-text"><strong>Date:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
            <div
              className="card-text"
              dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200) + '...' }}
            />
            <Link to={`/posts/${post._id}`} className="btn btn-primary">
              Read More
            </Link>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="container mt-5 home-container">
      {/* Carousel Section */}
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">{renderCarouselItems()}</div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>

      {/* Buttons Section */}
      <div className="d-flex justify-content-center mt-4">
        <Link className="btn btn-info btn-lg me-2" to="/posts">
          View Posts
        </Link>
        <Link className="btn btn-secondary btn-lg me-2" to="/create">
          Create Post
        </Link>
        <Link className="btn btn-info btn-lg" to="/dashboard">
          Author Dashboard
        </Link>
      </div>

      {/* Featured Blogs Section */}
      <h2 className="mt-5">Featured Blogs</h2>
      <div className="row featured-blogs mt-3">{renderFeaturedBlogs()}</div>

      {/* Footer Section */}
      <footer className="bg-dark text-center text-lg-start mt-5 text-white">
        <div className="container p-4">
          <div className="row">
            {/* About Section */}
            <div className="col-lg-6 col-md-12 mb-4">
              <h5 className="text-uppercase">About Vishwajeet's Blog</h5>
              <p>
                Vishwajeet's Blog is a platform where you can share your thoughts and ideas with the world. Join us to
                explore and create amazing content.
              </p>
            </div>

            {/* Links Section */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" className="text-light">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-light">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/posts" className="text-light">
                    Posts
                  </Link>
                </li>
                <li>
                  <Link to="/create" className="text-light">
                    Create Post
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="text-uppercase">Contact</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="mailto:vishwajeetkumarpatelmgs@gmail.com" className="text-light">
                    Email Us
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/the_dead_vibe" className="text-light">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/vishwajeet-kumar-00b817239/" className="text-light">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/vishwajeet_kumar_patel" className="text-light">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center p-3 bg-dark">
          © 2023 Vishwajeet's Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;