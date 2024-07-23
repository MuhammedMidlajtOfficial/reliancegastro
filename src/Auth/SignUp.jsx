import React, { useState } from "react";
import "./auth.css";
import logo from "../Assets/Logo/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { message, Spin } from "antd";
import Instance from "../AxiosConfig";
import signup from "../Assets/Imgs/SignUp/SignUp.png";
import { LoadingOutlined } from "@ant-design/icons";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSignUp = async () => {
        if (!name || !email || !phoneNumber || !password) {
            message.error("Please fill in all required fields.");
            return;
        }

        if (!emailRegex.test(email)) {
            message.error("Please enter a valid email address.");
            return;
        }

        if (password.length < 8) {
            message.error("Password must be at least 8 characters long.");
            return;
        }

        try {
            setLoading(true);
            const response = await Instance.post("/auth/register", {
                name,
                email,
                phoneNumber,
                password
            });
            console.log(response.data);

            message.success("Sign up successful. Please log in.");

            navigate('/');
        } catch (error) {
            console.error("Sign up failed:", error);
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message);
            } else if (error.response && error.response.status === 409) {
                message.error("This email is already in use. Please use a different email or try logging in.");
            } else {
                message.error("Sign up failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
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
                    {loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />} /> : ' Create account'}
                </button>
                <p className="login-link">
                    Already have an account? <Link to="/">Sign In</Link>
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
