import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import Swal from "sweetalert2";
import CreateHelloDoctor from "./CreateHelloDoctor";

const HelloDoctor = () => {
  const [videoList, setVideoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [totalRows, setTotalRows] = useState(0);
  const itemsPerPage = 10;

  // Fetch video list
  const fetchVideoList = async (page) => {
    try {
      const response = await axios.get("http://localhost:9000/api/v1/videos", {
        params: { page, limit: itemsPerPage },
      });
      const data = response.data; // Adjusted to the actual response structure
      setVideoList(data); // Set the video list directly
      setTotalRows(data.length); // Calculate total rows from the length of the data
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideoList(currentPage);
  }, [currentPage]);

  const handleAddVideoClick = () => {
    setCreateModalOpen(true);
  };

  const closeModal = () => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
  };

  const handleEditClick = (video) => {
    setSelectedVideo(video);
    setEditModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:9000/api/v1/videos/${selectedVideo._id}`,
        selectedVideo
      );
      setVideoList(
        videoList.map((video) =>
          video._id === selectedVideo._id ? selectedVideo : video
        )
      );
      setEditModalOpen(false);
      Swal.fire("Success", "Video updated successfully!", "success");
    } catch (error) {
      Swal.fire("Error!", "Error updating video.", "error");
      console.error("Error updating video:", error);
    }
  };

  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this video?",
      showCancelButton: true,
      confirmButtonColor: "#E56171",
      cancelButtonColor: "#00963f",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:9000/api/v1/videos/${_id}`);
          setVideoList(videoList.filter((video) => video._id !== _id));
          setTotalRows(totalRows - 1);
          Swal.fire("Deleted!", "The video has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the video.", "error");
          console.error("Error deleting video:", error);
        }
      }
    });
  };

  const columns = [
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "URL", selector: (row) => row.url, sortable: true },
    { name: "Likes", selector: (row) => row.likes, sortable: true },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
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
      <h2>Video List</h2>
      <div className="create">
        <input
          type="text"
          placeholder="Search by title or URL"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="newdoc" onClick={handleAddVideoClick}>
          Add Video
        </button>
      </div>

      <DataTable
        columns={columns}
        data={videoList
          .filter(
            (video) =>
              video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              video.url.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} // Slicing for client-side pagination
        pagination
        paginationTotalRows={videoList.length}
        paginationPerPage={itemsPerPage}
        onChangePage={(page) => setCurrentPage(page)}
      />

      {editModalOpen && selectedVideo && (
        <Modal
          isOpen={editModalOpen}
          onRequestClose={closeModal}
          className="custom-modal"
        >
          <h2>Edit Video</h2>
          <label>
            Title:
            <input
              type="text"
              value={selectedVideo.title || ""}
              onChange={(e) =>
                setSelectedVideo({ ...selectedVideo, title: e.target.value })
              }
            />
          </label>
          <label>
            URL:
            <input
              type="text"
              value={selectedVideo.url || ""}
              onChange={(e) =>
                setSelectedVideo({ ...selectedVideo, url: e.target.value })
              }
            />
          </label>
          <label>
            Likes:
            <input
              type="number"
              value={selectedVideo.likes || 0}
              disabled // This makes the field read-only
            />
          </label>
          <div>
            <button onClick={handleSaveChanges} className="save-button">
              Save Changes
            </button>
            <button onClick={closeModal} className="cancel-button">
              Cancel
            </button>
          </div>
        </Modal>
      )}
      {createModalOpen && (
        <Modal isOpen={createModalOpen} className="custom-modal">
          <CreateHelloDoctor closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default HelloDoctor;
