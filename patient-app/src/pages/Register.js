
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Register() {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        address: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Today's date
    const today = new Date().toLocaleDateString("en-CA");

    const handleChange = (event) => {

        setForm({
            ...form,
            [event.target.name]: event.target.value
        });

        setError("");
        setMessage("");
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");
        setError("");

        if (form.dateOfBirth >= today) {
            setError("Please select a valid date of birth.");
            return;
        }

        if (form.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post(
                "/register",
                form
            );

            setMessage(
                response.data.message || "Registration successful!"
            );

            setForm({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                phoneNumber: "",
                dateOfBirth: "",
                gender: "",
                address: ""
            });

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        borderRadius: "8px",
        padding: "11px 13px",
        border: "1px solid #dce5ed",
        fontSize: "14px"
    };

    const labelStyle = {
        fontSize: "13px",
        fontWeight: "600",
        color: "#34445b",
        marginBottom: "7px"
    };

    return (

        <div
            className="container-fluid py-5"
            style={{
                backgroundColor: "#f4f8fb",
                minHeight: "100vh"
            }}
        >

            <div className="container">

                <div
                    className="row justify-content-center align-items-stretch mx-auto"
                    style={{
                        maxWidth: "1100px",
                        backgroundColor: "#fff",
                        borderRadius: "18px",
                        overflow: "hidden",
                        boxShadow: "0 12px 45px rgba(23,43,77,0.09)"
                    }}
                >

                    {/* LEFT SIDE */}

                    <div className="col-lg-5 p-0 d-none d-lg-block">

                        <div
                            className="h-100 d-flex flex-column justify-content-between p-5 text-white"
                            style={{
                                background: "linear-gradient(160deg, rgba(5,100,94,0.94), rgba(13,148,136,0.86)), url('https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=85') center/cover",
                                minHeight: "750px"
                            }}
                        >

                            <div>

                                <h3 className="fw-bold mb-2">
                                    <i className="bi bi-heart-pulse me-2"></i>
                                    CareConnect
                                </h3>

                                <p style={{ opacity: 0.85 }}>
                                    Your Health, Our Priority
                                </p>

                            </div>


                            <div>

                                <h1
                                    className="fw-bold mb-4"
                                    style={{
                                        fontSize: "38px",
                                        lineHeight: "1.3"
                                    }}
                                >
                                    Better Healthcare
                                    Starts With You.
                                </h1>

                                <p
                                    className="mb-4"
                                    style={{
                                        lineHeight: "1.8",
                                        opacity: 0.9
                                    }}
                                >
                                    Create your CareConnect account
                                    and experience a simpler way to
                                    connect with healthcare professionals
                                    and manage your appointments.
                                </p>


                                <div className="d-flex gap-3 mb-4">

                                    <i className="bi bi-check-circle-fill fs-5"></i>

                                    <span>
                                        Easy online appointment booking
                                    </span>

                                </div>

                                <div className="d-flex gap-3 mb-4">

                                    <i className="bi bi-check-circle-fill fs-5"></i>

                                    <span>
                                        Access to qualified doctors
                                    </span>

                                </div>

                                <div className="d-flex gap-3">

                                    <i className="bi bi-check-circle-fill fs-5"></i>

                                    <span>
                                        Manage your appointments easily
                                    </span>

                                </div>

                            </div>


                            <small style={{ opacity: 0.8 }}>
                                © {new Date().getFullYear()} CareConnect. All rights reserved.
                            </small>

                        </div>

                    </div>


                    {/* RIGHT SIDE - FORM */}

                    <div className="col-lg-7 p-4 p-md-5">

                        <div className="mb-4">

                            <div
                                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    backgroundColor: "#e5f6f3",
                                    color: "#0d9488"
                                }}
                            >
                                <i className="bi bi-person-plus fs-4"></i>
                            </div>

                            <h2
                                className="fw-bold mb-2"
                                style={{ color: "#172b4d" }}
                            >
                                Create Your Account
                            </h2>

                            <p className="text-secondary mb-0">
                                Join CareConnect and take control
                                of your healthcare journey.
                            </p>

                        </div>


                        {message && (
                            <div className="alert alert-success">
                                <i className="bi bi-check-circle-fill me-2"></i>
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger">
                                <i className="bi bi-exclamation-circle-fill me-2"></i>
                                {error}
                            </div>
                        )}


                        <form onSubmit={handleSubmit}>

                            {/* NAME */}

                            <div className="row g-3 mb-3">

                                <div className="col-md-6">

                                    <label style={labelStyle}>
                                        First Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        placeholder="Enter first name"
                                        style={inputStyle}
                                        value={form.firstName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="col-md-6">

                                    <label style={labelStyle}>
                                        Last Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        placeholder="Enter last name"
                                        style={inputStyle}
                                        value={form.lastName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>


                            {/* EMAIL */}

                            <div className="mb-3">

                                <label style={labelStyle}>
                                    Email Address *
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-white"
                                        style={{
                                            borderRadius: "8px 0 0 8px",
                                            borderColor: "#dce5ed"
                                        }}>
                                        <i className="bi bi-envelope text-secondary"></i>
                                    </span>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="example@email.com"
                                        style={{
                                            ...inputStyle,
                                            borderRadius: "0 8px 8px 0"
                                        }}
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>


                            {/* PASSWORD */}

                            <div className="mb-3">

                                <label style={labelStyle}>
                                    Password *
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-white"
                                        style={{
                                            borderRadius: "8px 0 0 8px",
                                            borderColor: "#dce5ed"
                                        }}>
                                        <i className="bi bi-lock text-secondary"></i>
                                    </span>

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="form-control"
                                        placeholder="Minimum 8 characters"
                                        style={{
                                            ...inputStyle,
                                            borderRadius: "0"
                                        }}
                                        value={form.password}
                                        onChange={handleChange}
                                        minLength="8"
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="input-group-text bg-white"
                                        style={{
                                            borderRadius: "0 8px 8px 0",
                                            borderColor: "#dce5ed"
                                        }}
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} text-secondary`}></i>
                                    </button>

                                </div>

                            </div>


                            {/* PHONE */}

                            <div className="mb-3">

                                <label style={labelStyle}>
                                    Phone Number *
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-white"
                                        style={{
                                            borderRadius: "8px 0 0 8px",
                                            borderColor: "#dce5ed"
                                        }}>
                                        <i className="bi bi-telephone text-secondary"></i>
                                    </span>

                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        style={{
                                            ...inputStyle,
                                            borderRadius: "0 8px 8px 0"
                                        }}
                                        value={form.phoneNumber}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>


                            {/* DOB AND GENDER */}

                            <div className="row g-3 mb-3">

                                <div className="col-md-6">

                                    <label style={labelStyle}>
                                        Date of Birth *
                                    </label>

                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        className="form-control"
                                        style={inputStyle}
                                        value={form.dateOfBirth}
                                        max={today}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="col-md-6">

                                    <label style={labelStyle}>
                                        Gender *
                                    </label>

                                    <select
                                        name="gender"
                                        className="form-select"
                                        style={inputStyle}
                                        value={form.gender}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select Gender
                                        </option>

                                        <option value="Male">
                                            Male
                                        </option>

                                        <option value="Female">
                                            Female
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* ADDRESS */}

                            <div className="mb-4">

                                <label style={labelStyle}>
                                    Address *
                                </label>

                                <textarea
                                    name="address"
                                    className="form-control"
                                    placeholder="Enter your full address"
                                    rows="3"
                                    style={{
                                        ...inputStyle,
                                        resize: "none"
                                    }}
                                    value={form.address}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* SUBMIT */}

                            <button
                                type="submit"
                                className="btn w-100 text-white py-3 fw-semibold"
                                disabled={loading}
                                style={{
                                    backgroundColor: "#0d9488",
                                    borderRadius: "8px",
                                    border: "none"
                                }}
                            >

                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <i className="bi bi-arrow-right ms-2"></i>
                                    </>
                                )}

                            </button>


                            <p className="text-center text-secondary mt-4 mb-0"
                                style={{ fontSize: "14px" }}>

                                Already have an account?

                                <Link
                                    to="/login"
                                    className="text-decoration-none fw-bold ms-1"
                                    style={{ color: "#0d9488" }}
                                >
                                    Sign In
                                </Link>

                            </p>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;
