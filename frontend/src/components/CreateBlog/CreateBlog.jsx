import React, { useState } from "react";
import { useMutation } from "react-query";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "quill/dist/quill.snow.css";
import "./CreateBlog.css";
import apiUrl from "../../utils/apiUrl";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import imageUploadToCloudinary from "../../utils/ImageUpload/imageUploadToCloudinary";
import { ProgressSpinner } from "primereact/progressspinner";
import Errors from "../Errors/Errors";


const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const redirect = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async function (blogDetails) {
      const response = await fetch(`${apiUrl}/create-blog`, {
        method: "POST",
        body: JSON.stringify(blogDetails),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(response);

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Blog created successfully", {
        duration: 5000,
      });
      setTimeout(() => {
        redirect("/blogs");
      }, 1500);
    },

    onError: (error) => {
      toast.error(error.message, {
        duration: 5000,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      excerpt,
      content,
      imageUrl,
    };
    mutate(newBlog);
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
      <Errors
        error="there was a problem while creating the blog"
        linkPath="/create-blog"
        linkText="navigate back to create blog"
      />
    );
    
  }

  const handleImageUpload = async (files) => {
    if (files && files[0]) {
      const url = await imageUploadToCloudinary(files[0]);
      if (url) {
        setImageUrl(url); // Set the URL in state if upload is successful
      }
    }
  };

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
              onChange={(e) => handleImageUpload(e.target.files)}
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
            label={isLoading ? "Creating..." : "Create Blog"}
            onClick={handleSubmit}
            icon="pi pi-check"
            className="p-button p-mt-2"
          />
        </form>
      </Card>
    </div>
  );
};

export default CreateBlog;
