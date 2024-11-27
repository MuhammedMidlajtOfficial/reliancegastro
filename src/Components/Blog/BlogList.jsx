import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import Swal from "sweetalert2";
import moment from "moment";

const BlogList = () => {
  const [blogList, setBlogList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState({ about: [] });
  const [totalRows, setTotalRows] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const itemsPerPage = 10;

  // Fetch blog list from API
  const fetchBlogList = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/blog`,
        { params: { page, limit: itemsPerPage } }
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
    setImageFile(null); // Reset image file state
    setEditModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Update selected image file
      setSelectedBlog({ ...selectedBlog, image: URL.createObjectURL(file) }); // Preview new image
    }
  };

  const handleContentChange = (index, value) => {
    const updatedAbout = [...selectedBlog.about];
    updatedAbout[index] = value;
    setSelectedBlog({ ...selectedBlog, about: updatedAbout });
  };

  const removeContentPoint = (index) => {
    const updatedAbout = selectedBlog.about.filter((_, i) => i !== index);
    setSelectedBlog({ ...selectedBlog, about: updatedAbout });
  };

  const addContentPoint = () => {
    setSelectedBlog({
      ...selectedBlog,
      about: [...selectedBlog.about, ""],
    });
  };

  // Handle Save Changes
  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(selectedBlog)); // Append blog data
    if (imageFile) {
      formData.append("image", imageFile); // Append image file if available
    }

    try {
      await axios.put(
        `http://localhost:9000/api/v1/blog/${selectedBlog._id}`,

        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setBlogList(
        blogList.map((blog) =>
          blog._id === selectedBlog._id ? { ...selectedBlog, image: selectedBlog.image } : blog
        )
      );
      setEditModalOpen(false);
      Swal.fire({
        title: "Success!",
        text: "Blog was updated successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error Editing blog:", error.response?.data || error.message);

      Swal.fire({
        title: "Error!",
        text: "Failed to Edit Blog.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Handle delete
  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this Blog?",
      showCancelButton: true,
      confirmButtonColor: "#E56171",
      cancelButtonColor: "#00963f",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:9000/api/v1/blog/${_id}`
          );
          setBlogList(blogList.filter((blog) => blog._id !== _id));
          setTotalRows(totalRows - 1);
          Swal.fire({
            title: "Success!",
            text: "Blog was successfully Deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting blog:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete blog.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };


  const columns = [
    { name: "Heading", selector: (row) => row.main, sortable: true },
    { name: "Created by", selector: (row) => row.createdBy, sortable: true },
    {
      name: "Created at",
      selector: (row) =>
        moment(row.timeStamp).format("MMMM Do YYYY, h:mm:ss a"),
      sortable: true,
    },
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
            Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedBlog.image && (
              <img
                src={selectedBlog.image}
                alt="Selected"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
          </label>
          <label>
            Main:
            <input
              type="text"
              name="main"
              value={selectedBlog.main}
              onChange={(e) =>
                setSelectedBlog({ ...selectedBlog, main: e.target.value })
              }
            />
          </label>
          <label>
            Created By:
            <input
              type="text"
              name="createdBy"
              value={selectedBlog.createdBy}
              onChange={(e) =>
                setSelectedBlog({ ...selectedBlog, createdBy: e.target.value })
              }
            />
          </label>

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
          <label>About:</label>
          {selectedBlog.about && selectedBlog.about.length > 0 ? (
            selectedBlog.about.map((point, index) => (
              <div key={index} className="rem">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeContentPoint(index)}
                  disabled={selectedBlog.about.length <= 1}
                  className="remove"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No points available</p>
          )}
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

export default BlogList;
