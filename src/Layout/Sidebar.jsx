import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./layout.css";
import logo from "../Assets/Logo/logo.svg";
import { FiGrid, FiBriefcase, FiUsers, FiSettings, FiLogOut, FiChevronDown, FiChevronUp, FiActivity, FiUserX, FiUserPlus, FiUserCheck, FiBell, FiMessageSquare, FiMenu, FiX, FiFileText, FiPlusCircle, FiTrello } from "react-icons/fi";
import Swal from 'sweetalert2';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure",
      text: "You want to Logout?",
      showCancelButton: true,
      confirmButtonColor: "#555",
      cancelButtonColor: "#00963f",
      confirmButtonText: "Yes, logout me!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  const menuItems = [
    {
      name: "User Management",
      icon: <FiGrid className="sidebar-icon" />,
      subMenu: [
        { name: "Overview", path: "/overview", icon: <FiGrid /> },
        { name: "Appointments", path: "/appointments", icon: <FiBriefcase /> },
        { name: "Patients Overview", path: "/patients-overview", icon: <FiUsers /> },
        { name: "Patient Logs", path: "/patient-logs", icon: <FiUserCheck /> },
        { name: "User Accounts", path: "/user-accounts", icon: <FiUserPlus /> },
        { name: "User Logs", path: "/user-logs", icon: <FiUserX /> },
        { name: "Recent Activities", path: "/recent-activities", icon: <FiActivity /> },
      ],
    },
    {
      name: "Appointments",
      icon: <FiBriefcase className="sidebar-icon" />,
      subMenu: [
        { name: "Submenu 1", path: "/appointments", icon: <FiBriefcase /> },
        { name: "Submenu 2", path: "/appointments", icon: <FiBriefcase /> },
      ],
    },
    {
      name: "Patients",
      icon: <FiUsers className="sidebar-icon" />,
      path:"/patients"
      // subMenu: [
      //   { name: "Submenu 1", path: "/patients/submenu1", icon: <FiUsers /> },
      //   { name: "Submenu 2", path: "/patients/submenu2", icon: <FiUsers /> },
      // ],
    },
    {
      name:"Health Package",
      icon: <FiActivity className="sidebar-icon" />,
      subMenu: [
        { name: "List", path: "/healthList", icon: < FiFileText/> },
        { name: "Create", path: "/health", icon: < FiPlusCircle/> },
      ]
    },
    {
      name:"News",
      icon: <FiTrello className="sidebar-icon" />,
      subMenu: [
        { name: "List", path: "/newsList", icon: < FiFileText/> },
        { name: "Create", path: "/news", icon: < FiPlusCircle/> },
      ]
    },
    {
      name:"Blog",
      icon: <FiFileText className="sidebar-icon" />,
      subMenu: [
        { name: "List", path: "/blogList", icon: < FiFileText/> },
        { name: "Create", path: "/blog", icon: < FiPlusCircle/> },
      ]
    },
    {
      name: "Messages",
      icon: <FiMessageSquare className="sidebar-icon" />,
      subMenu: [
        { name: "Submenu 1", path: "/messages/submenu1", icon: <FiMessageSquare /> },
        { name: "Submenu 2", path: "/messages/submenu2", icon: <FiMessageSquare /> },
      ],
    },
    {
      name: "Notification",
      icon: <FiBell className="sidebar-icon" />,
      subMenu: [
        { name: "Submenu 1", path: "/notification/submenu1", icon: <FiBell /> },
        { name: "Submenu 2", path: "/notification/submenu2", icon: <FiBell /> },
      ],
    },
    { name: "Setting", icon: <FiSettings className="sidebar-icon" />, path: "/setting" },
    { name: "Logout", icon: <FiLogOut className="sidebar-icon" />, action: handleLogout },
  ];

  const renderMenu = (menu) => (
    <ul>
      {menu.map((item, index) => (
        <li key={index}>
          {item.subMenu ? (
            <>
              <div className="nav-link py-2 rounded-xl mb-2 d-flex justify-content-between align-items-center" onClick={() => handleMenuClick(item.name)}>
                <span className="main-menus">{item.icon} {item.name}</span>
                {expandedMenu === item.name ? <FiChevronUp className="sidebar-icon" /> : <FiChevronDown className="sidebar-icon" />}
              </div>
              {expandedMenu === item.name && renderMenu(item.subMenu)}
            </>
          ) : (
            <Link
              to={item.path}
              onClick={item.action ? item.action : () => navigate(item.path)}
              className={`nav-link py-2 rounded-xl mb-2 ${location.pathname === item.path ? "active-nav-links" : ""}`}
            >
              <span className="me-3">{item.icon} {item.name}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <button className="toggle-btn d-md-none" onClick={toggleSidebar}>
        <FiMenu />
      </button>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn d-md-none" onClick={toggleSidebar}>
          <FiX />
        </button>
        <aside className="sidebar-content">
          <div className="sidebar-header">
            <img src={logo} alt="logo" />
          </div>
          <nav className="sidebar-nav">
            {renderMenu(menuItems.filter(item => item.subMenu))}
            <ul>
              {menuItems.filter(item => !item.subMenu).map((item, index) => (
                <li key={index}>
                  <div
                    className="nav-link py-2 rounded-xl mb-2 d-flex justify-content-between align-items-center"
                    onClick={item.action ? item.action : () => navigate(item.path)}
                  >
                    <span className="main-menus">{item.icon} {item.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}

export default Sidebar;
