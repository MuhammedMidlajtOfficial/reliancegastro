import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import Swal from "sweetalert2";

const Post = () => {
  const [postList, setPostList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const itemsPerPage = 10;

  // Fetch posts with reportCounts > 1
  const fetchPostList = async (page) => {
    try {
      const response = await axios.get(
        `https://relience-test-backend.onrender.com/api/v1/posts`,
        {
          params: { page, limit: itemsPerPage, minReports: 1 },
        }
      );
      const filteredPosts = response.data.posts.filter(
        (post) => post.reportCounts > 1
      );
      setPostList(filteredPosts);
      setTotalRows(response.data.totalPosts || 0);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPostList(currentPage);
  }, [currentPage]);

  const handleViewClick = (post) => {
    setSelectedPost(post);
    setViewModalOpen(true);
  };

  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this post?",
      showCancelButton: true,
      confirmButtonColor: "#E56171",
      cancelButtonColor: "#00963f",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://relience-test-backend.onrender.com/api/v1/posts/${_id}`
          );
          setPostList(postList.filter((post) => post._id !== _id));
          setTotalRows(totalRows - 1);
          Swal.fire({
            title: "Success!",
            text: "Post successfully deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting post:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete post.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const columns = [
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Content", selector: (row) => row.content, sortable: true },
    { name: "Type", selector: (row) => row.type, sortable: true },
    { name: "Reports", selector: (row) => row.reportCounts, sortable: true },
    { name: "Likes", selector: (row) => row.likeCounts, sortable: true },
    { name: "Comments", selector: (row) => row.commentCounts, sortable: true },
    { name: "Shares", selector: (row) => row.shareCounts, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button onClick={() => handleViewClick(row)} className="view-button">
            View
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="delete-button"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Reported Post List</h2>
      <div className="actions">
        <input
          type="text"
          placeholder="Search by title or content"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={postList.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={itemsPerPage}
        onChangePage={(page) => setCurrentPage(page)}
      />

      {viewModalOpen && selectedPost && (
        <Modal
          isOpen={viewModalOpen}
          onRequestClose={() => setViewModalOpen(false)}
        >
          <h2>View Post Details</h2>
          <p>
            <strong>Title:</strong> {selectedPost.title}
          </p>
          <p>
            <strong>Content:</strong> {selectedPost.content}
          </p>
          <p>
            <strong>Type:</strong> {selectedPost.type}
          </p>
          <p>
            <strong>Reports:</strong> {selectedPost.reportCounts}
          </p>
          <p>
            <strong>Likes:</strong> {selectedPost.likeCounts}
          </p>
          <p>
            <strong>Comments:</strong> {selectedPost.commentCounts}
          </p>
          <p>
            <strong>Shares:</strong> {selectedPost.shareCounts}
          </p>
          <button onClick={() => setViewModalOpen(false)}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default Post;
