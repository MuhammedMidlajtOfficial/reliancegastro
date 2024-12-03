import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import Swal from "sweetalert2";
import CreateDoctor from "./CreateDoctor";

const Doctor = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [totalRows, setTotalRows] = useState(0);
  const itemsPerPage = 10;

  // Fetch doctor list
  const fetchDoctorList = async (page) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/v1/doctor`, {
        params: { page, limit: itemsPerPage },
      });
      // Set doctorList to the `doctor` array from the response
      setDoctorList(response.data.doctor || []);
      setTotalRows(response.data.totalDoctors || 0); // Use totalDoctors for pagination
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctorList(currentPage);
  }, [currentPage]);

  const handleAddDoctorClick = () => {
    setCreateModalOpen(true);
  };

  const closeModal = () => {
    setCreateModalOpen(false);
  };

  const handleEditClick = (doctor) => {
    setSelectedDoctor(doctor);
    setEditModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedDoctor({
        ...selectedDoctor,
        image: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:9000/api/v1/doctor/${selectedDoctor._id}`,
        selectedDoctor
      );
      setDoctorList(
        doctorList.map((doctor) =>
          doctor._id === selectedDoctor._id ? selectedDoctor : doctor
        )
      );
      setEditModalOpen(false);
      Swal.fire("Success", "Doctor Updated successfully!", "success");
    } catch (error) {
      Swal.fire("Error!", "Error updating doctor.", "error");
      console.error("Error updating doctor:", error);
    }
  };

  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this Doctor?",
      showCancelButton: true,
      confirmButtonColor: "#E56171",
      cancelButtonColor: "#00963f",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:9000/api/v1/doctor/${_id}`
          );
          setDoctorList(doctorList.filter((doctor) => doctor._id !== _id));
          setTotalRows(totalRows - 1);
          Swal.fire({
            title: "Success!",
            text: "Doctor was successfully Deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting doctor:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete doctor.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Specialty", selector: (row) => row.specialty, sortable: true },
    {
      name: "Rating",
      selector: (row) => `${row.rating} / 5`,
      sortable: true,
    },
    {
      name: "Experience",
      selector: (row) => `${row.experienceYears} years`,
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

  return (
    <div>
      <h2>Doctor List</h2>
      <div className="create">
        <input
          type="text"
          placeholder="Search by name or specialty"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="newdoc" onClick={handleAddDoctorClick}>
          Add New Doctor
        </button>
      </div>

      <DataTable
        columns={columns}
        data={doctorList.filter(
          (doctor) =>
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={itemsPerPage}
        onChangePage={(page) => setCurrentPage(page)}
      />

      {editModalOpen && selectedDoctor && (
        <Modal
          isOpen={editModalOpen}
          onRequestClose={() => setEditModalOpen(false)}
          className="custom-modal"
        >
          <h2>Edit Doctor</h2>
          <label>
            Name:
            <input
              type="text"
              value={selectedDoctor.name || ""}
              onChange={(e) =>
                setSelectedDoctor({ ...selectedDoctor, name: e.target.value })
              }
            />
          </label>
          <label>
            Specialty:
            <input
              type="text"
              value={selectedDoctor.specialty || ""}
              onChange={(e) =>
                setSelectedDoctor({
                  ...selectedDoctor,
                  specialty: e.target.value,
                })
              }
            />
          </label>
          <label>
            Profile Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedDoctor.image && (
              <img
                src={selectedDoctor.image}
                alt="Profile"
                style={{ width: "100px", height: "100px" }}
              />
            )}
          </label>
          <label>
            Content:
            <textarea
              value={selectedDoctor.content || ""}
              onChange={(e) =>
                setSelectedDoctor({
                  ...selectedDoctor,
                  content: e.target.value,
                })
              }
            />
          </label>
          <label>
            Available Time:
            <input
              type="text"
              value={selectedDoctor.availableTime || ""}
              onChange={(e) =>
                setSelectedDoctor({
                  ...selectedDoctor,
                  availableTime: e.target.value,
                })
              }
            />
          </label>
          <label>
            Patients:
            <input
              type="text"
              value={selectedDoctor.patients || ""}
              onChange={(e) =>
                setSelectedDoctor({
                  ...selectedDoctor,
                  patients: e.target.value,
                })
              }
            />
          </label>
          <label>
            Experience Years:
            <input
              type="text"
              value={selectedDoctor.experienceYears || ""}
              onChange={(e) =>
                setSelectedDoctor({
                  ...selectedDoctor,
                  experienceYears: e.target.value,
                })
              }
            />
          </label>
          <label>
            Rating (0–5):
            <input
              type="number"
              min="0"
              max="5"
              value={selectedDoctor.rating || ""}
              onChange={(e) =>
                setSelectedDoctor({
                  ...selectedDoctor,
                  rating: e.target.value,
                })
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
          <CreateDoctor closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default Doctor;
