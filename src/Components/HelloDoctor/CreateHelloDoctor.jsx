import React, { useState } from "react";
import Swal from "sweetalert2";

export default function CreateHelloDoctor({ closeModal }) {
  const initialFormData = {
    title: "",
    url: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.url) {
      Swal.fire("Error!", "Both Title and URL are required.", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/api/v1/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          url: formData.url,
        }),
      });

      if (response.ok) {
        Swal.fire("Success", "Video Created Successfully!", "success");
        clearForm();
        closeModal();
      } else {
        const errorData = await response.json();
        console.error("Failed to submit form:", errorData);
        Swal.fire("Error!", "Failed to create video.", "error");
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
      <h2 className="form-title">Create Video</h2>
      <form onSubmit={handleSubmit} className="form">
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
          <label>URL</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            className="form-input"
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
