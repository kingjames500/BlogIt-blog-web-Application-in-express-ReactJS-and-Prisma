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
  // return (
  //   <div>
  //     <img src={data.imageUrl} alt="" />
  //     <h2>{data.title}</h2>
  //     <p>
  //       By: {data.user.firstName} {data.user.lastName}
  //     </p>
  //     <p>{data.excerpt}</p>
  //     <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
  //   </div>
  // );

  return (
    <div className="full-blog-container">
      <div className="blog-header"></div>
      <h1 className="fullblog-title">This is John Doe's first post edited!</h1>
      <div className="fullblog-profile">
        <div className="fullblog-profile-image">
          <img src="https://via.placeholder.com/40" alt="profile" />
        </div>
        <div>
          <p className="fullblog-author"> John Doe</p>
          <p className="fullblog-timestamp">updated on</p>
        </div>
      </div>
      <div className="blog-image">
        <img src="https://via.placeholder.com/300" alt="Blog" />
      </div>
      <p className="fullblog-excerpt">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isn't
        anything embarrassing hidden in the middle of text. All the Lorem Ipsum
        generators on the Internet tend to repeat predefined chunks as
        necessary, making this the first true generator on the Internet. It uses
        a dictionary of over 200 Latin words, combined with a handful of model
        sentence structures, to generate Lorem Ipsum which looks reasonable. The
        generated Lorem Ipsum is therefore always free from repetition, injected
        humour, or non-characteristic words etc.
      </p>

      <p className="fullblog-content">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isn't
        anything embarrassing hidden in the middle of text. All the Lorem Ipsum
        generators on the Internet tend to repeat predefined chunks as
        necessary, making this the first true generator on the Internet. It uses
        a dictionary of over 200 Latin words, combined with a handful of model
        sentence structures, to generate Lorem Ipsum which looks reasonable. The
        generated Lorem Ipsum is therefore always free from repetition, injected
        humour, or non-characteristic words etc.
      </p>
    </div>
  );
}

export default FullBlogFeed;
