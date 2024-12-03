import React, { useState } from "react";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


export default function CreateEducation({ closeModal }) {
  const initialFormData = {
    headerImage: null,
    thumbnail: null,
    title: "",
    description: "",
    content: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        [name]: file,
      });
    }
  };

  const handleContentChange = (value) => {
    setFormData({
      ...formData,
      content: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.headerImage ||
      !formData.thumbnail ||
      !formData.title ||
      !formData.description ||
      !formData.content
    ) {
      Swal.fire("Error!", "All fields are required.", "error");
      return;
    }

    //Form Data
    const form = new FormData();
    form.append("headerImage", formData.headerImage);
    form.append("thumbnail", formData.thumbnail);
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("content", formData.content);

    
    try {
      const response = await fetch("https://relience-test-backend.onrender.com/api/v1/education", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        Swal.fire("Success", "Education Created Successfully!", "success");
        clearForm();
        closeModal();
      } else {
        const errorData = await response.json();
        console.error("Failed to submit form:", errorData);
        Swal.fire("Error!", "Failed to create Education.", "error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire("Error!", "An unexpected error occurred.", "error");
    }
  };

  const clearForm = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="form-container">
      <div className="close" onClick={closeModal}>
        X
      </div>
      <h2 className="form-title">Create Patient Education</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Header Image</label>
          <input
            type="file"
            name="headerImage"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            className="form-editor"
            placeholder="Write detailed content here..."
          />
        </div>

        <div className="button-group">
          <button type="submit" className="submit-button">
            Submit
          </button>
          <button type="button" onClick={clearForm} className="clear-button">
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}
