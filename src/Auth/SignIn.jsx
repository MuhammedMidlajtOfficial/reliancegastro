import React, { useEffect, useState } from "react";
import "./auth.css";
import logo from "../Assets/Logo/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { message, Spin, Carousel } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Instance from "../AxiosConfig";
import login1 from "../Assets/Imgs/SignIn/login-1.png";
import login2 from "../Assets/Imgs/SignIn/login-2.png";
import login3 from "../Assets/Imgs/SignIn/login-3.png";
import login4 from "../Assets/Imgs/SignIn/login-4.png";
import login5 from "../Assets/Imgs/SignIn/login-5.png";

const CustomDot = ({ active }) => (
    <span className={`dot ${active ? 'active' : ''}`}></span>
);

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const sliderItems = [
        {
            image: login4,
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
            image: login5,
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
            image: login1,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            image: login2,
            text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
            image: login3,
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        }
    ];

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const loginUser = async (email, password) => {
        try {
            setLoading(true);
            const response = await Instance.post("/auth/login", {
                email,
                password
            });
            console.log("Server response:", response);

            if (response.status === 200 && response.data && response.data.jwt_token) {
                localStorage.setItem("token", response.data.jwt_token);

                // Store user info in localStorage
                const userInfo = {
                    name: response.data.name,
                    email: response.data.email,
                    uid: response.data.uid
                };
                localStorage.setItem("userInfo", JSON.stringify(userInfo));

                message.success(`Welcome, ${response.data.name}!`);
                navigate("/overview");
            } else {
                console.error("Unexpected response structure:", response);
                message.error("Login failed. Unexpected response structure.");
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error);
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        message.error("Invalid email or password. Please try again.");
                        break;
                    case 404:
                        message.error("User not found. Please check your email.");
                        break;
                    default:
                        message.error(`Login failed: ${error.response.data.message || "Unknown error"}`);
                }
            } else if (error.request) {
                message.error("No response from server. Please check your internet connection.");
            } else {
                message.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        if (!email.match(emailRegex)) {
            message.error("Please enter a valid email address.");
            return;
        }
        if (password.length < 8) {
            message.error("Password must be at least 8 characters long.");
            return;
        }
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        loginUser(email, password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true);
        }
    }, []);

    return (
        <div className="login-container">
            <div className="login-form">
                <center>
                    <img src={logo} alt="Reliance Foundation Hospital" className="logo" />
                </center>
                <p className="login--p">Welcome to Institute of Gastro sciences</p>
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
                    <label htmlFor="password">Password*</label>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter your Password"
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
                </div>
                <Link to="/forgot-password" className="forgot-password">
                    Forgot Password?
                </Link>
                <button className="login-button" onClick={handleLogin}>
                    {loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />} /> : 'Log In'}
                </button>
                <p className="login-link">
                    Do not have an account? <Link to="/sign-up">Sign Up</Link>
                </p>
                <p className="terms">By Continuing you agree to Reliance Terms of Service and Privacy Policy</p>
            </div>
            <div className="login-image" style={{ height: '100%' }}>
                <Carousel
                    autoplay
                    dots={{ className: 'custom-dots' }}
                    customPaging={(i) => <CustomDot />}
                    autoplaySpeed={2000}
                    effect="fade"
                >
                    {sliderItems.map((item, index) => (
                        <div key={index}>
                            <img src={item.image} alt={`Slide ${index + 1}`} />
                            <div className="image-overlay">
                                <p>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default SignIn;
