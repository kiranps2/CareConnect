function Footer() {

    return (

        <footer
            className="mt-5"
            style={{
                backgroundColor: "#172b4d",
                color: "#ffffff"
            }}
        >

            <div className="container py-5">

                <div className="row g-4">

                    {/* Brand Section */}
                    <div className="col-md-5">

                        <div className="d-flex align-items-center mb-3">

                            <div
                                className="rounded-3 d-flex align-items-center justify-content-center me-2"
                                style={{
                                    width: "42px",
                                    height: "42px",
                                    backgroundColor: "#0d9488"
                                }}
                            >

                                <i className="bi bi-heart-pulse-fill fs-4 text-white"></i>

                            </div>

                            <h4 className="fw-bold mb-0">
                                CareConnect
                            </h4>

                        </div>

                        <p
                            className="mb-0"
                            style={{
                                color: "#b8c5d6",
                                lineHeight: "1.8",
                                maxWidth: "380px"
                            }}
                        >
                            Connecting patients with trusted healthcare
                            professionals. Your health and well-being
                            are our priority.
                        </p>

                    </div>


                    {/* Quick Links */}
                    <div className="col-md-3">

                        <h6 className="fw-bold mb-3">
                            Quick Links
                        </h6>

                        <ul className="list-unstyled">

                            <li className="mb-2">
                                <a
                                    href="/"
                                    className="text-decoration-none"
                                    style={{ color: "#b8c5d6" }}
                                >
                                    <i className="bi bi-chevron-right me-2"></i>
                                    Home
                                </a>
                            </li>

                            <li className="mb-2">
                                <a
                                    href="/doctors"
                                    className="text-decoration-none"
                                    style={{ color: "#b8c5d6" }}
                                >
                                    <i className="bi bi-chevron-right me-2"></i>
                                    Our Doctors
                                </a>
                            </li>

                            <li className="mb-2">
                                <a
                                    href="/appointments"
                                    className="text-decoration-none"
                                    style={{ color: "#b8c5d6" }}
                                >
                                    <i className="bi bi-chevron-right me-2"></i>
                                    Appointments
                                </a>
                            </li>

                        </ul>

                    </div>


                    {/* Contact Section */}
                    <div className="col-md-4">

                        <h6 className="fw-bold mb-3">
                            Contact Information
                        </h6>

                        <p style={{ color: "#b8c5d6" }}>
                            <i className="bi bi-heart-pulse me-2"
                                style={{ color: "#14b8a6" }}></i>
                            Your Health, Our Priority
                        </p>

                        <p style={{ color: "#b8c5d6" }}>
                            <i className="bi bi-shield-check me-2"
                                style={{ color: "#14b8a6" }}></i>
                            Trusted Healthcare Platform
                        </p>

                    </div>

                </div>


                {/* Divider */}
                <hr
                    className="my-4"
                    style={{
                        borderColor: "#40516b",
                        opacity: 1
                    }}
                />


                {/* Copyright */}
                <div className="d-flex flex-wrap justify-content-between align-items-center">

                    <p
                        className="mb-2 mb-md-0 small"
                        style={{ color: "#b8c5d6" }}
                    >
                        © {new Date().getFullYear()} CareConnect.
                        All Rights Reserved.
                    </p>

                    <p
                        className="mb-0 small"
                        style={{ color: "#b8c5d6" }}
                    >
                        Made with
                        <i className="bi bi-heart-fill mx-1"
                            style={{ color: "#f87171" }}></i>
                        for better healthcare.
                    </p>

                </div>

            </div>

        </footer>

    );
}

export default Footer;