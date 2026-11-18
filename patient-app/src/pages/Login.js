
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/login", {
                email,
                password
            });

            const token = response.data.token;

            if (!token) {
                throw new Error("Login response did not contain an authentication token.");
            }

            localStorage.setItem("token", token);

            dispatch({
                type: "LOGIN",
                payload: token
            });

            navigate("/appointments");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                error.message ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="container-fluid">
                <div className="row min-vh-100">

                    {/* Left Side - Branding */}
                    <div className="col-lg-6 login-left">
                        <div className="login-overlay"></div>

                        <div className="login-brand-content">

                            <Link to="/" className="brand-logo">
                                <i className="bi bi-heart-pulse-fill"></i>
                                CareConnect
                            </Link>

                            <div className="login-welcome">
                                <span className="welcome-tag">
                                    YOUR HEALTH, OUR PRIORITY
                                </span>

                                <h1>
                                    Welcome back to
                                    <br />
                                    better healthcare.
                                </h1>

                                <p>
                                    Sign in to manage your appointments,
                                    connect with trusted doctors, and take
                                    control of your healthcare journey.
                                </p>

                                <div className="login-features">
                                    <div>
                                        <i className="bi bi-check-circle-fill"></i>
                                        Easy appointment management
                                    </div>

                                    <div>
                                        <i className="bi bi-check-circle-fill"></i>
                                        Access trusted healthcare professionals
                                    </div>

                                    <div>
                                        <i className="bi bi-check-circle-fill"></i>
                                        Your healthcare information in one place
                                    </div>
                                </div>
                            </div>

                            <div className="login-left-footer">
                                © 2026 CareConnect. All rights reserved.
                            </div>

                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="col-lg-6 login-right">

                        <div className="login-form-wrapper">

                            <div className="mobile-brand">
                                <i className="bi bi-heart-pulse-fill"></i>
                                CareConnect
                            </div>

                            <div className="login-heading">
                                <span className="form-subtitle">
                                    PATIENT PORTAL
                                </span>

                                <h2>Sign in to your account</h2>

                                <p>
                                    Enter your details below to continue.
                                </p>
                            </div>

                            {error && (
                                <div className="login-error">
                                    <i className="bi bi-exclamation-circle-fill"></i>
                                    <span>{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                {/* Email */}
                                <div className="login-field">
                                    <label htmlFor="email">
                                        Email address
                                    </label>

                                    <div className="login-input-wrapper">
                                        <i className="bi bi-envelope"></i>

                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(event) =>
                                                setEmail(event.target.value)
                                            }
                                            autoComplete="email"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="login-field">
                                    <div className="password-label">
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                    </div>

                                    <div className="login-input-wrapper">
                                        <i className="bi bi-lock"></i>

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(event) =>
                                                setPassword(event.target.value)
                                            }
                                            autoComplete="current-password"
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            <i className={
                                                showPassword
                                                    ? "bi bi-eye-slash"
                                                    : "bi bi-eye"
                                            }></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="login-submit-btn"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <i className="bi bi-arrow-right"></i>
                                        </>
                                    )}
                                </button>

                            </form>

                            <div className="login-divider">
                                <span>NEW TO CARECONNECT?</span>
                            </div>

                            <p className="register-text">
                                Don't have an account?
                                <Link to="/register"> Create an account</Link>
                            </p>

                            <div className="login-security">
                                <i className="bi bi-shield-check"></i>
                                Your information is protected and secure.
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                * {
                    box-sizing: border-box;
                }

                .login-page {
                    min-height: 100vh;
                    background: #f7fafc;
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                }

                .login-left {
                    position: relative;
                    min-height: 100vh;
                    background:
                        linear-gradient(
                            135deg,
                            rgba(7, 105, 100, 0.94),
                            rgba(13, 148, 136, 0.78)
                        ),
                        url('https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1400&q=85')
                        center/cover no-repeat;
                    color: white;
                    display: flex;
                    align-items: center;
                    padding: 65px 9%;
                }

                .login-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        135deg,
                        rgba(5, 80, 78, 0.18),
                        transparent
                    );
                }

                .login-brand-content {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    max-width: 560px;
                    margin: auto;
                    min-height: 75vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .brand-logo {
                    color: white;
                    text-decoration: none;
                    font-size: 27px;
                    font-weight: 800;
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                }

                .brand-logo i {
                    font-size: 34px;
                }

                .login-welcome {
                    margin: 65px 0;
                }

                .welcome-tag,
                .form-subtitle {
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 2px;
                }

                .welcome-tag {
                    background: rgba(255,255,255,0.16);
                    padding: 10px 15px;
                    border-radius: 30px;
                    display: inline-block;
                }

                .login-welcome h1 {
                    font-size: clamp(36px, 4vw, 53px);
                    font-weight: 800;
                    line-height: 1.2;
                    margin: 28px 0 20px;
                }

                .login-welcome p {
                    font-size: 16px;
                    line-height: 1.9;
                    color: rgba(255,255,255,0.86);
                    max-width: 470px;
                }

                .login-features {
                    margin-top: 35px;
                    display: grid;
                    gap: 18px;
                }

                .login-features div {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 14px;
                    color: white;
                }

                .login-features i {
                    font-size: 18px;
                    color: #a7f3d0;
                }

                .login-left-footer {
                    font-size: 12px;
                    color: rgba(255,255,255,0.7);
                }

                .login-right {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 55px 35px;
                    background: #f7fafc;
                }

                .login-form-wrapper {
                    width: 100%;
                    max-width: 430px;
                }

                .mobile-brand {
                    display: none;
                    color: #0d9488;
                    font-size: 24px;
                    font-weight: 800;
                    margin-bottom: 45px;
                }

                .mobile-brand i {
                    margin-right: 9px;
                }

                .login-heading {
                    margin-bottom: 35px;
                }

                .form-subtitle {
                    color: #0d9488;
                }

                .login-heading h2 {
                    font-size: 30px;
                    font-weight: 800;
                    color: #172b4d;
                    margin: 13px 0 10px;
                }

                .login-heading p {
                    color: #8492a6;
                    font-size: 14px;
                    margin: 0;
                }

                .login-field {
                    margin-bottom: 24px;
                }

                .login-field label {
                    display: block;
                    font-size: 13px;
                    font-weight: 700;
                    color: #344563;
                    margin-bottom: 9px;
                }

                .login-input-wrapper {
                    height: 55px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 0 16px;
                    border: 1px solid #e1e8ef;
                    border-radius: 10px;
                    background: white;
                    transition: all 0.2s ease;
                }

                .login-input-wrapper:focus-within {
                    border-color: #0d9488;
                    box-shadow: 0 0 0 3px rgba(13,148,136,0.10);
                }

                .login-input-wrapper > i {
                    color: #8492a6;
                    font-size: 18px;
                }

                .login-input-wrapper input {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: #172b4d;
                    font-size: 14px;
                }

                .login-input-wrapper input::placeholder {
                    color: #aab5c2;
                }

                .password-toggle {
                    border: none;
                    background: transparent;
                    color: #8492a6;
                    font-size: 18px;
                    cursor: pointer;
                }

                .login-submit-btn {
                    width: 100%;
                    height: 54px;
                    border: none;
                    border-radius: 10px;
                    background: #0d9488;
                    color: white;
                    font-size: 15px;
                    font-weight: 700;
                    margin-top: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 12px;
                    transition: all 0.2s ease;
                }

                .login-submit-btn:hover:not(:disabled) {
                    background: #0a7a70;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 18px rgba(13,148,136,0.2);
                }

                .login-submit-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .login-error {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    padding: 13px 15px;
                    border-radius: 9px;
                    background: #fff1f0;
                    color: #c0392b;
                    font-size: 13px;
                    margin-bottom: 22px;
                }

                .login-divider {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin: 35px 0 20px;
                }

                .login-divider::before,
                .login-divider::after {
                    content: "";
                    flex: 1;
                    height: 1px;
                    background: #e5eaf0;
                }

                .login-divider span {
                    color: #9aa6b2;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 1.3px;
                    white-space: nowrap;
                }

                .register-text {
                    text-align: center;
                    color: #718096;
                    font-size: 14px;
                }

                .register-text a {
                    color: #0d9488;
                    font-weight: 700;
                    text-decoration: none;
                }

                .register-text a:hover {
                    text-decoration: underline;
                }

                .login-security {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    margin-top: 45px;
                    color: #8492a6;
                    font-size: 12px;
                }

                .login-security i {
                    color: #0d9488;
                    font-size: 17px;
                }

                @media (max-width: 991px) {
                    .login-left {
                        display: none;
                    }

                    .login-right {
                        padding: 45px 25px;
                    }

                    .mobile-brand {
                        display: block;
                    }
                }

                @media (max-width: 576px) {
                    .login-right {
                        padding: 30px 22px;
                    }

                    .login-heading h2 {
                        font-size: 26px;
                    }

                    .login-security {
                        margin-top: 35px;
                    }
                }
            `}</style>
        </div>
    );
}

export default Login;
