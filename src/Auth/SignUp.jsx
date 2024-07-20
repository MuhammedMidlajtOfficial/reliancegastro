import React, { useState } from "react";
import "./auth.css";
import logo from "../Assets/Logo/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { message } from "antd";
import Instance from "../AxiosConfig";
import signup from "../Assets/Imgs/SignUp/SignUp.png";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSignUp = async () => {
        // ... (keep the existing handleSignUp logic)
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <center>
                    <img src={logo} alt="Sir H. N. Reliance Foundation Hospital" className="logo" />
                </center>
                <h3 className="welcome-text">Welcome to Institute of Gastro sciences</h3>
                <h1 className="signup-title">Sign up</h1>
                <div className="form-group">
                    <label htmlFor="name">Name*</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email*</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number*</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        placeholder="Enter your Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password*</label>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="password-toggle"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FiEye /> : <FiEyeOff />}
                        </button>
                    </div>
                    <p className="password-hint">Must be at least 8 characters.</p>
                </div>
                <button className="signup-button" onClick={handleSignUp}>
                    Create account
                </button>
                <p className="login-link">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
                <p className="terms">By Continuing you agree to Reliance. Terms of Service and Privacy Policy</p>
            </div>
            <div className="signup-image">
                <img src={signup} alt="Doctors" />
            </div>
        </div>
    );
};

export default SignUp;