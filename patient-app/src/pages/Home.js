
import { Link } from "react-router-dom";

function Home() {

    return (

        <div style={{ backgroundColor: "#f7fafc" }}>

            {/* Hero Section */}

            <section
                className="py-5"
                style={{
                    background: "linear-gradient(120deg, #e8f7f7, #f5faff)"
                }}
            >

                <div className="container py-lg-5">

                    <div className="row align-items-center g-5">

                        <div className="col-lg-6">

                            <span
                                className="badge rounded-pill px-3 py-2 mb-4"
                                style={{
                                    backgroundColor: "#d5f3ef",
                                    color: "#0d9488",
                                    fontSize: "13px"
                                }}
                            >
                                YOUR HEALTH, OUR PRIORITY
                            </span>

                            <h1
                                className="fw-bold mb-4"
                                style={{
                                    fontSize: "clamp(36px, 5vw, 54px)",
                                    color: "#172b4d",
                                    lineHeight: "1.2"
                                }}
                            >
                                Quality Healthcare,
                                <span style={{ color: "#0d9488" }}>
                                    {" "}Made Simple.
                                </span>
                            </h1>

                            <p
                                className="text-secondary mb-4"
                                style={{
                                    fontSize: "17px",
                                    lineHeight: "1.8",
                                    maxWidth: "520px"
                                }}
                            >
                                Your health deserves the best care.
                                Discover experienced doctors, explore
                                medical specialties and book your
                                appointments with ease.
                            </p>

                            <div className="d-flex flex-wrap gap-3">

                                <Link
                                    to="/doctors"
                                    className="btn btn-lg text-white px-4 py-3"
                                    style={{
                                        backgroundColor: "#0d9488",
                                        borderRadius: "8px",
                                        fontSize: "15px",
                                        fontWeight: "600"
                                    }}
                                >
                                    Find a Doctor
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </Link>

                                <Link
                                    to="/appointments"
                                    className="btn btn-lg btn-outline-secondary px-4 py-3"
                                    style={{
                                        borderRadius: "8px",
                                        fontSize: "15px",
                                        fontWeight: "600"
                                    }}
                                >
                                    My Appointments
                                </Link>

                            </div>

                            <div className="d-flex flex-wrap gap-4 mt-5">

                                <div>
                                    <h4 className="fw-bold mb-1"
                                        style={{ color: "#172b4d" }}>
                                        <i className="bi bi-shield-check me-2"
                                            style={{ color: "#0d9488" }}>
                                        </i>
                                        Trusted Care
                                    </h4>
                                    <small className="text-secondary">
                                        Patient-focused healthcare
                                    </small>
                                </div>

                                <div>
                                    <h4 className="fw-bold mb-1"
                                        style={{ color: "#172b4d" }}>
                                        <i className="bi bi-calendar-check me-2"
                                            style={{ color: "#0d9488" }}>
                                        </i>
                                        Easy Booking
                                    </h4>
                                    <small className="text-secondary">
                                        Convenient appointments
                                    </small>
                                </div>

                            </div>

                        </div>


                        {/* Hero Image */}

                        <div className="col-lg-6">

                            <div
                                className="position-relative"
                                style={{
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    boxShadow: "0 20px 50px rgba(23,43,77,0.12)"
                                }}
                            >

                                <img
                                    src="https://www.maintex.in/hospital1.jpeg"
                                    alt="Doctor providing healthcare"
                                    className="w-100"
                                    style={{
                                        height: "430px",
                                        objectFit: "cover"
                                    }}
                                />

                                <div
                                    className="position-absolute bottom-0 start-0 end-0 p-4"
                                    style={{
                                        background: "linear-gradient(transparent, rgba(0,0,0,0.65))"
                                    }}
                                >

                                    <h4 className="text-white fw-bold mb-1">
                                        Healthcare You Can Trust
                                    </h4>

                                    <p className="text-white mb-0">
                                        Making your healthcare journey easier.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Services Section */}

            <section className="py-5">

                <div className="container py-4">

                    <div className="text-center mb-5">

                        <span
                            className="fw-semibold"
                            style={{ color: "#0d9488" }}
                        >
                            OUR SERVICES
                        </span>

                        <h2 className="fw-bold mt-2"
                            style={{ color: "#172b4d" }}>
                            Healthcare Made Convenient
                        </h2>

                        <p className="text-secondary mt-3">
                            Everything you need to manage your healthcare
                            in one place.
                        </p>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-4">

                            <div className="card border-0 h-100 p-4"
                                style={{
                                    borderRadius: "14px",
                                    boxShadow: "0 5px 25px rgba(0,0,0,0.05)"
                                }}>

                                <div
                                    className="rounded-3 d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "58px",
                                        height: "58px",
                                        backgroundColor: "#e0f5f2"
                                    }}
                                >
                                    <i className="bi bi-person-badge fs-3"
                                        style={{ color: "#0d9488" }}>
                                    </i>
                                </div>

                                <h5 className="fw-bold"
                                    style={{ color: "#172b4d" }}>
                                    Find Expert Doctors
                                </h5>

                                <p className="text-secondary mb-4">
                                    Explore doctors across different
                                    medical specialties and find the
                                    right healthcare professional.
                                </p>

                                <Link
                                    to="/doctors"
                                    className="text-decoration-none fw-semibold mt-auto"
                                    style={{ color: "#0d9488" }}
                                >
                                    Explore Doctors
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </Link>

                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="card border-0 h-100 p-4"
                                style={{
                                    borderRadius: "14px",
                                    boxShadow: "0 5px 25px rgba(0,0,0,0.05)"
                                }}>

                                <div
                                    className="rounded-3 d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "58px",
                                        height: "58px",
                                        backgroundColor: "#eaf0ff"
                                    }}
                                >
                                    <i className="bi bi-calendar2-check fs-3"
                                        style={{ color: "#4263eb" }}>
                                    </i>
                                </div>

                                <h5 className="fw-bold"
                                    style={{ color: "#172b4d" }}>
                                    Easy Appointment Booking
                                </h5>

                                <p className="text-secondary mb-4">
                                    Schedule your doctor visits easily
                                    by choosing a convenient date and
                                    available appointment time.
                                </p>

                                <Link
                                    to="/doctors"
                                    className="text-decoration-none fw-semibold mt-auto"
                                    style={{ color: "#0d9488" }}
                                >
                                    Book Appointment
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </Link>

                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="card border-0 h-100 p-4"
                                style={{
                                    borderRadius: "14px",
                                    boxShadow: "0 5px 25px rgba(0,0,0,0.05)"
                                }}>

                                <div
                                    className="rounded-3 d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "58px",
                                        height: "58px",
                                        backgroundColor: "#fff1e5"
                                    }}
                                >
                                    <i className="bi bi-clipboard2-pulse fs-3"
                                        style={{ color: "#e58b35" }}>
                                    </i>
                                </div>

                                <h5 className="fw-bold"
                                    style={{ color: "#172b4d" }}>
                                    Manage Your Appointments
                                </h5>

                                <p className="text-secondary mb-4">
                                    Keep track of upcoming appointments
                                    and conveniently access your
                                    appointment history.
                                </p>

                                <Link
                                    to="/appointments"
                                    className="text-decoration-none fw-semibold mt-auto"
                                    style={{ color: "#0d9488" }}
                                >
                                    View Appointments
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Why Choose Us */}

            <section
                className="py-5"
                style={{ backgroundColor: "#eaf7f6" }}
            >

                <div className="container py-4">

                    <div className="row align-items-center g-5">

                        <div className="col-lg-6">

                            <span
                                className="fw-semibold"
                                style={{ color: "#0d9488" }}
                            >
                                WHY CARECONNECT?
                            </span>

                            <h2 className="fw-bold mt-3 mb-4"
                                style={{ color: "#172b4d" }}>
                                Your Health Journey,
                                Simplified.
                            </h2>

                            <p className="text-secondary mb-4"
                                style={{ lineHeight: "1.8" }}>
                                We make it easier to connect with
                                healthcare professionals and manage
                                your appointments without unnecessary
                                complications.
                            </p>

                            <div className="d-flex gap-3 mb-4">

                                <i className="bi bi-check-circle-fill fs-4"
                                    style={{ color: "#0d9488" }}>
                                </i>

                                <div>
                                    <h6 className="fw-bold">
                                        Convenient Online Booking
                                    </h6>
                                    <p className="text-secondary mb-0">
                                        Book appointments anytime from
                                        the comfort of your home.
                                    </p>
                                </div>

                            </div>

                            <div className="d-flex gap-3 mb-4">

                                <i className="bi bi-check-circle-fill fs-4"
                                    style={{ color: "#0d9488" }}>
                                </i>

                                <div>
                                    <h6 className="fw-bold">
                                        Experienced Healthcare Professionals
                                    </h6>
                                    <p className="text-secondary mb-0">
                                        Discover doctors with different
                                        qualifications and specializations.
                                    </p>
                                </div>

                            </div>

                            <div className="d-flex gap-3">

                                <i className="bi bi-check-circle-fill fs-4"
                                    style={{ color: "#0d9488" }}>
                                </i>

                                <div>
                                    <h6 className="fw-bold">
                                        Easy Appointment Management
                                    </h6>
                                    <p className="text-secondary mb-0">
                                        View and manage your appointments
                                        in one convenient place.
                                    </p>
                                </div>

                            </div>

                        </div>


                        <div className="col-lg-6">

                            <img
                                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85"
                                alt="Healthcare professional consulting a patient"
                                className="img-fluid w-100"
                                style={{
                                    height: "400px",
                                    objectFit: "cover",
                                    borderRadius: "18px",
                                    boxShadow: "0 15px 35px rgba(0,0,0,0.10)"
                                }}
                            />

                        </div>

                    </div>

                </div>

            </section>


            {/* Call To Action */}

            <section className="py-5">

                <div className="container py-4">

                    <div
                        className="text-center text-white p-5"
                        style={{
                            background: "linear-gradient(120deg, #0d9488, #08766e)",
                            borderRadius: "18px"
                        }}
                    >

                        <h2 className="fw-bold mb-3">
                            Take the First Step Towards Better Health
                        </h2>

                        <p className="mb-4"
                            style={{ opacity: 0.9 }}>
                            Find the right doctor and schedule your
                            appointment today.
                        </p>

                        <Link
                            to="/doctors"
                            className="btn btn-light btn-lg px-4 fw-semibold"
                            style={{ color: "#0d9488" }}
                        >
                            Find a Doctor
                            <i className="bi bi-arrow-right ms-2"></i>
                        </Link>

                    </div>

                </div>

            </section>


            {/* Footer */}

            <footer
                className="py-4 text-center"
                style={{
                    backgroundColor: "#172b4d",
                    color: "#cbd5e1"
                }}
            >

                <div className="container">

                    <h5 className="text-white fw-bold mb-2">
                        CareConnect
                    </h5>

                    <p className="mb-2">
                        Connecting patients with better healthcare.
                    </p>

                    <small>
                        © {new Date().getFullYear()} CareConnect.
                        All rights reserved.
                    </small>

                </div>

            </footer>

        </div>
    );
}

export default Home;
