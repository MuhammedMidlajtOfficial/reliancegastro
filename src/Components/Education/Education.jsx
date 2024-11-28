import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CreateEducation from "./CreateEducation";

const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEducation, setSelectedEducation] = useState({});
  const [totalRows, setTotalRows] = useState(0);
  const itemsPerPage = 10;

  // Fetch education list
  const fetchEducationList = async (page) => {
    try {
      const response = await axios.get(
        "https://relience-test-backend.onrender.com/api/v1/education",

        {
          params: { page, limit: itemsPerPage },
        }
      );
      // Ensure that you're using 'educations' from the response data
      setEducationList(response.data.educations || []); // This makes sure the data is an array
      setTotalRows(response.data.totalEducations); // Total number of educations
    } catch (error) {
      console.error("Error fetching education:", error);

    }
  };

  useEffect(() => {
    fetchEducationList(currentPage);
  }, [currentPage]);

  const handleAddEducationClick = () => {
    setCreateModalOpen(true);
  };

  const closeModal = () => {
    setCreateModalOpen(false);
  };

  const handleEditClick = (education) => {
    setSelectedEducation(education);
    setEditModalOpen(true);
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedEducation({
        ...selectedEducation,
        [field]: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };  


  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `https://relience-test-backend.onrender.com/api/v1/education/${selectedEducation._id}`,

        selectedEducation
      );
      setEducationList(
        educationList.map((edu) =>
          edu._id === selectedEducation._id ? selectedEducation : edu
        )
      );
      setEditModalOpen(false);
      Swal.fire("Success", "Education entry updated successfully!", "success");
    } catch (error) {
      Swal.fire("Error!", "Error updating education entry.", "error");
      console.error("Error updating education entry:", error);
    }
  };

  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this education entry?",
      showCancelButton: true,
      confirmButtonColor: "#E56171",
      cancelButtonColor: "#00963f",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://relience-test-backend.onrender.com/api/v1/education/${_id}`);

          setEducationList(educationList.filter((edu) => edu._id !== _id));
          setTotalRows(totalRows - 1);
          Swal.fire({
            title: "Success!",
            text: "Education entry was successfully deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting education entry:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete education entry.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const columns = [
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Description", selector: (row) => row.description, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            onClick={() => handleEditClick(row)}
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              backgroundColor: "#6fbf73",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#ff6961",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Education List</h2>
      <div className="create">
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="newdoc" onClick={handleAddEducationClick}>
          Add Patient Education

        </button>
      </div>

      <DataTable
        columns={columns}
        data={educationList?.filter(
          (education) =>
            education.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            education.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())

        )}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={itemsPerPage}
        onChangePage={(page) => setCurrentPage(page)}
      />

      {editModalOpen && selectedEducation && (
        <Modal
          isOpen={editModalOpen}
          onRequestClose={() => setEditModalOpen(false)}
          className="custom-modal"
        >
          <h2>Edit Education</h2>
          <label>
            Title:
            <input
              type="text"
              value={selectedEducation.title || ""}
              onChange={(e) =>
                setSelectedEducation({
                  ...selectedEducation,
                  title: e.target.value,
                })
              }
            />
          </label>
          <label>
            Description:
            <textarea
              value={selectedEducation.description || ""}
              onChange={(e) =>
                setSelectedEducation({
                  ...selectedEducation,
                  description: e.target.value,
                })
              }
            />
          </label>
          <label>
            Header Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "headerImage")}
            />
            {selectedEducation.headerImage && (
              <img
                src={selectedEducation.headerImage}
                alt="Header"
                style={{ width: "100px", height: "100px" }}
              />
            )}
          </label>
          <label>
            Thumbnail:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "thumbnail")}
            />
            {selectedEducation.thumbnail && (
              <img
                src={selectedEducation.thumbnail}
                alt="Thumbnail"
                style={{ width: "100px", height: "100px" }}
              />
            )}
          </label>
          <label>
            Content:
            <ReactQuill
              value={selectedEducation.content || ""}
              onChange={(content) =>
                setSelectedEducation({ ...selectedEducation, content })
              }
            />
          </label>
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

      {createModalOpen && (
        <Modal isOpen={createModalOpen} className="custom-modal">
          <CreateEducation closeModal={closeModal} />

        </Modal>
      )}
    </div>
  );
};

export default Education;
