import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import api from "../api/axios";


function DoctorDetails() {

    const { id } = useParams();

    const [doctor, setDoctor] =
        useState(null);

    useEffect(() => {

        loadDoctor();

    }, [id]);

    const loadDoctor = async () => {

        const response =
            await api.get(
                `/doctors/${id}`
            );

        setDoctor(response.data);
    };

    if (!doctor) {

        return (

            <div className="container py-5">

                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body text-center py-5">

                        <div className="spinner-border mb-3"
                            style={{ color: "#0d9488" }}
                            role="status">
                        </div>

                        <h5 className="fw-semibold">
                            Loading Doctor Details
                        </h5>

                        <p className="text-muted mb-0">
                            Please wait while we fetch the information.
                        </p>

                    </div>
                </div>

            </div>

        );
    }

    return (

        <div className="container-fluid py-4">

            {/* Page Heading */}
            <div className="mb-4">

                <h2 className="fw-bold mb-2"
                    style={{ color: "#172b4d" }}>
                    Doctor Profile
                </h2>

                <p className="text-muted mb-0">
                    View detailed information about our healthcare professional.
                </p>

            </div>


            {/* Doctor Profile Card */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                {/* Profile Header */}
                <div className="p-4 p-md-5"
                    style={{
                        background: "linear-gradient(135deg, #0d9488, #0a7a70)"
                    }}>

                    <div className="d-flex flex-wrap align-items-center">

                        <div className="rounded-circle d-flex align-items-center justify-content-center me-4 mb-3 mb-md-0"
                            style={{
                                width: "100px",
                                height: "100px",
                                backgroundColor: "rgba(255,255,255,0.2)",
                                border: "3px solid rgba(255,255,255,0.5)"
                            }}>

                            <i className="bi bi-person-fill text-white"
                                style={{ fontSize: "55px" }}>
                            </i>

                        </div>

                        <div className="text-white">

                            <span className="badge bg-white mb-2"
                                style={{ color: "#0d9488" }}>
                                <i className="bi bi-patch-check-fill me-1"></i>
                                Healthcare Professional
                            </span>

                            <h2 className="fw-bold mb-2">
                                {doctor.name}
                            </h2>

                            <h6 className="mb-0"
                                style={{ opacity: 0.9 }}>
                                <i className="bi bi-heart-pulse me-2"></i>
                                {doctor.specialization}
                            </h6>

                        </div>

                    </div>

                </div>


                {/* Doctor Information */}
                <div className="card-body p-4 p-md-5">

                    <div className="mb-4">

                        <h5 className="fw-bold mb-1"
                            style={{ color: "#172b4d" }}>
                            Professional Information
                        </h5>

                        <p className="text-muted small">
                            Doctor credentials and consultation details.
                        </p>

                    </div>


                    <div className="row g-4">

                        {/* Qualification */}
                        <div className="col-md-6">

                            <div className="p-4 rounded-3 h-100"
                                style={{ backgroundColor: "#f5f8fc" }}>

                                <div className="d-flex align-items-center">

                                    <div className="rounded-3 p-3 me-3"
                                        style={{
                                            backgroundColor: "#e6f7f5",
                                            color: "#0d9488"
                                        }}>

                                        <i className="bi bi-mortarboard-fill fs-4"></i>

                                    </div>

                                    <div>
                                        <small className="text-muted">
                                            Qualification
                                        </small>

                                        <h6 className="fw-bold mb-0"
                                            style={{ color: "#172b4d" }}>
                                            {doctor.qualification}
                                        </h6>
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Specialization */}
                        <div className="col-md-6">

                            <div className="p-4 rounded-3 h-100"
                                style={{ backgroundColor: "#f5f8fc" }}>

                                <div className="d-flex align-items-center">

                                    <div className="rounded-3 p-3 me-3"
                                        style={{
                                            backgroundColor: "#eaf2ff",
                                            color: "#3b82f6"
                                        }}>

                                        <i className="bi bi-heart-pulse-fill fs-4"></i>

                                    </div>

                                    <div>
                                        <small className="text-muted">
                                            Specialization
                                        </small>

                                        <h6 className="fw-bold mb-0"
                                            style={{ color: "#172b4d" }}>
                                            {doctor.specialization}
                                        </h6>
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Experience */}
                        <div className="col-md-6">

                            <div className="p-4 rounded-3 h-100"
                                style={{ backgroundColor: "#f5f8fc" }}>

                                <div className="d-flex align-items-center">

                                    <div className="rounded-3 p-3 me-3"
                                        style={{
                                            backgroundColor: "#fff4e5",
                                            color: "#f59e0b"
                                        }}>

                                        <i className="bi bi-briefcase-fill fs-4"></i>

                                    </div>

                                    <div>
                                        <small className="text-muted">
                                            Experience
                                        </small>

                                        <h6 className="fw-bold mb-0"
                                            style={{ color: "#172b4d" }}>
                                            {doctor.experience} Years
                                        </h6>
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Consultation Fee */}
                        <div className="col-md-6">

                            <div className="p-4 rounded-3 h-100"
                                style={{ backgroundColor: "#f5f8fc" }}>

                                <div className="d-flex align-items-center">

                                    <div className="rounded-3 p-3 me-3"
                                        style={{
                                            backgroundColor: "#f3e8ff",
                                            color: "#9333ea"
                                        }}>

                                        <i className="bi bi-currency-rupee fs-4"></i>

                                    </div>

                                    <div>
                                        <small className="text-muted">
                                            Consultation Fee
                                        </small>

                                        <h6 className="fw-bold mb-0"
                                            style={{ color: "#172b4d" }}>
                                            ₹{doctor.consultationFee}
                                        </h6>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Footer */}
                    <hr className="my-4"
                        style={{ borderColor: "#e9eef5" }} />

                    <div className="d-flex align-items-center text-muted">

                        <i className="bi bi-shield-check me-2"
                            style={{
                                color: "#0d9488",
                                fontSize: "20px"
                            }}>
                        </i>

                        <small>
                            CareConnect – Quality Healthcare, Trusted Professionals.
                        </small>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DoctorDetails;