import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toaster, toast } from "sonner";
import apiUrl from "../../utils/apiUrl";
import "primeicons/primeicons.css";
import Errors from "../Errors/Errors";
import formatDateToReadable from "../../utils/eventsDate";

import "./BlogsFeed.css";

const BlogPost = ({
  id,
  feedTitle,
  feedExcerpt,
  feedDate,
  feedAuthor,
  onDelete,
  redirectToUpdate,
}) => {
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
          <button
            className="button edit-button"
            onClick={() => redirectToUpdate(id)}
          >
            update
          </button>
          <button className="button delete-button" onClick={() => onDelete(id)}>
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

function BlogsFeed() {
  const queryClient = useQueryClient();

  const redirect = useNavigate();

  // function for deleting a blog
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${apiUrl}/blog/author/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["authorBlogs"]);
      toast.info("Blog deleted successfully", { duration: 5000 });
    },
    onError: (error) => {
      toast.error(error.message, { duration: 5000 });
    },
  });

  // fetching the blogs for a single user
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

  // function for updating a blog so that it can be reloaded
  const handleUpdateBlogRedirect = (id) => {
    if (!id) return;
    redirect(`/update-blog/${id}`);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <ProgressSpinner />
      </div>
    );
  }
  if (isError) {
    return (
      <Errors error={error} linkPath="/blogs" linkText="read existing blogs" />
    );
  }
  if (data && data.data.length === 0) {
    return (
      <div className="no-blogs-container">
        {" "}
        <p>You have no blogs yet.</p>{" "}
        <Link to="/create-blog" className="create-blog-link">
          {" "}
          Create your first blog{" "}
        </Link>{" "}
      </div>
    );
  }
  return (
    <div className="feed-container">
      <Toaster position="top-center" richColors expand={true} />{" "}
      {data &&
        data.data.map((blog, i) => (
          <BlogPost
            key={i}
            feedTitle={blog.title}
            feedExcerpt={blog.excerpt}
            feedDate={blog.createdAt}
            feedAuthor={blog.user.username}
            onDelete={deleteMutation.mutate}
            redirectToUpdate={handleUpdateBlogRedirect}
            id={blog.id}
          />
        ))}{" "}
    </div>
  );
}

export default BlogsFeed;
