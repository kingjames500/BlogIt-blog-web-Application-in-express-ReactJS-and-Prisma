import React, { useState, useEffect } from "react";
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
import imageUploadToCloudinary from "../../utils/ImageUpload/imageUploadToCloudinary";
import Errors from "../Errors/Errors";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

function UpdateBlog() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { blogId } = useParams();
  const redirect = useNavigate();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/blog/${blogId}`, {
        credentials: "include",
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data;
    },

    onSuccess: (data) => {
      setTitle(data.title);
      setExcerpt(data.excerpt);
      setImageUrl(data.imageUrl);
      setContent(data.content);
    },
  });

  //mutate function for updating the blogs

  const { mutate, isLoading: progressLoading } = useMutation({
    mutationFn: async function (blogObjInformation) {
      const response = await fetch(`${apiUrl}/blog/update/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogObjInformation),
        credentials: "include",
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },

    onSuccess: (data) => {
      toast.success("Blog Updated Successfully", {
        duration: 2000,
      });

      setTimeout(() => {
        redirect(`/blog/${blogId}`);
      }, 3000);
    },

    onError: (error) => {
      toast.error(error.message, {
        duration: 2000,
      });
    },
  });

  const handleImageUpload = async (files) => {
    if (files && files[0]) {
      const imageCloudUrl = await imageUploadToCloudinary(files[0]);

      if (imageCloudUrl) {
        setImageUrl(imageCloudUrl);
      }
    }
  };

  useEffect(() => {
    if (title === "someValue") {
      mutate({ title, excerpt, content, imageUrl });
    }
  }, [title, excerpt, content, imageUrl]);

  if (isLoading || progressLoading) {
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
            disabled={progressLoading}
           
            label={progressLoading ? "Updating Blog" : "Update Blog"}
            icon="pi pi-check"
            className="p-button p-mt-2"
          />
        </form>
      </Card>
    </div>
  );
}

export default UpdateBlog;
