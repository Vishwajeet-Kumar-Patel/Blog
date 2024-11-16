import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css';

const About = () => {
  return (
    <div className="container mt-5 about-container">
      <h1 className="display-4 text-center mb-4">About Vishwajeet's Blog</h1>

      <section className="intro">
        <p className="lead text-center">
          Welcome to Vishwajeet's Blog – a platform where creativity meets community. 
          Here, we provide a space where writers, readers, and content creators can come together to share ideas, inspire one another, and grow. 
        </p>
      </section>

      <section className="our-mission">
        <h2 className="h3 text-primary">Our Mission</h2>
        <p>
          At Vishwajeet's Blog, our mission is simple: to empower individuals to share their voices and connect through storytelling. 
          Whether you're an experienced writer or just starting, we believe that everyone has a unique story to tell. 
          Our platform serves as an open space for all kinds of creators—from bloggers to professional writers, from journalists to poets—to showcase their work and engage with a like-minded community.
        </p>
        <p>
          We're more than just a blogging platform; we're a hub for creativity and self-expression. Our goal is to foster a welcoming and supportive environment where ideas can flourish and where everyone, regardless of background or experience level, can find their place.
        </p>
      </section>

      <section className="why-choose-us">
        <h2 className="h3 text-primary">Why Choose Vishwajeet's Blog?</h2>
        <ul>
          <li>
            <strong>User-Friendly Interface:</strong> We’ve designed a platform that’s easy to use for beginners and experienced bloggers alike. 
            With a clean, modern interface, creating and publishing content is simple and intuitive.
          </li>
          <li>
            <strong>Community-Driven:</strong> Our readers and writers are the heart of our platform. Join a community where your voice matters and where you can connect with others who share your passions.
          </li>
          <li>
            <strong>Personalized Experience:</strong> Whether you're writing about travel, technology, lifestyle, or personal stories, Vishwajeet's Blog offers a variety of customizable features that allow you to tailor your content to your audience.
          </li>
          <li>
            <strong>Free and Accessible:</strong> Anyone can start writing and publishing for free. We believe in democratizing creativity and providing access to anyone with a passion for writing.
          </li>
        </ul>
      </section>

      <section className="how-to-get-started">
        <h2 className="h3 text-primary">How to Get Started</h2>
        <p>
          Getting started on Vishwajeet's Blog is easy. Follow these simple steps to start sharing your content with the world:
        </p>
        <ol>
          <li>Sign up for a free account to create your profile.</li>
          <li>Start writing! Share your stories, ideas, or personal experiences.</li>
          <li>Publish your content and share it with your audience.</li>
          <li>Engage with readers through comments, shares, and feedback.</li>
        </ol>
        <p>
          It’s that simple! Whether you're writing for fun or looking to build your personal brand, Vishwajeet's Blog gives you the tools you need to succeed.
        </p>
      </section>

      <section className="join-us">
        <h2 className="h3 text-primary">Join Us Today</h2>
        <p>
          Vishwajeet's Blog is constantly evolving, and we’re always looking for passionate people to join our community. 
          Whether you're a writer, reader, or someone just starting out, we would love to have you here. 
          Start creating and sharing your content today!
        </p>
        <p className="text-center">
          <a href="/signup" className="btn btn-primary btn-lg">Sign Up Now</a>
        </p>
      </section>
    </div>
  );
};

export default About;
