import React from "react";
import { useQuery } from "react-query";
import apiUrl from "../../utils/apiUrl";
import ArticleCard from "./ArticleCard";
import "./BlogListing.css";
import defaultUserAvatar from "../../assets/images/default user avatar.png";
import Errors from "../Errors/Errors";
import { ProgressSpinner } from "primereact/progressspinner";

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
    return (
      <div className="loading-container">
        <ProgressSpinner />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <Errors
        error="No blogs found"
        linkPath="/create-blog"
        linkText="Create a blog"
      />
    );
  }

  if (isError) {
    return (
      <Errors
        error="there was a problem while fetching the blogs"
        linkPath="/blogs"
        linkText={
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        }
      />
    );
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
            blogImageUrl={blog.imageUrl}
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
