import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import Swal from "sweetalert2";

const Department = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const itemsPerPage = 10;

  const fetchDepartmentList = async (page) => {
    try {
      const response = await axios.get(
        `https://relience-test-backend.onrender.com/api/v1/department`,
        { params: { page, limit: itemsPerPage } }
      );
      const { departments, totalDepartments } = response.data;
      setDepartmentList(departments);
      setTotalRows(totalDepartments);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartmentList(currentPage);
  }, [currentPage]);

  const handleEditClick = (department) => {
    setSelectedDepartment(department);
    setEditModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `https://relience-test-backend.onrender.com/api/v1/department/${selectedDepartment._id}`,
        selectedDepartment
      );
      setDepartmentList(
        departmentList.map((dept) =>
          dept._id === selectedDepartment._id ? selectedDepartment : dept
        )
      );
      setEditModalOpen(false);
      Swal.fire("Success", "Department updated successfully!", "success");
    } catch (error) {
      console.error("Error updating department:", error);
      Swal.fire("Error", "Failed to update department.", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this department?",
      showCancelButton: true,
      confirmButtonColor: "#E56171",
      cancelButtonColor: "#00963f",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://relience-test-backend.onrender.com/api/v1/department/${id}`
          );
          setDepartmentList(departmentList.filter((dept) => dept._id !== id));
          setTotalRows(totalRows - 1);
          Swal.fire("Success", "Department deleted successfully!", "success");
        } catch (error) {
          console.error("Error deleting department:", error);
          Swal.fire("Error", "Failed to delete department.", "error");
        }
      }
    });
  };

  const columns = [
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Subtitle", selector: (row) => row.subtitle, sortable: true },
    {
      name: "Specialist Name",
      selector: (row) => row.specialist?.name || "N/A",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            onClick={() => handleEditClick(row)}
            className="edit-btn"
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
            className="delete-btn"
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

  return (
    <div>
      <h2>Department List</h2>
      <input
        type="text"
        placeholder="Search by title or subtitle"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={departmentList.filter(
          (dept) =>
            dept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dept.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={itemsPerPage}
        onChangePage={(page) => setCurrentPage(page)}
      />

      {editModalOpen && selectedDepartment && (
        <Modal
          isOpen={editModalOpen}
          onRequestClose={() => setEditModalOpen(false)}
          contentLabel="Edit Department"
          className="custom-modal"
        >
          <h2>Edit Department</h2>
          <label>
            Title:
            <input
              type="text"
              value={selectedDepartment.title}
              onChange={(e) =>
                setSelectedDepartment({
                  ...selectedDepartment,
                  title: e.target.value,
                })
              }
            />
          </label>
          <label>
            Subtitle:
            <input
              type="text"
              value={selectedDepartment.subtitle}
              onChange={(e) =>
                setSelectedDepartment({
                  ...selectedDepartment,
                  subtitle: e.target.value,
                })
              }
            />
          </label>
          <label>
            Description:
            <textarea
              value={selectedDepartment.description}
              onChange={(e) =>
                setSelectedDepartment({
                  ...selectedDepartment,
                  description: e.target.value,
                })
              }
            />
          </label>

          {/* Specialist Details */}
          <h3>Specialist Details</h3>
          <label>
            Name:
            <input
              type="text"
              value={selectedDepartment.specialist?.name || ""}
              onChange={(e) =>
                setSelectedDepartment({
                  ...selectedDepartment,
                  specialist: {
                    ...selectedDepartment.specialist,
                    name: e.target.value,
                  },
                })
              }
            />
          </label>
          <label>
            Designation:
            <input
              type="text"
              value={selectedDepartment.specialist?.designation || ""}
              onChange={(e) =>
                setSelectedDepartment({
                  ...selectedDepartment,
                  specialist: {
                    ...selectedDepartment.specialist,
                    designation: e.target.value,
                  },
                })
              }
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={selectedDepartment.specialist?.location || ""}
              onChange={(e) =>
                setSelectedDepartment({
                  ...selectedDepartment,
                  specialist: {
                    ...selectedDepartment.specialist,
                    location: e.target.value,
                  },
                })
              }
            />
          </label>
          <label>
            Photo URL:
            <input
              type="text"
              value={selectedDepartment.specialist?.photo_url || ""}
              onChange={(e) =>
                setSelectedDepartment({
                  ...selectedDepartment,
                  specialist: {
                    ...selectedDepartment.specialist,
                    photo_url: e.target.value,
                  },
                })
              }
            />
          </label>

          {/* Success Stories */}
          <h3>Success Stories</h3>
          {selectedDepartment.success_stories.map((story, index) => (
            <div key={index}>
              <label>
                Title:
                <input
                  type="text"
                  value={story.title}
                  onChange={(e) => {
                    const updatedStories = [
                      ...selectedDepartment.success_stories,
                    ];
                    updatedStories[index].title = e.target.value;
                    setSelectedDepartment({
                      ...selectedDepartment,
                      success_stories: updatedStories,
                    });
                  }}
                />
              </label>
              <label>
                Video Thumbnail URL:
                <input
                  type="text"
                  value={story.video_thumbnail_url}
                  onChange={(e) => {
                    const updatedStories = [
                      ...selectedDepartment.success_stories,
                    ];
                    updatedStories[index].video_thumbnail_url = e.target.value;
                    setSelectedDepartment({
                      ...selectedDepartment,
                      success_stories: updatedStories,
                    });
                  }}
                />
              </label>
              <label>
                Views:
                <input
                  type="number"
                  value={story.views}
                  onChange={(e) => {
                    const updatedStories = [
                      ...selectedDepartment.success_stories,
                    ];
                    updatedStories[index].views = parseInt(e.target.value);
                    setSelectedDepartment({
                      ...selectedDepartment,
                      success_stories: updatedStories,
                    });
                  }}
                />
              </label>
              <button
                className="remove"
                onClick={() => {
                  const updatedStories =
                    selectedDepartment.success_stories.filter(
                      (_, i) => i !== index
                    );
                  setSelectedDepartment({
                    ...selectedDepartment,
                    success_stories: updatedStories,
                  });
                }}
              >
                Remove Story
              </button>
            </div>
          ))}
          <button
            className="add"
            onClick={() =>
              setSelectedDepartment({
                ...selectedDepartment,
                success_stories: [
                  ...selectedDepartment.success_stories,
                  { video_thumbnail_url: "", title: "", views: 0 },
                ],
              })
            }
          >
            Add New Story
          </button>

          <div>
            <button onClick={handleSaveChanges} className="save-button">
              Save Changes
            </button>
            <button
              onClick={() => setEditModalOpen(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Department;
