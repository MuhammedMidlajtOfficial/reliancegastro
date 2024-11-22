import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import Swal from "sweetalert2";
import moment from "moment";

const AppointmentList = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [totalRows, setTotalRows] = useState(0);
  const itemsPerPage = 10;

  // Fetch appointment list from API
  const fetchAppointmentList = async (page) => {
    try {
      const response = await axios.get(
        `https://relience-test-backend.onrender.com/api/v1/appointment`, // Update this API endpoint
        {
          params: { page, limit: itemsPerPage },
        }
      );
      setAppointmentList(response.data || []);
      setTotalRows(response.data.length);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Fetch list of doctors for doctor selection in the form
  const fetchDoctorsList = async () => {
    try {
      const response = await axios.get(
        `https://relience-test-backend.onrender.com/api/v1/doctor` // Update this API endpoint
      );
      setDoctorsList(response.data || []);
    } catch (error) {
      console.error("Error fetching doctors list:", error);
    }
  };

  useEffect(() => {
    fetchAppointmentList(currentPage);
    fetchDoctorsList(); // Fetch doctors list when the component mounts
  }, [currentPage]);

  // Handle edit
  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setEditModalOpen(true);
  };

  const handleSaveChanges = async () => {
    console.log('Updating appointment with ID:', selectedAppointment._id);
    try {
      await axios.patch(
        `https://relience-test-backend.onrender.com/api/v1/appointment/${selectedAppointment._id}`,
        selectedAppointment
      );  
      setAppointmentList(
        appointmentList.map((appointment) =>
          appointment._id === selectedAppointment._id ? selectedAppointment : appointment
        )
      );
      setEditModalOpen(false);
      Swal.fire({
        title: "Success!",
        text: "Appointment was updated successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error Editing appointment:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to Edit appointment.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Handle delete
  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this Appointment?",
      showCancelButton: true,
      confirmButtonColor: "#E56171",
      cancelButtonColor: "#00963f",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://relience-test-backend.onrender.com/api/v1/appointment/${_id}` // Update this endpoint
          );
          setAppointmentList(appointmentList.filter((appointment) => appointment._id !== _id));
          setTotalRows(totalRows - 1);
          Swal.fire({
            title: "Success!",
            text: "Appointment was successfully Deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting appointment:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete appointment.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const columns = [
    { name: "Patient Name", selector: (row) => row.patientName, sortable: true },
    { name: "Appointment Date", selector: (row) => moment(row.appointmentDateTime).format("MMMM Do YYYY, h:mm:ss a"), sortable: true },
    { name: "Payment Status", selector: (row) => row.paymentStatus, sortable: true },
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
      <h2>Appointment List</h2>
      <input
        type="text"
        placeholder="Search by patient name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
      />

      <DataTable
        columns={columns}
        data={appointmentList.filter(
          (appointment) =>
            appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={itemsPerPage}
        onChangePage={(page) => setCurrentPage(page)}
        customStyles={customStyles}
      />

      {editModalOpen && selectedAppointment && (
        <Modal
          isOpen={editModalOpen}
          onRequestClose={() => setEditModalOpen(false)}
          contentLabel="Edit Appointment"
          className="custom-modal"
        >
          <h2>Edit Appointment</h2>
          
          {/* Doctor selection */}
          <div>
            <label htmlFor="doctorId">Doctor:</label>
            <select
              id="doctorId"
              value={selectedAppointment.doctorId}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  doctorId: e.target.value,
                })
              }
            >
              <option value="">Select Doctor</option>
              {doctorsList.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          {/* Patient Name */}
          <div>
            <label htmlFor="patientName">Patient Name:</label>
            <input
              type="text"
              id="patientName"
              value={selectedAppointment.patientName || ""}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  patientName: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={moment(selectedAppointment.dob).format("YYYY-MM-DD") || ""}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  dob: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              value={selectedAppointment.gender || "Male"}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  gender: e.target.value,
                })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobileNo">Mobile No:</label>
            <input
              type="tel"
              id="mobileNo"
              value={selectedAppointment.mobileNo || ""}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  mobileNo: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              value={selectedAppointment.address || ""}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  address: e.target.value,
                })
              }
            />
          </div>

          {/* Medical History */}
          <div>
            <label htmlFor="medicalHistory">Medical History:</label>
            <textarea
              id="medicalHistory"
              value={selectedAppointment.medicalHistory || ""}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  medicalHistory: e.target.value,
                })
              }
            />
          </div>

          {/* Current Symptoms */}
          <div>
            <label htmlFor="currentSymptoms">Current Symptoms:</label>
            <textarea
              id="currentSymptoms"
              value={selectedAppointment.currentSymptoms || ""}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  currentSymptoms: e.target.value,
                })
              }
            />
          </div>

          {/* Appointment Date */}
          <div>
            <label htmlFor="appointmentDateTime">Appointment Date:</label>
            <input
              type="datetime-local"
              id="appointmentDateTime"
              value={moment(selectedAppointment.appointmentDateTime).format("YYYY-MM-DDTHH:mm") || ""}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  appointmentDateTime: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Payment Status */}
          <div>
            <label htmlFor="paymentStatus">Payment Status:</label>
            <select
              id="paymentStatus"
              value={selectedAppointment.paymentStatus || "Pending"}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  paymentStatus: e.target.value,
                })
              }
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

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

export default AppointmentList;
