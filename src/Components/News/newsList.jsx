import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const itemsPerPage = 10;

  // Fetch news list from API
  const fetchNewsList = async (page) => {
    try {
      const response = await axios.get(
        `https://relience-test-backend.onrender.com/api/v1/cards`,
        {
          params: { page, limit: itemsPerPage },
        }
      );
      console.log("API Response:", response.data);
      setNewsList(response.data || []);
      setTotalRows(response.data.length);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNewsList(currentPage);
  }, [currentPage]);

  // Handle edit
  const handleEditClick = (newsItem) => {
    setSelectedNews(newsItem);
    setEditModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedNews({
        ...selectedNews,
        backgroundImage: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleContentChange = (index, value) => {
    const newContent = [...selectedNews.content];
    newContent[index] = value;
    setSelectedNews({
      ...selectedNews,
      content: newContent,
    });
  };

  const addContentPoint = () => {
    setSelectedNews({
      ...selectedNews,
      content: [...selectedNews.content, ""],
    });
  };

  const removeContentPoint = (index) => {
    const newContent = selectedNews.content.filter((_, i) => i !== index);
    setSelectedNews({
      ...selectedNews,
      content: newContent,
    });
  };

  // Handle Save Chenges
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `https://relience-test-backend.onrender.com/api/v1/cards/${selectedNews._id}`,
        selectedNews
      );
      setNewsList(
        newsList.map((news) =>
          news._id === selectedNews._id ? selectedNews : news
        )
      );
      setEditModalOpen(false);
      alert("News has been successfully edited!");
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  // Handle delete
  const handleDelete = async (_id) => {
    try {
      await axios.delete(
        `https://relience-test-backend.onrender.com/api/v1/cards/${_id}`
      );
      setNewsList(newsList.filter((news) => news._id !== _id));
      setTotalRows(totalRows - 1);
      alert("News has been successfully deleted!");
    } catch (error) {
      console.error("Error deleting news:", error);
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
      <h2>News List</h2>
      <input
        type="text"
        placeholder="Search by heading or subheading"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
      />

      <DataTable
        columns={columns}
        data={newsList.filter(
          (news) =>
            news.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
            news.subheading.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={itemsPerPage}
        onChangePage={(page) => setCurrentPage(page)}
        customStyles={customStyles}
      />

      {editModalOpen && selectedNews && (
        <Modal
          isOpen={editModalOpen}
          onRequestClose={() => setEditModalOpen(false)}
          contentLabel="Edit News"
          className="custom-modal"
        >
          <h2>Edit News</h2>
          <label>
            Heading:
            <input
              type="text"
              name="heading"
              value={selectedNews.heading}
              onChange={(e) =>
                setSelectedNews({ ...selectedNews, heading: e.target.value })
              }
            />
          </label>
          <label>
            Subheading:
            <input
              type="text"
              name="subheading"
              value={selectedNews.subheading}
              onChange={(e) =>
                setSelectedNews({ ...selectedNews, subheading: e.target.value })
              }
            />
          </label>
          <label>
            Background Color:
            <input
              type="color"
              name="backgroundColor"
              value={selectedNews.backgroundColor}
              onChange={(e) =>
                setSelectedNews({
                  ...selectedNews,
                  backgroundColor: e.target.value,
                })
              }
            />
          </label>
          <label>
            Background Image:
            <input
              type="file"
              name="backgroundImage"
              onChange={handleImageChange}
            />
          </label>
          <label>
            About:
            <textarea
              name="about"
              value={selectedNews.about}
              onChange={(e) =>
                setSelectedNews({ ...selectedNews, about: e.target.value })
              }
            />
          </label>
          <label>Content Points:</label>
          {selectedNews.content.map((point, index) => (
            <div key={index} className="rem">
              <input
                type="text"
                value={point}
                onChange={(e) => handleContentChange(index, e.target.value)}
              />
              <button
                type="button"
                className="remove"
                onClick={() => removeContentPoint(index)}
                disabled={selectedNews.content.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="add" onClick={addContentPoint}>
            Add Point
          </button>
          <div>
            <button className="save-button" onClick={handleSaveChanges}>
              Save Changes
            </button>
            <button
              className="cancel-button"
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NewsList;
