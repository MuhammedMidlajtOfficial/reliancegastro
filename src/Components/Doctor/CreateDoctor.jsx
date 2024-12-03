import React, { useState } from "react";
import Swal from "sweetalert2";

export default function CreateDoctor({ closeModal }) {
  const initialFormData = {
    name: "",
    specialty: "",
    image: "",
    content: "",
    availableTime: "",
    patients: "",
    experienceYears: "",
    rating: "",
    aboutMe: "",
    location: "",
    reviews: [], // Optionally, include reviews if needed
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
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
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

    const form = new FormData();
    form.append("image", formData.image);
    form.append("name", formData.name);
    form.append("specialty", formData.specialty);
    form.append("content", formData.content);
    form.append("availableTime", formData.availableTime);
    form.append("patients", formData.patients);
    form.append("experienceYears", formData.experienceYears);
    form.append("rating", formData.rating);
    form.append("aboutMe", formData.aboutMe);
    form.append("location", formData.location);

    try {
      const response = await fetch("http://localhost:9000/api/v1/doctor", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        Swal.fire("Success", "Doctor Created successfully!", "success");
        clearForm();
        closeModal();
      } else {
        const errorData = await response.json();
        console.error("Failed to submit form:", errorData);
        Swal.fire("Error!", "Failed to create Doctor.", "error");
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

        {/* Reviews Section */}
        {/* <div className="form-group">
          <label>Reviews</label>
          {formData.reviews.map((review, index) => (
            <div key={index} className="review-item">
              <input
                type="text"
                value={review.review}
                onChange={(e) =>
                  handleReviewChange(index, "review", e.target.value)
                }
                className="form-input"
                placeholder="Review"
              />
              <input
                type="number"
                value={review.rating}
                onChange={(e) =>
                  handleReviewChange(index, "rating", e.target.value)
                }
                className="form-input"
                min="0"
                max="5"
                placeholder="Rating"
              />
              <button
                type="button"
                onClick={() => removeReview(index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addReview} className="add-button">
            Add Review
          </button>
        </div> */}

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