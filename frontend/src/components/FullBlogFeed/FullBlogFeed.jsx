import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import apiUrl from "../../utils/apiUrl";
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
  return (
    <div>
      <img src={data.imageUrl} alt="" />
      <h2>{data.title}</h2>
      <p>
        By: {data.user.firstName} {data.user.lastName}
      </p>
      <p>{data.excerpt}</p>
      <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
    </div>
  );
}

export default FullBlogFeed;
