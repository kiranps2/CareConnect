
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancellingId, setCancellingId] = useState(null);

    // Get today's date in local YYYY-MM-DD format
    const getToday = () => {
        const date = new Date();

        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");
    };

    const today = getToday();

    // Load appointments and doctors
    const loadAppointments = async () => {
        try {
            setError("");

            const [appointmentResponse, doctorResponse] =
                await Promise.all([
                    api.get("/appointments"),
                    api.get("/doctors")
                ]);

            const appointmentData = Array.isArray(appointmentResponse.data)
                ? appointmentResponse.data
                : [];

            const doctorData = Array.isArray(doctorResponse.data)
                ? doctorResponse.data
                : [];

            console.log("Appointments:", appointmentData);
            console.log("Doctors:", doctorData);

            setAppointments(appointmentData);
            setDoctors(doctorData);

        } catch (err) {
            console.error("Loading appointments failed:", err);

            setError(
                err.response?.data?.message ||
                "Unable to load appointments. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    // Find the doctor associated with an appointment
    const getDoctor = (appointment) => {
        // First, check whether the API already returns a doctor object
        const directDoctor =
            appointment.doctor ||
            appointment.doctorDetails ||
            appointment.doctorResponse;

        if (directDoctor && typeof directDoctor === "object") {
            // Handle a nested doctor object too
            return directDoctor.doctor || directDoctor;
        }

        // Find the doctor using the doctor's ID
        const doctorId =
            appointment.doctorId ??
            appointment.doctor_id ??
            appointment.doctor?.id ??
            appointment.doctor?.doctorId;

        if (doctorId !== undefined && doctorId !== null) {
            return doctors.find(
                doctor => String(doctor.id) === String(doctorId)
            ) || null;
        }

        return null;
    };

    // Separate upcoming appointments
    const upcomingAppointments = appointments
        .filter(appointment => appointment.appointmentDate >= today)
        .sort((a, b) =>
            `${a.appointmentDate}T${a.appointmentTime}`
                .localeCompare(
                    `${b.appointmentDate}T${b.appointmentTime}`
                )
        );

    // Separate past appointments
    const pastAppointments = appointments
        .filter(appointment => appointment.appointmentDate < today)
        .sort((a, b) =>
            `${b.appointmentDate}T${b.appointmentTime}`
                .localeCompare(
                    `${a.appointmentDate}T${a.appointmentTime}`
                )
        );

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "Date unavailable";

        const [year, month, day] = dateString.split("-").map(Number);

        return new Date(year, month - 1, day).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    };

    // Format time
    const formatTime = (timeString) => {
        if (!timeString) return "Time unavailable";

        const [hours, minutes] = timeString.split(":");

        const time = new Date();
        time.setHours(Number(hours), Number(minutes), 0, 0);

        return time.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };

    // Status styling
    const getStatusClass = (status) => {
        switch (status?.toUpperCase()) {
            case "BOOKED":
                return "status-booked";
            case "CANCELLED":
                return "status-cancelled";
            case "COMPLETED":
                return "status-completed";
            default:
                return "status-default";
        }
    };

    // Cancel appointment
    const handleCancel = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );

        if (!confirmed) return;

        try {
            setCancellingId(id);
            setError("");

            await api.delete(`/appointments/${id}`);

            await loadAppointments();

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to cancel appointment. Please try again."
            );
        } finally {
            setCancellingId(null);
        }
    };

    // Appointment card
    const AppointmentCard = ({ appointment, isPast = false }) => {
        const doctor = getDoctor(appointment);

        return (
            <div className="appointment-card">

                <div className="appointment-card-top">

                    <div className="doctor-details">

                        <div className="doctor-avatar">
                            <i className="bi bi-person-fill"></i>
                        </div>

                        <div>
                            <h5>
                                {doctor?.name || "Doctor name unavailable"}
                            </h5>

                            <p>
                                {doctor?.specialization ||
                                    "Specialization unavailable"}
                            </p>
                        </div>

                    </div>

                    <span className={`appointment-status ${getStatusClass(appointment.status)}`}>
                        <span className="status-dot"></span>
                        {appointment.status || "Unknown"}
                    </span>

                </div>

                <div className="appointment-details">

                    <div className="appointment-detail-item">
                        <div className="detail-icon">
                            <i className="bi bi-calendar3"></i>
                        </div>

                        <div>
                            <small>Appointment Date</small>
                            <strong>
                                {formatDate(appointment.appointmentDate)}
                            </strong>
                        </div>
                    </div>

                    <div className="appointment-detail-item">
                        <div className="detail-icon">
                            <i className="bi bi-clock"></i>
                        </div>

                        <div>
                            <small>Appointment Time</small>
                            <strong>
                                {formatTime(appointment.appointmentTime)}
                            </strong>
                        </div>
                    </div>

                    <div className="appointment-detail-item">
                        <div className="detail-icon">
                            <i className="bi bi-hospital"></i>
                        </div>

                        <div>
                            <small>Specialization</small>
                            <strong>
                                {doctor?.specialization || "Not specified"}
                            </strong>
                        </div>
                    </div>

                </div>

                <div className="appointment-card-footer">

                    <span className="appointment-id">
                        Appointment ID: #{appointment.id}
                    </span>

                    {!isPast && appointment.status?.toUpperCase() === "BOOKED" && (
                        <button
                            className="cancel-appointment-btn"
                            onClick={() => handleCancel(appointment.id)}
                            disabled={cancellingId === appointment.id}
                        >
                            {cancellingId === appointment.id ? (
                                <>
                                    <span className="spinner-border spinner-border-sm"></span>
                                    Cancelling...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-x-circle"></i>
                                    Cancel Appointment
                                </>
                            )}
                        </button>
                    )}

                </div>

            </div>
        );
    };

    return (
        <div className="appointments-page">

            {/* Header */}
            <div className="appointments-header">

                <div>
                    <span className="appointments-breadcrumb">
                        <Link to="/">Home</Link>
                        <i className="bi bi-chevron-right"></i>
                        My Appointments
                    </span>

                    <h2>My Appointments</h2>

                    <p>
                        View and manage all your healthcare appointments.
                    </p>
                </div>

                <Link
                    to="/appointments/book"
                    className="new-appointment-btn"
                >
                    <i className="bi bi-plus-lg"></i>
                    Book Appointment
                </Link>

            </div>

            {/* Error */}
            {error && (
                <div className="appointments-error">
                    <i className="bi bi-exclamation-circle-fill"></i>
                    <span>{error}</span>

                    <button onClick={loadAppointments} type="button">
                        Retry
                    </button>
                </div>
            )}

            {/* Statistics */}
            <div className="appointment-stats">

                <div className="appointment-stat-card">
                    <div className="stat-icon stat-total">
                        <i className="bi bi-calendar-check"></i>
                    </div>

                    <div>
                        <span>Total Appointments</span>
                        <h3>{appointments.length}</h3>
                    </div>
                </div>

                <div className="appointment-stat-card">
                    <div className="stat-icon stat-upcoming">
                        <i className="bi bi-calendar-event"></i>
                    </div>

                    <div>
                        <span>Upcoming</span>
                        <h3>{upcomingAppointments.length}</h3>
                    </div>
                </div>

                <div className="appointment-stat-card">
                    <div className="stat-icon stat-past">
                        <i className="bi bi-calendar2-check"></i>
                    </div>

                    <div>
                        <span>Past Appointments</span>
                        <h3>{pastAppointments.length}</h3>
                    </div>
                </div>

            </div>

            {loading ? (

                <div className="appointments-loading">
                    <div className="spinner-border text-success"></div>
                    <p>Loading your appointments...</p>
                </div>

            ) : (

                <>
                    {/* Upcoming Appointments */}
                    <section className="appointment-section">

                        <div className="section-heading">

                            <div>
                                <div className="section-title-icon upcoming-icon">
                                    <i className="bi bi-calendar-event"></i>
                                </div>

                                <div>
                                    <h4>Upcoming Appointments</h4>
                                    <p>Your scheduled healthcare visits</p>
                                </div>
                            </div>

                            <span className="section-count">
                                {upcomingAppointments.length} Appointments
                            </span>

                        </div>

                        {upcomingAppointments.length === 0 ? (

                            <div className="appointment-empty">

                                <div className="empty-icon">
                                    <i className="bi bi-calendar-x"></i>
                                </div>

                                <h5>No Upcoming Appointments</h5>

                                <p>
                                    You don't have any upcoming appointments.
                                    Book a visit with one of our doctors.
                                </p>

                                <Link
                                    to="/book-appointment"
                                    className="empty-book-btn"
                                >
                                    <i className="bi bi-plus-lg"></i>
                                    Book an Appointment
                                </Link>

                            </div>

                        ) : (

                            upcomingAppointments.map(appointment => (
                                <AppointmentCard
                                    key={appointment.id}
                                    appointment={appointment}
                                />
                            ))

                        )}

                    </section>

                    {/* Past Appointments */}
                    <section className="appointment-section past-section">

                        <div className="section-heading">

                            <div>
                                <div className="section-title-icon past-icon">
                                    <i className="bi bi-clock-history"></i>
                                </div>

                                <div>
                                    <h4>Past Appointments</h4>
                                    <p>Your previous healthcare visits</p>
                                </div>
                            </div>

                            <span className="section-count">
                                {pastAppointments.length} Appointments
                            </span>

                        </div>

                        {pastAppointments.length === 0 ? (

                            <div className="appointment-empty small-empty">

                                <div className="empty-icon">
                                    <i className="bi bi-calendar2"></i>
                                </div>

                                <h5>No Past Appointments</h5>

                                <p>
                                    Your previous appointments will appear here.
                                </p>

                            </div>

                        ) : (

                            pastAppointments.map(appointment => (
                                <AppointmentCard
                                    key={appointment.id}
                                    appointment={appointment}
                                    isPast={true}
                                />
                            ))

                        )}

                    </section>
                </>
            )}

            <style>{`

                .appointments-page {
                    min-height: 100vh;
                    padding: 35px;
                    background: #f5f8fc;
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                }

                .appointments-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .appointments-breadcrumb {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #8492a6;
                    font-size: 12px;
                    margin-bottom: 12px;
                }

                .appointments-breadcrumb a {
                    color: #0d9488;
                    text-decoration: none;
                }

                .appointments-header h2 {
                    color: #172b4d;
                    font-size: 28px;
                    font-weight: 800;
                    margin-bottom: 8px;
                }

                .appointments-header p {
                    color: #8492a6;
                    font-size: 14px;
                    margin: 0;
                }

                .new-appointment-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 13px 20px;
                    border-radius: 9px;
                    background: #0d9488;
                    color: white;
                    text-decoration: none;
                    font-size: 13px;
                    font-weight: 700;
                    transition: 0.2s;
                    white-space: nowrap;
                }

                .new-appointment-btn:hover,
                .empty-book-btn:hover {
                    background: #0a7a70;
                    color: white;
                    transform: translateY(-2px);
                }

                .appointments-error {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 15px;
                    background: #fff1f0;
                    color: #c0392b;
                    border-radius: 10px;
                    margin-bottom: 22px;
                    font-size: 13px;
                }

                .appointments-error button {
                    margin-left: auto;
                    border: none;
                    background: transparent;
                    color: #c0392b;
                    font-weight: 700;
                    text-decoration: underline;
                }

                .appointment-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-bottom: 35px;
                }

                .appointment-stat-card {
                    background: white;
                    border: 1px solid #eaf0f5;
                    border-radius: 13px;
                    padding: 22px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    box-shadow: 0 3px 15px rgba(23,43,77,0.025);
                }

                .stat-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                }

                .stat-total {
                    background: #e8f1ff;
                    color: #3478d4;
                }

                .stat-upcoming {
                    background: #e4f7f3;
                    color: #0d9488;
                }

                .stat-past {
                    background: #fff3e7;
                    color: #e69a3a;
                }

                .appointment-stat-card span {
                    display: block;
                    color: #8492a6;
                    font-size: 12px;
                    margin-bottom: 5px;
                }

                .appointment-stat-card h3 {
                    color: #172b4d;
                    font-size: 25px;
                    font-weight: 800;
                    margin: 0;
                }

                .appointment-section {
                    margin-bottom: 38px;
                }

                .section-heading {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 20px;
                }

                .section-heading > div {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                }

                .section-title-icon {
                    width: 43px;
                    height: 43px;
                    border-radius: 11px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                }

                .upcoming-icon {
                    background: #e4f7f3;
                    color: #0d9488;
                }

                .past-icon {
                    background: #fff3e7;
                    color: #d99338;
                }

                .section-heading h4 {
                    font-size: 17px;
                    font-weight: 800;
                    color: #172b4d;
                    margin: 0 0 5px;
                }

                .section-heading p {
                    color: #8492a6;
                    font-size: 11px;
                    margin: 0;
                }

                .section-count {
                    color: #8492a6;
                    background: white;
                    border: 1px solid #eaf0f5;
                    padding: 8px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    white-space: nowrap;
                }

                .appointment-card {
                    background: white;
                    border: 1px solid #eaf0f5;
                    border-radius: 13px;
                    padding: 23px;
                    margin-bottom: 15px;
                    box-shadow: 0 3px 15px rgba(23,43,77,0.025);
                    transition: 0.2s;
                }

                .appointment-card:hover {
                    border-color: #b8e3dc;
                    box-shadow: 0 6px 20px rgba(23,43,77,0.05);
                }

                .appointment-card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 15px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #edf1f5;
                }

                .doctor-details {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                }

                .doctor-avatar {
                    width: 49px;
                    height: 49px;
                    border-radius: 12px;
                    background: #e5f6f3;
                    color: #0d9488;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 24px;
                }

                .doctor-details h5 {
                    color: #172b4d;
                    font-size: 15px;
                    font-weight: 800;
                    margin: 0 0 5px;
                }

                .doctor-details p {
                    color: #8492a6;
                    font-size: 12px;
                    margin: 0;
                }

                .appointment-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 7px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .status-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: currentColor;
                }

                .status-booked {
                    background: #e6f7f1;
                    color: #15966c;
                }

                .status-cancelled {
                    background: #fff0ef;
                    color: #d9534f;
                }

                .status-completed {
                    background: #eaf1ff;
                    color: #3975cf;
                }

                .status-default {
                    background: #f1f3f5;
                    color: #64748b;
                }

                .appointment-details {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                    padding: 22px 0;
                }

                .appointment-detail-item {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    min-width: 0;
                }

                .detail-icon {
                    width: 38px;
                    height: 38px;
                    flex-shrink: 0;
                    border-radius: 9px;
                    background: #f1f8f7;
                    color: #0d9488;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 16px;
                }

                .appointment-detail-item small {
                    display: block;
                    color: #9aa6b2;
                    font-size: 10px;
                    margin-bottom: 5px;
                }

                .appointment-detail-item strong {
                    display: block;
                    color: #344563;
                    font-size: 12px;
                    font-weight: 700;
                    overflow-wrap: anywhere;
                }

                .appointment-card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 15px;
                    padding-top: 17px;
                    border-top: 1px solid #edf1f5;
                }

                .appointment-id {
                    color: #a0aab6;
                    font-size: 11px;
                }

                .cancel-appointment-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 9px 14px;
                    border: 1px solid #f1c9c7;
                    border-radius: 8px;
                    background: #fff8f7;
                    color: #d9534f;
                    font-size: 11px;
                    font-weight: 700;
                    transition: 0.2s;
                }

                .cancel-appointment-btn:hover:not(:disabled) {
                    background: #d9534f;
                    border-color: #d9534f;
                    color: white;
                }

                .cancel-appointment-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .appointment-empty {
                    background: white;
                    border: 1px dashed #dce5ed;
                    border-radius: 14px;
                    text-align: center;
                    padding: 45px 20px;
                }

                .empty-icon {
                    width: 65px;
                    height: 65px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 17px;
                    border-radius: 50%;
                    background: #eaf7f5;
                    color: #0d9488;
                    font-size: 28px;
                }

                .appointment-empty h5 {
                    color: #172b4d;
                    font-size: 16px;
                    font-weight: 800;
                    margin-bottom: 9px;
                }

                .appointment-empty p {
                    color: #8492a6;
                    font-size: 12px;
                    margin-bottom: 20px;
                }

                .empty-book-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 11px 17px;
                    background: #0d9488;
                    color: white;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    text-decoration: none;
                }

                .small-empty {
                    padding: 30px 20px;
                }

                .small-empty .empty-icon {
                    width: 50px;
                    height: 50px;
                    font-size: 22px;
                }

                .appointments-loading {
                    text-align: center;
                    padding: 70px 20px;
                    color: #8492a6;
                }

                .appointments-loading p {
                    margin-top: 15px;
                    font-size: 13px;
                }

                @media (max-width: 900px) {
                    .appointment-details {
                        grid-template-columns: 1fr 1fr;
                    }

                    .appointment-stats {
                        gap: 12px;
                    }

                    .appointment-stat-card {
                        padding: 16px;
                    }
                }

                @media (max-width: 600px) {
                    .appointments-page {
                        padding: 22px 15px;
                    }

                    .appointments-header {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .appointments-header h2 {
                        font-size: 23px;
                    }

                    .appointment-stats {
                        grid-template-columns: 1fr;
                    }

                    .appointment-stat-card {
                        padding: 15px;
                    }

                    .section-heading {
                        align-items: flex-start;
                    }

                    .section-heading h4 {
                        font-size: 14px;
                    }

                    .section-count {
                        font-size: 10px;
                        padding: 7px 9px;
                    }

                    .appointment-card {
                        padding: 17px;
                    }

                    .appointment-card-top {
                        align-items: flex-start;
                    }

                    .appointment-status {
                        font-size: 9px;
                        padding: 6px 8px;
                    }

                    .appointment-details {
                        grid-template-columns: 1fr;
                        gap: 17px;
                    }

                    .appointment-card-footer {
                        align-items: flex-start;
                        flex-direction: column;
                    }

                    .cancel-appointment-btn {
                        width: 100%;
                    }
                }

            `}</style>

        </div>
    );
}

export default Appointments;
