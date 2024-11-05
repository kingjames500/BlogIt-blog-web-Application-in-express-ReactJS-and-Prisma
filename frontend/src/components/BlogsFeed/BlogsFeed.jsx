import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import apiUrl from "../../utils/apiUrl";
import "primeicons/primeicons.css";
import Errors from "../Errors/Errors";
import formatDateToReadable from "../../utils/eventsDate";

import "./BlogsFeed.css";

const BlogPost = ({ feedTitle, feedExcerpt, feedDate, feedAuthor }) => {
  const publishedDate = formatDateToReadable(feedDate);
  return (
    <div className="blog-container-card">
      <h1 className="feed-title">{feedTitle}</h1>
      <p className="feed-excerpt">{feedExcerpt}</p>
      <div className="blog-footer">
        <div className="profile">
          <div>
            <p className="author-name-feed">
              <i
                className="pi pi-user"
                style={{
                  marginRight: "0.4rem",
                  fontSize: "1.8rem",
                  backgroundColor: "var(--color-tertiary)",
                  color: "var(--color-secondary)",
                  fontWeight: "bolder",
                }}
              ></i>
              {feedAuthor}
            </p>
            <p className="timestamp">
              <i
                className="pi pi-clock"
                style={{
                  marginRight: "0.5rem",
                  fontSize: "1.8rem",
                  backgroundColor: "var(--color-tertiary)",
                  color: "var(--color-secondary)",
                  fontWeight: "bolder",
                }}
              ></i>
              posted on {publishedDate}
            </p>
          </div>
        </div>
        <div className="buttons">
          <button className="button edit-button">update</button>
          <button className="button delete-button">delete</button>
        </div>
      </div>
    </div>
  );
};

function BlogsFeed() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["authorBlogs"],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/blogs/author`, {
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

  return (
    <div className="feed-container">
      {isLoading ? (
        <div className="loading-container">
          <ProgressSpinner />
        </div>
      ) : isError ? (
        <Errors error={error} />
      ) : data.length === 0 ? (
        <div>
          <p>You have no blogs yet.</p>
          <Link to="/create-blog" className="create-blog-link">
            Create your first blog
          </Link>
        </div>
      ) : (
        data.data.map((blog) => (
          <BlogPost
            key={blog.id}
            feedTitle={blog.title}
            feedExcerpt={blog.excerpt}
            feedDate={blog.createdAt}
            feedAuthor={blog.user.username}
          />
        ))
      )}
    </div>
  );
}

export default BlogsFeed;
