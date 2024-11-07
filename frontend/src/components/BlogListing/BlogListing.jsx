import React from "react";
import { useQuery } from "react-query";
import apiUrl from "../../utils/apiUrl";
import "./BlogListing.css";
import defaultUserAvatar from "../../assets/images/default user avatar.png";
import formatDateToReadable from "../../utils/eventsDate.js";
import { useNavigate } from "react-router-dom";

function ArticleCard({
  authorAvatar,
  authorName,
  blogTitle,
  blogExcept,
  blogImageUrl,
  createdAt,
  updatedAt,
  id,
}) {
  // Function to limit the excerpt to 20 words on the blog listing page
  const getExcerpt = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  const limitedExcerpt = getExcerpt(blogExcept, 20);
  const limitedTitle = getExcerpt(blogTitle, 9);
  const avatar = authorAvatar ? authorAvatar : defaultUserAvatar;
  const formattedCreatedAt = formatDateToReadable(createdAt);
  const formattedUpdatedAt = formatDateToReadable(updatedAt);

  // handle submit button to redirect to the blog details page using the blog id
  const navigate = useNavigate();
  const handleNavigateToFullBlog = () => {
    if (!id) return;
    navigate(`/blog/${id}`);
  };

  return (
    <div className="article-card">
      <div className="author-info">
        <img src={avatar} alt={authorName} className="author-image" />
        <div className="author-name">{authorName}</div>
      </div>

      <div className="content-section">
        <div className="text-content">
          <h2 className="article-title">{limitedTitle}</h2>
          <p className="article-subtitle">⚡{limitedExcerpt}⚡</p>
        </div>
        <img src={blogImageUrl} alt="Article" className="article-image" />
      </div>

      <div className="article-footer">
        <span className="date">posted on {formattedCreatedAt}</span>
        <span className="views">updated on {formattedUpdatedAt}</span>
      </div>
      <button className="read-more-button" onClick={handleNavigateToFullBlog}>
        Read More
      </button>
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
    return <div className="loading"></div>;
  }

  if (isError) {
    return <div className="error">{error.message}</div>;
  }
  return (
    <div className="blog-container">
      {data.map((blog) => (
        <ArticleCard
          key={blog.id}
          authorAvatar={blog.user.avatar}
          authorName={blog.user.firstName + " " + blog.user.lastName}
          blogTitle={blog.title}
          blogExcept={blog.excerpt}
          blogImageUrl={blog.imageUrl}
          createdAt={blog.createdAt}
          updatedAt={blog.updatedAt}
          id={blog.id}
        />
      ))}
    </div>
  );
}

export default BlogListing;
