import { useState, useRef, useEffect } from "react";
import "./layout.css";
import { FaRegBell } from "react-icons/fa6";
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserInfo = localStorage.getItem("userInfo");
    
    if (token && storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleNotificationClick = () => {
    navigate('/notification');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleSignOut = () => {
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
        localStorage.removeItem("userInfo");
        navigate("/");
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!userInfo) {
    return null;
  }

  return (
    <div style={{position:"sticky", top:"0", zIndex:"999"}}>
      <nav className="navbar-header">
        <div className="d-flex w-100 justify-content-end">
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              onClick={handleNotificationClick}
              aria-controls="navbar-notification"
              aria-expanded="false"
              className="notification-button"
            >
              <FaRegBell className="notification-icon" />
              <span className="notification-badge"></span>
            </button>
            
            <div className="d-flex align-items-center gap-2">
              <button
                className="user-image"
                type="button"
                aria-controls="user-menu"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                <img 
                  className="profile--icon" 
                  src={`https://ui-avatars.com/api/?name=${userInfo.name.replace(/ /g, '+')}`}
                  alt={userInfo.name} 
                />
              </button>

              <div className="user-info">
                <span
                  style={{
                    color: "#00963f",
                    fontSize: "16px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                  }}
                >
                  {userInfo.name}
                </span>
                <br />
                <span className="xl-2">{userInfo.email}</span>
              </div>

              {isDropdownOpen && (
                <div
                  className="dropdown-menu"
                  role="menu"
                  aria-labelledby="user-menu"
                  ref={dropdownRef}
                >
                  <div className="dropdown-menu-items">
                    <Link to="/edit-profile" className="dropdown-item" role="menuitem" tabIndex="0">
                      Edit Profile
                    </Link>
                    <div
                      onClick={handleSignOut}
                      className="dropdown-item"
                      role="menuitem"
                      tabIndex="0"
                    >
                      Log out
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;