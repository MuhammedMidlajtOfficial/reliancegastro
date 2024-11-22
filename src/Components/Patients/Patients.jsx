import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPatient, setEditingPatient] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const itemsPerPage = 10;

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Mobile No", selector: (row) => row.phoneNumber, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    {
      name: "Date Of Birth",
      selector: (row) => new Date(row.DOB).toLocaleDateString(),
      sortable: true,
    },
    { name: "Gender", selector: (row) => row.gender, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            onClick={() => handleEdit(row)}
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

  const fetchPatients = async (page) => {
    try {
      const response = await axios.get(
        `https://relience-test-backend.onrender.com/api/v1/allUser`,
        {
          params: { page: page, limit: itemsPerPage },
        }
      );
      setPatients(response.data.allUser || []);
      setFilteredPatients(response.data.allUser || []);
      setTotalRows(response.data.total || response.data.allUser.length);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("There was an error fetching the patient data. Please try again.");
    }
  };

  useEffect(() => {
    fetchPatients(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const filteredData = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phoneNumber.includes(searchTerm)
    );
    setFilteredPatients(filteredData);
  }, [searchTerm, patients]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Edit function
  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.patch(
        `https://relience-test-backend.onrender.com/api/v1/editProfileFromAdmin/${editingPatient._id}`,
        editingPatient
      );
      console.log(editingPatient);
      Swal.fire("Success", "Patient Updated successfully!", "success");
      setShowEditModal(false);
      fetchPatients(currentPage);
    } catch (error) {
      console.error("Error updating patient:", error);
      Swal.fire("Error!", "Error updating Patient.", "error",);
    }
  };

  // Delete function
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this Patients?",
      showCancelButton: true,
      confirmButtonColor: "#E56171",
      cancelButtonColor: "#00963f",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://relience-test-backend.onrender.com/api/v1/deleteUser/${id}`
          );
          Swal.fire({
            title: "Success!",
            text: "Patient was successfully Deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          fetchPatients(currentPage);
        } catch (error) {
          console.error("Error deleting Patients:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete Patients.",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  return (
    <div>
      <h2>Patients List:</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name, email, or phone number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
      />

      <DataTable
        columns={columns}
        data={filteredPatients}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={itemsPerPage}
        onChangePage={handlePageChange}
        customStyles={customStyles}
      />

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Patient</h3>
            <label>
              Name:
              <input
                type="text"
                value={editingPatient.name}
                onChange={(e) =>
                  setEditingPatient({ ...editingPatient, name: e.target.value })
                }
              />
            </label>
            <label>
              Mobile No:
              <input
                type="text"
                value={editingPatient.phoneNumber}
                onChange={(e) =>
                  setEditingPatient({
                    ...editingPatient,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={editingPatient.email}
                onChange={(e) =>
                  setEditingPatient({
                    ...editingPatient,
                    email: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                value={editingPatient.DOB}
                onChange={(e) =>
                  setEditingPatient({ ...editingPatient, DOB: e.target.value })
                }
              />
            </label>
            <label>
              Gender:
              <select
                value={editingPatient.gender}
                onChange={(e) =>
                  setEditingPatient({
                    ...editingPatient,
                    gender: e.target.value,
                  })
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <button onClick={handleEditSubmit}>Save</button>
            <button onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
