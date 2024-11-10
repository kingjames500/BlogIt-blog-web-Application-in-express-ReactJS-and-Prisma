import React from "react";

import "./AuthorOtherBlogs.css";

function AuthorOtherBlogs({ otherBlogs, isLoading }) {
  if (isLoading) return <p>Loading other blogs by this author...</p>;
  if (!otherBlogs || otherBlogs.length === 0) return null;

  return (
    <div className="author-blogs-section">
      <h3>More from this Author</h3>
      <ul>
        {otherBlogs.map((blog) => (
          <li key={blog.id} className="author-blog-item">
            <h4>{blog.title}</h4>
            <p>{blog.excerpt}</p>
            <button onClick={() => navigate(`/blog/${blog.id}`)}>
              Read More
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorOtherBlogs;
