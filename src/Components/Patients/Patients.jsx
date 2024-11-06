import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  // Fetch data from API
  const fetchPatients = async (page) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/allUser`, {
        params: {
          page: page,
          limit: itemsPerPage
        }
      });

      console.log("API response data:", response.data);

      setPatients(response.data.allUser || []);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage)); // Correctly set the total pages using 'total'
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPatients(currentPage);
  }, [currentPage]);

  // Handle pagination button clicks
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <h2>Patients List:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile No</th>
            <th>Email</th>
            <th>Date Of Birth</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>{patient.phoneNumber}</td>
              <td>{patient.email}</td>
              <td>{new Date(patient.DOB).toLocaleDateString()}</td>
              <td>{patient.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Patients;
