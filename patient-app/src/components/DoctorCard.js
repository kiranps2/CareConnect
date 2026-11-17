import {
    Link
} from "react-router-dom";


function DoctorCard({ doctor }) {

    return (

        <div
            className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
            style={{
                transition: "all 0.3s ease",
                backgroundColor: "#ffffff"
            }}
        >

            {/* Doctor Header */}
            <div
                className="text-center pt-4 pb-3"
                style={{
                    backgroundColor: "#e6f7f5"
                }}
            >

                {/* Doctor Icon */}
                <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                        width: "85px",
                        height: "85px",
                        backgroundColor: "#0d9488",
                        border: "5px solid #ffffff",
                        boxShadow: "0 4px 12px rgba(13,148,136,0.15)"
                    }}
                >

                    <i
                        className="bi bi-person-fill text-white"
                        style={{ fontSize: "45px" }}
                    ></i>

                </div>

                <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                        backgroundColor: "#ffffff",
                        color: "#0d9488"
                    }}
                >
                    <i className="bi bi-patch-check-fill me-1"></i>
                    Healthcare Professional
                </span>

            </div>


            {/* Doctor Information */}
            <div className="card-body p-4">

                <div className="text-center mb-4">

                    <h5
                        className="fw-bold mb-2"
                        style={{ color: "#172b4d" }}
                    >
                        {doctor.name}
                    </h5>

                    <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                            backgroundColor: "#e6f7f5",
                            color: "#0d9488"
                        }}
                    >
                        <i className="bi bi-heart-pulse me-1"></i>
                        {doctor.specialization}
                    </span>

                </div>


                {/* Qualification */}
                <div className="d-flex align-items-center mb-3">

                    <div
                        className="rounded-3 p-2 me-3"
                        style={{
                            backgroundColor: "#f5f8fc",
                            color: "#0d9488"
                        }}
                    >
                        <i className="bi bi-mortarboard-fill fs-5"></i>
                    </div>

                    <div>
                        <small className="text-muted d-block">
                            Qualification
                        </small>

                        <span
                            className="fw-semibold"
                            style={{ color: "#172b4d" }}
                        >
                            {doctor.qualification}
                        </span>
                    </div>

                </div>


                {/* Experience */}
                <div className="d-flex align-items-center mb-4">

                    <div
                        className="rounded-3 p-2 me-3"
                        style={{
                            backgroundColor: "#fff4e5",
                            color: "#f59e0b"
                        }}
                    >
                        <i className="bi bi-briefcase-fill fs-5"></i>
                    </div>

                    <div>
                        <small className="text-muted d-block">
                            Experience
                        </small>

                        <span
                            className="fw-semibold"
                            style={{ color: "#172b4d" }}
                        >
                            {doctor.experience} Years
                        </span>
                    </div>

                </div>


                {/* View Details Button */}
                <Link
                    to={`/doctors/${doctor.id}`}
                    className="btn w-100 rounded-3 py-2 fw-semibold text-white"
                    style={{
                        backgroundColor: "#0d9488",
                        border: "none"
                    }}
                >

                    View Doctor Profile

                    <i className="bi bi-arrow-right ms-2"></i>

                </Link>

            </div>

        </div>
    );
}

export default DoctorCard;