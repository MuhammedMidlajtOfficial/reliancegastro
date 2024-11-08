import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";

const BlogList = () => {
  const [blogList, setBlogList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const itemsPerPage = 10;

  // Fetch blog list from API
  const fetchBlogList = async (page) => {
    try {
      const response = await axios.get(
        `https://relience-test-backend.onrender.com/api/v1/blog`,
        {
          params: { page, limit: itemsPerPage },
        }
      );
      setBlogList(response.data || []);
      setTotalRows(response.data.length);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogList(currentPage);
  }, [currentPage]);

  // Handle edit
  const handleEditClick = (blogItem) => {
    setSelectedBlog(blogItem);
    setEditModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedBlog({
        ...selectedBlog,
        cardimage: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleContentChange = (index, value) => {
    const newContent = [...selectedBlog.content];
    newContent[index] = value;
    setSelectedBlog({
      ...selectedBlog,
      content: newContent,
    });
  };

  const addContentPoint = () => {
    setSelectedBlog({
      ...selectedBlog,
      content: [...selectedBlog.content, ""],
    });
  };

  const removeContentPoint = (index) => {
    const newContent = selectedBlog.content.filter((_, i) => i !== index);
    setSelectedBlog({
      ...selectedBlog,
      content: newContent,
    });
  };

  const handleCardDetailsChange = (index, value) => {
    const newCardDetails = [...selectedBlog.carddetails];
    newCardDetails[index] = value;
    setSelectedBlog({
      ...selectedBlog,
      carddetails: newCardDetails,
    });
  };

  const addCardDetail = () => {
    setSelectedBlog({
      ...selectedBlog,
      carddetails: [...selectedBlog.carddetails, ""],
    });
  };

  const removeCardDetail = (index) => {
    const newCardDetails = selectedBlog.carddetails.filter(
      (_, i) => i !== index
    );
    setSelectedBlog({
      ...selectedBlog,
      carddetails: newCardDetails,
    });
  };

  // Handle Save Changes
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `https://relience-test-backend.onrender.com/api/v1/blog/${selectedBlog._id}`,
        selectedBlog
      );
      setBlogList(
        blogList.map((blog) =>
          blog._id === selectedBlog._id ? selectedBlog : blog
        )
      );
      setEditModalOpen(false);
      alert("Blog has been successfully edited!");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  // Handle delete
  const handleDelete = async (_id) => {
    try {
      await axios.delete(
        `https://relience-test-backend.onrender.com/api/v1/blog/${_id}`
      );
      setBlogList(blogList.filter((blog) => blog._id !== _id));
      setTotalRows(totalRows - 1);
      alert("Blog has been successfully deleted!");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const columns = [
    { name: "Heading", selector: (row) => row.heading, sortable: true },
    { name: "Subheading", selector: (row) => row.subheading, sortable: true },
    { name: "About", selector: (row) => row.about, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            onClick={() => handleEditClick(row)}
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              backgroundColor: "#6fbf73", // Green shade for Edit button
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#4caf50")} // Darken on hover
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6fbf73")}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#ff6961", // Light red for Delete button
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e53935")} // Darker red on hover
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff6961")}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  const customStyles = {
    table: {
      style: {
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0px 4px 8px rgba(0, 128, 0, 0.15)", // Soft green shadow
        backgroundColor: "#f9fff9", // Light green background for table
      },
    },
    headCells: {
      style: {
        padding: "12px",
        textAlign: "center",
        backgroundColor: "#a8e6a1", // Light green header
        color: "#ffffff",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "14px",
        borderBottom: "2px solid #6fbf73", // Slightly darker green border
      },
    },
    rows: {
      style: {
        padding: "12px",
        textAlign: "center",
        borderBottom: "1px solid #c3e6cb", // Light green border for rows
        backgroundColor: "#f0fff0", // Very light green for rows
      },
      highlightOnHoverStyle: {
        backgroundColor: "#d4f2d4", // Light green shade on hover
        transition: "background-color 0.3s ease",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        color: "#2f4f2f", // Darker green for text
        padding: "12px",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#f9fff9",
        borderTop: "1px solid #c3e6cb", // Top border for pagination
        color: "#2f4f2f",
      },
    },
  };

  return (
    <div>
      <h2>Blog List</h2>
      <input
        type="text"
        placeholder="Search by heading or subheading"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
      />

      <DataTable
        columns={columns}
        data={blogList.filter(
          (blog) =>
            blog.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.subheading.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={itemsPerPage}
        onChangePage={(page) => setCurrentPage(page)}
        customStyles={customStyles}
      />

      {editModalOpen && selectedBlog && (
        <Modal
          isOpen={editModalOpen}
          onRequestClose={() => setEditModalOpen(false)}
          contentLabel="Edit Blog"
          className="custom-modal"
        >
          <h2>Edit Blog</h2>
          <label>
            Heading:
            <input
              type="text"
              name="heading"
              value={selectedBlog.heading}
              onChange={(e) =>
                setSelectedBlog({ ...selectedBlog, heading: e.target.value })
              }
            />
          </label>
          <label>
            Subheading:
            <input
              type="text"
              name="subheading"
              value={selectedBlog.subheading}
              onChange={(e) =>
                setSelectedBlog({ ...selectedBlog, subheading: e.target.value })
              }
            />
          </label>
          <label>
            Background Color:
            <input
              type="color"
              name="backgroundColor"
              value={selectedBlog.backgroundColor}
              onChange={(e) =>
                setSelectedBlog({
                  ...selectedBlog,
                  backgroundColor: e.target.value,
                })
              }
            />
          </label>
          <label>
            Background Image:
            <input type="file" name="cardimage" onChange={handleImageChange} />
          </label>
          <label>
            About:
            <textarea
              name="about"
              value={selectedBlog.about}
              onChange={(e) =>
                setSelectedBlog({ ...selectedBlog, about: e.target.value })
              }
            />
          </label>
          <label>Content Points:</label>
          {selectedBlog.content.map((point, index) => (
            <div key={index} className="rem">
              <input
                type="text"
                value={point}
                onChange={(e) => handleContentChange(index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeContentPoint(index)}
                disabled={selectedBlog.content.length === 1}
                className="remove"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="add" onClick={addContentPoint}>
            Add Point
          </button>

          <label>Card Details:</label>
          {selectedBlog.carddetails.map((detail, index) => (
            <div key={index} className="rem">
              <input
                type="text"
                value={detail}
                onChange={(e) => handleCardDetailsChange(index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeCardDetail(index)}
                className="remove"
                disabled={selectedBlog.carddetails.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="add" onClick={addCardDetail}>
            Add Detail
          </button>

          <div>
            <button className='save-button' onClick={handleSaveChanges}>Save Changes</button>
            <button className='cancel-button' onClick={() => setEditModalOpen(false)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BlogList;
