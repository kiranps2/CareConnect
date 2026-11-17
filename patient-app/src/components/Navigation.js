import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useSelector,
    useDispatch
} from "react-redux";

import api from "../api/axios";


function Navigation() {

    const isLoggedIn =
        useSelector(
            state =>
                state.auth.isLoggedIn
        );

    const dispatch =
        useDispatch();

    const navigate =
        useNavigate();


    const handleLogout = async () => {

        try {

            await api.post("/logout");

        } catch (error) {

            console.error(
                "Logout request failed.",
                error
            );

        }

        localStorage.removeItem(
            "token"
        );

        dispatch({

            type: "LOGOUT"

        });

        navigate("/login");

    };


    return (

        <nav
            className="navbar navbar-expand-lg sticky-top py-3"
            style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 15px rgba(0,0,0,0.06)"
            }}
        >

            <div className="container">

                {/* Brand */}
                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center fw-bold"
                    style={{
                        color: "#0d9488",
                        fontSize: "24px"
                    }}
                >

                    <div
                        className="rounded-3 d-flex align-items-center justify-content-center me-2"
                        style={{
                            width: "42px",
                            height: "42px",
                            backgroundColor: "#e6f7f5"
                        }}
                    >

                        <i className="bi bi-heart-pulse-fill"
                            style={{ fontSize: "23px" }}>
                        </i>

                    </div>

                    CareConnect

                </Link>


                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler border-0 shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#careConnectNavbar"
                    aria-controls="careConnectNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>


                {/* Navigation Links */}
                <div
                    className="collapse navbar-collapse"
                    id="careConnectNavbar"
                >

                    <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2 mt-3 mt-lg-0">

                        {/* Home */}
                        <Link
                            to="/"
                            className="nav-link px-3 fw-semibold"
                            style={{ color: "#526179" }}
                        >

                            <i className="bi bi-house-door me-2"></i>
                            Home

                        </Link>


                        {/* Doctors */}
                        <Link
                            to="/doctors"
                            className="nav-link px-3 fw-semibold"
                            style={{ color: "#526179" }}
                        >

                            <i className="bi bi-person-badge me-2"></i>
                            Doctors

                        </Link>


                        {/* Guest Links */}
                        {!isLoggedIn && (

                            <>

                                <Link
                                    to="/login"
                                    className="nav-link px-3 fw-semibold"
                                    style={{ color: "#526179" }}
                                >

                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Login

                                </Link>


                                <Link
                                    to="/register"
                                    className="btn rounded-pill px-4 py-2 fw-semibold text-white ms-lg-2"
                                    style={{
                                        backgroundColor: "#0d9488",
                                        border: "none"
                                    }}
                                >

                                    <i className="bi bi-person-plus me-2"></i>
                                    Register

                                </Link>

                            </>

                        )}


                        {/* Logged In Links */}
                        {isLoggedIn && (

                            <>

                                <Link
                                    to="/appointments"
                                    className="nav-link px-3 fw-semibold"
                                    style={{ color: "#526179" }}
                                >

                                    <i className="bi bi-calendar-check me-2"></i>
                                    Appointments

                                </Link>
                                <Link
                                    to="/appointments/book"
                                    className="nav-link px-3 fw-semibold"
                                    style={{ color: "#526179" }}
                                >
                                    <i className="bi bi-calendar-check me-2"></i>
                                    Book Appointment
                                </Link>

                                <Link
                                    to="/change-password"
                                    className="nav-link px-3 fw-semibold"
                                    style={{ color: "#526179" }}
                                >

                                    <i className="bi bi-shield-lock me-2"></i>
                                    Change Password

                                </Link>


                                {/* Logout */}
                                <button
                                    className="btn rounded-pill px-4 py-2 fw-semibold ms-lg-2"
                                    onClick={handleLogout}
                                    style={{
                                        backgroundColor: "#fff0f0",
                                        color: "#dc3545",
                                        border: "1px solid #ffe0e0"
                                    }}
                                >

                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    Logout

                                </button>

                            </>

                        )}

                    </div>

                </div>

            </div>

        </nav>

    );
}


export default Navigation;