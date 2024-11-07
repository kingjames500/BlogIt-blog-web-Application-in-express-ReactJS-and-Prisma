import React from "react";
import { useQuery } from "react-query";
import apiUrl from "../../utils/apiUrl";
import ArticleCard from "./ArticleCard";
import "./BlogListing.css";
import defaultUserAvatar from "../../assets/images/default user avatar.png";
import formatDateToReadable from "../../utils/eventsDate.js";
import { useNavigate } from "react-router-dom";

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
    cacheTime: Infinity,
  });

  if (isLoading) {
    return <div className="loading"></div>;
  }

  if (isError) {
    return <div className="error">{error.message}</div>;
  }
  return (
    <div className="blog-container">
      {data.map((blog) => {
        const authorAvatar =
          blog.user?.profile?.profileImageUrl || defaultUserAvatar;

        return (
          <ArticleCard
            key={blog.id}
            authorAvatar={authorAvatar}
            authorName={`${blog.user.firstName} ${blog.user.lastName}`}
            blogTitle={blog.title}
            blogExcept={blog.excerpt}
            blogImageUrl={blog.blogImageUrl}
            createdAt={blog.createdAt}
            updatedAt={blog.updatedAt}
            id={blog.id}
          />
        );
      })}
    </div>
  );
}

export default BlogListing;
