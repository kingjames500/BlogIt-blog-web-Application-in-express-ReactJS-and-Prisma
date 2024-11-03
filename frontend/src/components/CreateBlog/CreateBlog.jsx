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
import { uploadPreset, cloudName } from "../../utils/cloudinaryDetails";
import { useNavigate } from "react-router-dom";

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogDetails),
      });

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

  //uploading image to cloudinary and getting a secure url
  const uploadImage = async (files) => {
    const formData = new FormData();

    formData.append("file", files[0]);
    formData.append("upload_preset", uploadPreset);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    if (response.ok === false) {
      const error = await response.json();
      toast.error(error.message, {
        duration: 2000,
      });
    }
    const data = await response.json();
    setImageUrl(data.secure_url);
    console.log(data.secure_url);
  };

  return (
    <div className="form-container">
      <Card title="Create a Blog Post" className="p-shadow-3 custom-card">
        <Toaster position="top-center" richColors expand={true} />
        <form onSubmit={handleSubmit}>
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
            label="Create Blog"
            icon="pi pi-check"
            className="p-button p-mt-2"
          />
        </form>
      </Card>
    </div>
  );
};

export default CreateBlog;
