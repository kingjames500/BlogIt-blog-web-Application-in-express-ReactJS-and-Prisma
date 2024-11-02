import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'quill/dist/quill.snow.css';
import './CreateBlog.css'; // Add custom styles here

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleTextChange = (e) => {
        setContent(e.htmlValue);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        const formData = new FormData();
        formData.append('title', title);
        formData.append('excerpt', excerpt);
        formData.append('content', content);
        formData.append('image', image);

        console.log(formData);
        // Add your form submission logic here
    };

    return (
        <div className="p-d-flex p-jc-center">
            <Card title="Create a Blog Post" className="p-shadow-3">
                <form onSubmit={handleSubmit}>
                    <div className="p-field">
                        <label htmlFor="title" className="p-d-block">Title</label>
                        <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="p-inputtext-lg p-d-block" />
                    </div>

                    <div className="p-field">
                        <label htmlFor="excerpt" className="p-d-block">Excerpt</label>
                        <InputText id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="p-inputtext-lg p-d-block" />
                    </div>

                    <div className="p-field">
                        <label htmlFor="image" className="p-d-block">Image</label>
                        <input type="file" id="image" onChange={handleImageChange} className="p-d-block" />
                    </div>

                    <div className="p-field">
                        <label htmlFor="content" className="p-d-block">Content</label>
                        <Editor id="content" value={content} onTextChange={handleTextChange} style={{ height: '200px' }} />
                    </div>

                    <Button type="submit" label="Create Blog" icon="pi pi-check" className="p-mt-2" />
                </form>
            </Card>
        </div>
    );
};

export default CreateBlog;
