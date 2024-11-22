import React, { useState } from 'react';
import Swal from "sweetalert2";
import axios from 'axios';

const HealthCheckupForm = () => {
  const [formData, setFormData] = useState({
    packageName: '',
    price: '',
    rating: '',
    descriptionOne: 'Discover comprehensive healthcare.',
    descriptionTwo: 'Health package designed for complete wellness.',
    features: '',
    duration: 'monthly',
    billingCycle: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare features as an array
    const data = {
      ...formData,
      features: formData.features.split(',').map(feature => feature.trim()) // Split features by comma and trim whitespace
    };

    try {
      const response = await axios.post('https://relience-test-backend.onrender.com/api/v1/package/health-checkups', data); // Update endpoint as needed
      console.log('Health Checkup Plan submitted successfully:', response.data);
      Swal.fire("Success", "Health Checkup Plan Created successfully!", "success");
    } catch (error) {
      console.error('Error submitting Health Checkup Plan:', error);
      Swal.fire("Error!", "Failed to create Health Checkup Plan.", "error",);
    }
  };

  return (
    <div className="container">
      <h2>Create Health Checkup Plan</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Package Name:
          <input type="text" name="packageName" value={formData.packageName} onChange={handleChange} required />
        </label>

        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>

        <label>
          Rating (0 to 5):
          <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" required />
        </label>

        <label>
          Description 1:
          <input type="text" name="descriptionOne" value={formData.descriptionOne} onChange={handleChange} required />
        </label>

        <label>
          Description 2:
          <input type="text" name="descriptionTwo" value={formData.descriptionTwo} onChange={handleChange} required />
        </label>

        <label>
          Features (comma-separated):
          <input type="text" name="features" value={formData.features} onChange={handleChange} placeholder="Feature1, Feature2, Feature3" />
        </label>

        <label>
          Duration:
          <select name="duration" value={formData.duration} onChange={handleChange} required>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>

        <label>
          Billing Cycle:
          <input type="number" name="billingCycle" value={formData.billingCycle} onChange={handleChange} required />
        </label>

        <button type="submit">Submit Health Checkup Plan</button>
      </form>
    </div>
  );
};

export default HealthCheckupForm;
