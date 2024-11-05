import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import apiUrl from "../../utils/apiUrl";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";

import "./BlogsFeed.css";

function BlogsFeedCard({ feedTitle, feedDates, feedExcerpt }) {
  return (
    <div className="feed-card">
      {" "}
      <Card title={feedTitle} subTitle={feedExcerpt} className="p-mb-3">
        {" "}
        <div className="card-content">
          {" "}
          <p>{feedDates}</p>{" "}
        </div>
        <div className="btn-card-holder">
          <ButtonGroup className="multiple-button-cards">
            <Button label="Update" icon="pi pi-check" className="btn-update" />
            <Button label="Delete" icon="pi pi-trash" className="btn-delete" />
          </ButtonGroup>
        </div>
      </Card>
    </div>
  );
}

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
        <ProgressSpinner />
      ) : isError ? (
        <div>{error.message}</div>
      ) : (
        <div className="feed-container">
          {data.data.map((blog, i) => (
            <BlogsFeedCard
              key={i}
              feedTitle={blog.title}
              feedDates={blog.createdAt}
              feedExcerpt={blog.excerpt}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogsFeed;
