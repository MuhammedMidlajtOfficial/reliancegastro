import React, { useState } from "react";
import Swal from "sweetalert2";

export default function CreateDoctor({ closeModal }) {
  const initialFormData = {
    name: "",
    specialty: "",
    profileImage: "",
    content: "",
    availableTime: "",
    patients: "",
    experienceYears: "",
    rating: "",
    aboutMe: "",
    location: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        profileImage: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // const handleReviewChange = (index, field, value) => {
  //   const updatedReviews = [...formData.reviews];
  //   updatedReviews[index][field] = value;
  //   setFormData({
  //     ...formData,
  //     reviews: updatedReviews,
  //   });
  // };

  // const addReview = () => {
  //   setFormData({
  //     ...formData,
  //     reviews: [
  //       ...formData.reviews,
  //       { patientId: "", review: "", rating: "" },
  //     ],
  //   });
  // };

  // const removeReview = (index) => {
  //   const updatedReviews = formData.reviews.filter((_, i) => i !== index);
  //   setFormData({
  //     ...formData,
  //     reviews: updatedReviews,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://relience-test-backend.onrender.com/api/v1/doctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire("Success", "Doctor Created successfully!", "success");
        clearForm();
        closeModal();
      } else {
        const errorData = await response.json();
        Swal.fire("Error!", "Failed to create Blog.", "error",);
        console.error("Failed to submit form:", errorData);
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
      <div className="close" onClick={closeModal}>X</div>
      <h2 className="form-title">Create Doctor Profile</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Specialty</label>
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Profile Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label>Available Time</label>
          <input
            type="text"
            name="availableTime"
            value={formData.availableTime}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Patients</label>
          <input
            type="text"
            name="patients"
            value={formData.patients}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Years of Experience</label>
          <input
            type="text"
            name="experienceYears"
            value={formData.experienceYears}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Rating (0-5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            min="0"
            max="5"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>About Me</label>
          <textarea
            name="aboutMe"
            value={formData.aboutMe}
            onChange={handleInputChange}
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
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
