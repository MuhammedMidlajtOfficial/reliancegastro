import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./layout.css";
import logo from "../Assets/Logo/logo.svg";
import {
  FiGrid,
  FiBriefcase,
  FiUsers,
  FiImage,
  FiHelpCircle,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { FaRegFilePowerpoint } from "react-icons/fa6";
import Swal from 'sweetalert2'
// import logoutimg from "../../Assets/icons/logout.svg"

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('loginUserData'));

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlelogout = () => {
    Swal.fire({
    //   imageUrl: logoutimg,
      title: "Are you sure",
      text: "You want to Logout?",
      showCancelButton: true,
      confirmButtonColor: "#555",
      cancelButtonColor: "#ce1b28",
      confirmButtonText: "Yes, logout me!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token")
        navigate("/")
      }
    })
  }


  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button
          className="toggle-btn d-block d-sm-none"
          onClick={toggleSidebar}
        >
          <span className="visually-hidden">Toggle sidebar</span>
          <span className="navbar-toggler-icon" />
        </button>

        <aside className="sidebar-content">
          <div className="sidebar-header">
            <img src={logo} alt="logo" />
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <Link
                  to="/dashboard"
                  className={`nav-link py-2 rounded-xl mb-2 ${location.pathname === "/dashboard"
                    ? "active-nav-links"
                    : "#A0AEC0"
                    }`}
                >
                  <span className="me-3">
                    <FiGrid className="sidebar-icon" /> Dashboard
                  </span>
                </Link>
              </li>
              {userInfo?.role === 'ADMIN' && <li>
                <Link
                  onClick={() => { localStorage.setItem("post", true) }}
                  to="/post"
                  className={`nav-link py-2 rounded-xl mb-2 ${location.pathname === "/post"
                    ? "active-nav-links"
                    : "#A0AEC0"
                    }`}
                >
                  <span className="me-3">
                    <FaRegFilePowerpoint className="sidebar-icon" /> Posts
                  </span>
                </Link>
              </li>}

              <li>
                <Link
                  to="/general-applicants"
                  className={`nav-link py-2 rounded-xl mb-2 ${location.pathname === "/general-applicants"
                    ? "active-nav-links"
                    : "#A0AEC0"
                    }`}
                >
                  <span className="me-3">
                  <FiUsers className="sidebar-icon" /> General Applicants
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className={`nav-link py-2 rounded-xl mb-2 ${location.pathname === "/jobs"
                    ? "active-nav-links"
                    : "#A0AEC0"
                    }`}
                >
                  <span className="me-3">
                    <FiBriefcase className="sidebar-icon" /> Jobs
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/applicants"
                  className={`nav-link py-2 rounded-xl mb-2 ${location.pathname === "/applicants"
                    ? "active-nav-links"
                    : "#A0AEC0"
                    }`}
                >
                  <span className="me-3">
                    <FiUsers className="sidebar-icon" /> Applicants
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => { localStorage.setItem("gallery", true) }}
                  to="/gallery"
                  className={`nav-link py-2 rounded-xl mb-2 ${location.pathname === "/gallery"
                    ? "active-nav-links"
                    : "#A0AEC0"
                    }`}
                >
                  <span className="me-3">
                    <FiImage className="sidebar-icon" /> Media
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/user"
                  className={`nav-link py-2 rounded-xl mb-2 ${location.pathname === "/user"
                    ? "active-nav-links"
                    : "#A0AEC0"
                    }`}
                >
                  <span className="me-3">
                    <FiUsers className="sidebar-icon" /> Users
                  </span>
                </Link>
              </li>

              <div className="line-dashed"></div>

              <li>
                <Link
                  to="/setting"
                  className={`nav-link py-2 rounded-xl mb-2 ${location.pathname === "/setting"
                    ? "active-nav-links"
                    : "#A0AEC0"
                    }`}
                >
                  <span className="me-3">
                    <FiSettings className="sidebar-icon" /> Setting
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className={`nav-link py-2 rounded-xl mb-2 ${location.pathname === "/help"
                    ? "active-nav-links"
                    : "#A0AEC0"
                    }`}
                >
                  <span className="me-3">
                    <FiHelpCircle className="sidebar-icon" /> Help & Support
                  </span>
                </Link>
              </li>



              <li>
                <Link
                  className={`nav-link py-2 rounded-xl ${location.pathname === "/" ? "active-nav-links" : "#A0AEC0"
                    }`}
                  onClick={handlelogout}
                >
                  <span className="me-3">
                    <FiLogOut className="sidebar-icon" /> Logout
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}

export default Sidebar;
