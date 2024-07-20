import React, { useState, useEffect } from "react";
import "./auth.css";
import logo from "../Assets/Logo/logo.svg";
import login1 from "../Assets/Imgs/SignIn/login-1.png";
import login2 from "../Assets/Imgs/SignIn/login-2.png";
import login3 from "../Assets/Imgs/SignIn/login-3.png";
import login4 from "../Assets/Imgs/SignIn/login-4.png";
import login5 from "../Assets/Imgs/SignIn/login-5.png";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { message, Spin, Carousel } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Instance from "../AxiosConfig";

const CustomDot = ({ active }) => (
    <span className={`dot ${active ? 'active' : ''}`}></span>
);

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const sliderItems = [
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
        },
        {
            image: login4,
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
            image: login5,
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
    ];

    const checkToken = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await Instance.get('/validateToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                navigate('/dashboard')
            }
        } catch (error) {
            // No token present means login is required
        }
    }

    useEffect(() => {
        checkToken();
    }, []);

    const loginUser = async (email, password) => {
        try {
            const response = await Instance.post("/cms-login", {
                email, password
            });

            if (response.status === 200) {
                const { responseData } = response?.data;
                if (responseData) {
                    localStorage.setItem("loginUserData", JSON.stringify(responseData));
                    localStorage.setItem('token', responseData.token);
                    localStorage.setItem("dashboard", true);
                    navigate("/dashboard");
                }
            }
        } catch (error) {
            console.error(error);
            message.error(error?.response?.data?.message || "An error occurred. Please try again later.");
        }
        setLoading(false);
    }

    const ReDirect = () => {
        setLoading(true);
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('rememberedPassword', password);
        } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
        }

        if (email.match(emailregex) && password.length >= 8) {
            loginUser(email, password);
        }
        else {
            if (!email.match(emailregex)) {
                message.error("Please enter a valid email address. The format should be like 'example@example.com'.");
            }
            setLoading(false);
        }
    };

    const toggleRememberPassword = () => {
        setRememberMe(!rememberMe);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');

        if (rememberedEmail && rememberedPassword) {
            setEmail(rememberedEmail);
            setPassword(rememberedPassword);
            setRememberMe(true);
        }
    }, []);

    return (
        <>
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
                    <button className="login-button" onClick={ReDirect}>
                        {loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : 'Log In'}
                    </button>
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
        </>
    );
};

export default SignIn;