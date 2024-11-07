import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Mobile No', selector: row => row.phoneNumber, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Date Of Birth', selector: row => new Date(row.DOB).toLocaleDateString(), sortable: true },
    { name: 'Gender', selector: row => row.gender, sortable: true },
    { name: 'Status', selector: row => row.status, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button onClick={() => handleEdit(row)} style={{ marginRight: '10px' }}>Edit</button>
          <button onClick={() => handleDelete(row._id)} style={{ color: 'red' }}>Delete</button>
        </>
      ),
    },
  ];

  const fetchPatients = async (page) => {
    try {
      const response = await axios.get(`https://relience-test-backend.onrender.com/api/v1/allUser`, {
        params: { page: page, limit: itemsPerPage },
      });
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

  // Filter the data based on the search term
  useEffect(() => {
    const filteredData = patients.filter((patient) =>
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
    console.log("Edit patient:", patient);
  };

  // Delete function
  const handleDelete = async (id) => {
    console.log("Delete patient :", id);
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
        style={{ marginBottom: '10px', padding: '5px', width: '250px' }}
      />

      <DataTable
        columns={columns}
        data={filteredPatients}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={itemsPerPage}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default Patients;
