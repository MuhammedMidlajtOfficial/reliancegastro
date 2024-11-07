import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';

export default function HealthList() {
  const [packageList, setPackageList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const itemsPerPage = 10;

  // Fetch package list from API
  const fetchPackageList = async (page) => {
    try {
      const response = await axios.get(`https://relience-test-backend.onrender.com/api/v1/package/health-checkups`, {
        params: { page, limit: itemsPerPage },
      });
      setPackageList(response.data || []);
      setTotalRows(response.data.length);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    fetchPackageList(currentPage);
  }, [currentPage]);

  // Handle edit
  const handleEditClick = (packageItem) => {
    setSelectedPackage(packageItem);
    setEditModalOpen(true);
  };

  // Handle input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPackage({
      ...selectedPackage,
      [name]: name === 'price' || name === 'rating' ? Number(value) : value,
    });
  };

  const handleFeaturesChange = (index, value) => {
    const newFeatures = [...selectedPackage.features];
    newFeatures[index] = value;
    setSelectedPackage({
      ...selectedPackage,
      features: newFeatures,
    });
  };

  const addFeature = () => {
    setSelectedPackage({
      ...selectedPackage,
      features: [...selectedPackage.features, ''],
    });
  };

  const removeFeature = (index) => {
    const newFeatures = selectedPackage.features.filter((_, i) => i !== index);
    setSelectedPackage({
      ...selectedPackage,
      features: newFeatures,
    });
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      await axios.put(`https://relience-test-backend.onrender.com/api/v1/package/health-checkups/${selectedPackage._id}`, selectedPackage);
      setPackageList(packageList.map(pkg => pkg._id === selectedPackage._id ? selectedPackage : pkg));
      setEditModalOpen(false);
      alert("Package has been successfully edited!");
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  // Handle delete
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`https://relience-test-backend.onrender.com/api/v1/package/health-checkups/${_id}`);
      setPackageList(packageList.filter(pkg => pkg._id !== _id));
      setTotalRows(totalRows - 1);
      alert("Package has been successfully deleted!");
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const columns = [
    { name: 'Package Name', selector: row => row.packageName, sortable: true },
    { name: 'Price', selector: row => row.price, sortable: true },
    { name: 'Rating', selector: row => row.rating, sortable: true },
    { name: 'Duration', selector: row => row.duration, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button onClick={() => handleEditClick(row)} style={{ marginRight: '10px' }}>Edit</button>
          <button onClick={() => handleDelete(row._id)} style={{ color: 'red' }}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Health Package List</h2>
      <input
        type="text"
        placeholder="Search by package name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '250px' }}
      />

      <DataTable
        columns={columns}
        data={packageList.filter(pkg =>
          pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={itemsPerPage}
        onChangePage={(page) => setCurrentPage(page)}
      />

      {editModalOpen && selectedPackage && (
        <Modal
          isOpen={editModalOpen}
          onRequestClose={() => setEditModalOpen(false)}
          contentLabel="Edit Health Package"
          className="custom-modal"
        >
          <h2>Edit Health Package</h2>
          <label>
            Package Name:
            <input
              type="text"
              name="packageName"
              value={selectedPackage.packageName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={selectedPackage.price}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Rating:
            <input
              type="number"
              name="rating"
              value={selectedPackage.rating}
              min="0"
              max="5"
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description One:
            <input
              type="text"
              name="descriptionOne"
              value={selectedPackage.descriptionOne}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description Two:
            <input
              type="text"
              name="descriptionTwo"
              value={selectedPackage.descriptionTwo}
              onChange={handleInputChange}
            />
          </label>
          <label>Features:</label>
          {selectedPackage.features.map((feature, index) => (
            <div key={index}>
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeaturesChange(index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                disabled={selectedPackage.features.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addFeature}>Add Feature</button>

          <div>
            <button onClick={handleSaveChanges}>Save Changes</button>
            <button onClick={() => setEditModalOpen(false)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

