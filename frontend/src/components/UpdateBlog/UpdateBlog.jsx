import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "quill/dist/quill.snow.css";
import "../CreateBlog/CreateBlog.css";
import apiUrl from "../../utils/apiUrl";
import { Toaster, toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

import Errors from "../Errors/Errors";

import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

function UpdateBlog() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { blogId } = useParams();
  const redirect = useNavigate();

  const { isLoading, isError, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/blog/${blogId}`, {
        credentials: "include",
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }
      console.log(response);
      const data = await response.json();
      return data;
    },

    onSuccess: (data) => {
      setContent(data.content);
      setExcerpt(data.excerpt);
      setTitle(data.title);
    },
  });

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return (
      <Errors
        error={error}
        linkPath="/blogs-feed"
        linkText=" return back to blog's feed"
      />
    );
  }
  return (
    <div className="form-container">
      <Card title="Create a Blog Post" className="p-shadow-3 custom-card">
        <Toaster position="top-center" richColors expand={true} />
        <form>
          <div className="p-field">
            <label htmlFor="title" className="p-d-block">
              Title
            </label>
            <InputText
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-inputtext-lg p-d-block"
            />
          </div>

          <div className="p-field">
            <label htmlFor="excerpt" className="p-d-block">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="p-inputtext-lg p-d-block"
              style={{ height: "100px" }}
            />
          </div>

          <div className="p-field">
            <label htmlFor="image" className="p-d-block">
              {" "}
              blog image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => uploadImage(e.target.files)}
              className="p-d-block"
            />
          </div>

          <div className="p-field">
            <label htmlFor="content" className="p-d-block">
              Body
            </label>
            <Editor
              id="content"
              value={content}
              onTextChange={(e) => setContent(e.htmlValue)}
              style={{ height: "13rem" }}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            label={isLoading ? "Updating Blog" : "Update Blog"}
            icon="pi pi-check"
            className="p-button p-mt-2"
          />
        </form>
      </Card>
    </div>
  );
}

export default UpdateBlog;
