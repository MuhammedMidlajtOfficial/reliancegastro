import React, { useState } from "react";
import Swal from "sweetalert2";

export default function CreateBlog() {
  const initialFormData = {
    image: "",
    main: "",
    createdBy: "",
    heading: "",
    subheading: "",
    whereabout: "",
    about: [""],
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAboutChange = (index, value) => {
    const newAbout = [...formData.about];
    newAbout[index] = value;
    setFormData({
      ...formData,
      about: newAbout,
    });
  };

  const addAboutPoint = () => {
    setFormData({
      ...formData,
      about: [...formData.about, ""],
    });
  };

  const removeAboutPoint = (index) => {
    const newAbout = formData.about.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      about: newAbout,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
    console.log(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("image", formData.image);
    form.append("main", formData.main);
    form.append("createdBy", formData.createdBy);
    form.append("heading", formData.heading);
    form.append("subheading", formData.subheading);
    form.append("whereabout", formData.whereabout);
    form.append("about", JSON.stringify(formData.about)); // Send about as JSON string if needed

    try {
      const response = await fetch("https://relience-test-backend.onrender.com/api/v1/blog", {
        method: "POST",
        body: form, // Send FormData, not JSON
      });

      if (response.ok) {
        Swal.fire("Success", "Blog Created successfully!", "success");
        clearForm();
      } else {
        const errorData = await response.json();
        console.error("Failed to submit form:", errorData);
        Swal.fire("Error!", "Failed to create Blog.", "error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const clearForm = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Blog</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Subheading</label>
          <input
            type="text"
            name="subheading"
            value={formData.subheading}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Main</label>
          <input
            type="text"
            name="main"
            value={formData.main}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Created By</label>
          <input
            type="text"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Whereabout</label>
          <input
            type="text"
            name="whereabout"
            value={formData.whereabout}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>About Points</label>
          {formData.about.map((point, index) => (
            <div key={index} className="about-point">
              <input
                type="text"
                value={point}
                onChange={(e) => handleAboutChange(index, e.target.value)}
                className="form-input"
              />
              <button
                type="button"
                onClick={() => removeAboutPoint(index)}
                className="remove-button"
                disabled={formData.about.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addAboutPoint} className="add-button">
            Add About Point
          </button>
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
