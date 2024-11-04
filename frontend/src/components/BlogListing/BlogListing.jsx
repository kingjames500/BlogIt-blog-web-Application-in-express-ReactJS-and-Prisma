import React from "react";
import { useQuery } from "react-query";
import apiUrl from "../../utils/apiUrl";
import "./BlogListing.css";

function ArticleCard({
  authorAvatar,
  authorName,
  blogTitle,
  blogExcept,
  blogImageUrl,
}) {
  const getExcerpt = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  const limitedExcerpt = getExcerpt(blogExcept, 20);

  return (
    <div className="article-card">
      <div className="author-info">
        <img src={authorAvatar} alt={authorName} className="author-image" />
        <div className="author-name">{authorName}</div>
      </div>

      <div className="content-section">
        <div className="text-content">
          <h2 className="article-title">{blogTitle}</h2>
          <p className="article-subtitle">⚡{limitedExcerpt}⚡</p>
        </div>
        <img src={blogImageUrl} alt="Article" className="article-image" />
      </div>

      <div className="article-footer">
        <span className="date">Aug 1, 2023</span>
        <span className="views">👁️ 50</span>
      </div>
      <button className="read-more-button">Read More</button>
    </div>
  );
}

function BlogListing() {
  const { isLoading, isError, error, data } = useQuery({
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/blogs`, {
        credentials: "include",
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div className="error">{error.message}</div>;
  }
  return (
    <div className="blog-container">
      {data.data.map((blog) => (
        <ArticleCard
          key={blog.id}
          authorAvatar={blog.user.avatar}
          authorName={blog.user.firstName + " " + blog.user.lastName}
          blogTitle={blog.title}
          blogExcept={blog.excerpt}
          blogImageUrl={blog.imageUrl}
        />
      ))}
    </div>
  );
}

export default BlogListing;
