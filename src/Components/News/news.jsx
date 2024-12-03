import React, { useState } from 'react';
import Swal from "sweetalert2";

const News = () => {
    const initialFormData = {
        heading: '',
        subheading: '',
        backgroundColor: '',
        image: '',
        about: '',
        content: ['']
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleContentChange = (index, value) => {
        const newContent = [...formData.content];
        newContent[index] = value;
        setFormData({
            ...formData,
            content: newContent,
        });
    };

    const addContentPoint = () => {
        setFormData({
            ...formData,
            content: [...formData.content, ''],
        });
    };

    const removeContentPoint = (index) => {
        const newContent = formData.content.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            content: newContent,
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("heading", formData.heading);
        form.append("subheading", formData.subheading);
        form.append("backgroundColor", formData.backgroundColor);
        form.append("image", formData.image); // Send file directly
        form.append("about", formData.about);
        form.append("content", JSON.stringify(formData.content)); // Convert array to JSON string

        try {
            const response = await fetch('https://relience-test-backend.onrender.com/api/v1/cards', {
                method: 'POST',
                body: form, // Send FormData
            });

            if (response.ok) {
                Swal.fire("Success", "News Created successfully!", "success");
                clearForm();
            } else {
                const errorData = await response.json();
                console.error("Failed to submit form:", errorData);
                Swal.fire("Error!", "Failed to create News.", "error");
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
            <h2 className="form-title">Create News</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Heading</label>
                    <input
                        type="text"
                        name="heading"
                        value={formData.heading}
                        onChange={handleInputChange}
                        className="form-input"
                        required
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
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Background Color</label>
                    <input
                        type="color"
                        name="backgroundColor"
                        value={formData.backgroundColor}
                        onChange={handleInputChange}
                        className="form-color-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>About</label>
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleInputChange}
                        className="form-textarea"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Content Points</label>
                    {formData.content.map((point, index) => (
                        <div key={index} className="content-point">
                            <input
                                type="text"
                                value={point}
                                onChange={(e) => handleContentChange(index, e.target.value)}
                                className="form-input"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeContentPoint(index)}
                                className="remove-button"
                                disabled={formData.content.length === 1}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addContentPoint} className="add-button">
                        Add Point
                    </button>
                </div>

                <div className="button-group">
                    <button type="submit" className="submit-button">Submit</button>
                    <button type="button" onClick={clearForm} className="clear-button">Clear Form</button>
                </div>
            </form>
        </div>
    );
};

export default News;
