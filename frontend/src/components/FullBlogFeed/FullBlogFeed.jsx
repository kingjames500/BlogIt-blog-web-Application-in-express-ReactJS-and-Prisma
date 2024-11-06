import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import apiUrl from "../../utils/apiUrl";
import formatDateToReadable from "../../utils/eventsDate";
import defaultUserAvatar from "../../assets/images/default user avatar.png";
import "./FullBlogFeed.css";

function FullBlogFeed() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/blog/${id}`, {
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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const avatar = data.user.avatar ? data.user.avatar : defaultUserAvatar;
  return (
    <div className="full-blog-container">
      <div className="blog-header"></div>
      <h1 className="fullblog-title">{data.title}</h1>
      <div className="fullblog-profile">
        <div className="fullblog-profile-image">
          <img src={avatar} alt="profile" />
        </div>
        <div>
          <p className="fullblog-author">
            by {data.user.firstName} {data.user.lastName}
          </p>
          <p className="fullblog-timestamp">
            updated on {formatDateToReadable(data.updatedAt)}
          </p>
        </div>
      </div>
      <div className="blog-image">
        <img src={data.imageUrl} alt="Blog" />
      </div>
      <p className="fullblog-excerpt">{data.excerpt}</p>
      <div className="blog-data-content">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      </div>
    </div>
  );
}

export default FullBlogFeed;
