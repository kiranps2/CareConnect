import {
    useEffect,
    useState
} from "react";

import DoctorCard
    from "../components/DoctorCard";

import api from "../api/axios";

function DoctorList() {

    const [doctors, setDoctors] =
        useState([]);

    useEffect(() => {

        loadDoctors();

    }, []);

    const loadDoctors = async () => {

        const response =
            await api.get("/doctors");

        setDoctors(response.data);
    };

    return (

        <div className="container-fluid py-4">

            {/* Page Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold mb-2"
                        style={{ color: "#172b4d" }}>
                        Our Doctors
                    </h2>

                    <p className="text-muted mb-0">
                        Find experienced healthcare professionals
                        and choose the right doctor for your needs.
                    </p>
                </div>

                <div className="mt-3 mt-md-0">
                    <span className="badge rounded-pill px-3 py-2"
                        style={{
                            backgroundColor: "#e6f7f5",
                            color: "#0d9488",
                            fontSize: "14px"
                        }}>
                        <i className="bi bi-hospital me-2"></i>
                        {doctors.length} Doctors Available
                    </span>
                </div>

            </div>

            {/* Doctor Statistics */}
            <div className="row g-3 mb-4">

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body d-flex align-items-center p-4">

                            <div className="rounded-3 p-3 me-3"
                                style={{
                                    backgroundColor: "#e6f7f5",
                                    color: "#0d9488"
                                }}>
                                <i className="bi bi-people-fill fs-4"></i>
                            </div>

                            <div>
                                <h4 className="fw-bold mb-1">
                                    {doctors.length}
                                </h4>
                                <small className="text-muted">
                                    Total Doctors
                                </small>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body d-flex align-items-center p-4">

                            <div className="rounded-3 p-3 me-3"
                                style={{
                                    backgroundColor: "#eaf2ff",
                                    color: "#3b82f6"
                                }}>
                                <i className="bi bi-heart-pulse-fill fs-4"></i>
                            </div>

                            <div>
                                <h4 className="fw-bold mb-1">
                                    Healthcare
                                </h4>
                                <small className="text-muted">
                                    Professional Care
                                </small>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body d-flex align-items-center p-4">

                            <div className="rounded-3 p-3 me-3"
                                style={{
                                    backgroundColor: "#fff4e5",
                                    color: "#f59e0b"
                                }}>
                                <i className="bi bi-shield-check fs-4"></i>
                            </div>

                            <div>
                                <h4 className="fw-bold mb-1">
                                    Trusted
                                </h4>
                                <small className="text-muted">
                                    Quality Healthcare
                                </small>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            {/* Doctor Section */}
            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>
                            <h5 className="fw-bold mb-1"
                                style={{ color: "#172b4d" }}>
                                Meet Our Specialists
                            </h5>

                            <small className="text-muted">
                                Explore our available medical professionals.
                            </small>
                        </div>

                        <span className="text-muted small">
                            <i className="bi bi-grid-fill me-2"></i>
                            Doctor Directory
                        </span>

                    </div>

                    {/* Doctor Cards */}
                    <div className="row">

                        {doctors.length > 0 ? (

                            doctors.map(
                                doctor => (

                                    <div
                                        className="col-md-6 col-lg-4 mb-4"
                                        key={doctor.id}
                                    >

                                        <DoctorCard
                                            doctor={doctor}
                                        />

                                    </div>

                                )
                            )

                        ) : (

                            <div className="col-12 text-center py-5">

                                <div className="mb-3">
                                    <i className="bi bi-person-x"
                                        style={{
                                            fontSize: "55px",
                                            color: "#cbd5e1"
                                        }}>
                                    </i>
                                </div>

                                <h5 className="fw-bold text-secondary">
                                    No Doctors Available
                                </h5>

                                <p className="text-muted mb-0">
                                    There are currently no doctors to display.
                                    Please check again later.
                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DoctorList;