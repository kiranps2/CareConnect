
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function BookAppointment() {

    const [doctors, setDoctors] = useState([]);
    const [doctorId, setDoctorId] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [error, setError] = useState("");
    const [loadingDoctors, setLoadingDoctors] = useState(true);
    const [booking, setBooking] = useState(false);

    const navigate = useNavigate();

    // Get today's date in local YYYY-MM-DD format
    const date = new Date();

    const today = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0")
    ].join("-");

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        try {
            const response = await api.get("/doctors");
            setDoctors(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to load doctors. Please try again."
            );
        } finally {
            setLoadingDoctors(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (appointmentDate < today) {
            setError("Past dates are not allowed. Please select today or a future date.");
            return;
        }

        if (!doctorId || !appointmentDate || !appointmentTime) {
            setError("Please complete all appointment details.");
            return;
        }

        setBooking(true);

        try {
            await api.post("/appointments", {
                doctorId: Number(doctorId),
                appointmentDate,
                appointmentTime
            });

            navigate("/appointments");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to book appointment. Please try again."
            );
        } finally {
            setBooking(false);
        }
    };

    return (
        <div className="booking-page">

            {/* Page Header */}
            <div className="booking-header">
                <div>
                    <span className="booking-breadcrumb">
                        <Link to="/">Home</Link>
                        <i className="bi bi-chevron-right"></i>
                        Book Appointment
                    </span>

                    <h2>Book an Appointment</h2>

                    <p>
                        Schedule your visit with our trusted healthcare professionals.
                    </p>
                </div>

                <div className="booking-header-icon">
                    <i className="bi bi-calendar2-check"></i>
                </div>
            </div>

            <div className="booking-layout">

                {/* Main Form */}
                <div className="booking-main">

                    <div className="booking-card">

                        <div className="booking-card-heading">
                            <div className="booking-icon">
                                <i className="bi bi-clipboard2-pulse"></i>
                            </div>

                            <div>
                                <h5>Appointment Details</h5>
                                <p>Enter your preferred doctor and schedule.</p>
                            </div>
                        </div>

                        {error && (
                            <div className="booking-error">
                                <i className="bi bi-exclamation-circle-fill"></i>
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            {/* Doctor Selection */}
                            <div className="booking-field">
                                <label htmlFor="doctor">
                                    Select Doctor
                                    <span>*</span>
                                </label>

                                <div className="booking-input">
                                    <i className="bi bi-person-badge"></i>

                                    <select
                                        id="doctor"
                                        value={doctorId}
                                        onChange={(event) => {
                                            setDoctorId(event.target.value);
                                            setError("");
                                        }}
                                        required
                                        disabled={loadingDoctors}
                                    >
                                        <option value="">
                                            {loadingDoctors
                                                ? "Loading doctors..."
                                                : "Choose a doctor"}
                                        </option>

                                        {doctors.map((doctor) => (
                                            <option
                                                key={doctor.id}
                                                value={doctor.id}
                                            >
                                                {doctor.name} - {doctor.specialization}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {!loadingDoctors && doctors.length === 0 && (
                                    <small className="field-hint text-danger">
                                        No doctors are currently available.
                                    </small>
                                )}
                            </div>

                            {/* Date and Time */}
                            <div className="booking-date-time">

                                <div className="booking-field">
                                    <label htmlFor="appointmentDate">
                                        Appointment Date
                                        <span>*</span>
                                    </label>

                                    <div className="booking-input">
                                        <i className="bi bi-calendar-event"></i>

                                        <input
                                            type="date"
                                            id="appointmentDate"
                                            value={appointmentDate}
                                            min={today}
                                            onChange={(event) => {
                                                setAppointmentDate(event.target.value);
                                                setError("");
                                            }}
                                            required
                                        />
                                    </div>

                                    <small className="field-hint">
                                        <i className="bi bi-info-circle"></i>
                                        Past dates are not allowed.
                                    </small>
                                </div>

                                <div className="booking-field">
                                    <label htmlFor="appointmentTime">
                                        Appointment Time
                                        <span>*</span>
                                    </label>

                                    <div className="booking-input">
                                        <i className="bi bi-clock"></i>

                                        <input
                                            type="time"
                                            id="appointmentTime"
                                            value={appointmentTime}
                                            onChange={(event) => {
                                                setAppointmentTime(event.target.value);
                                                setError("");
                                            }}
                                            required
                                        />
                                    </div>

                                    <small className="field-hint">
                                        Select your preferred time.
                                    </small>
                                </div>

                            </div>

                            {/* Submit Button */}
                            <div className="booking-actions">
                                <button
                                    type="button"
                                    className="booking-cancel-btn"
                                    onClick={() => navigate("/doctors")}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="booking-submit-btn"
                                    disabled={booking || loadingDoctors || doctors.length === 0}
                                >
                                    {booking ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm"></span>
                                            Booking...
                                        </>
                                    ) : (
                                        <>
                                            Confirm Appointment
                                            <i className="bi bi-arrow-right"></i>
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* Security Note */}
                    <div className="booking-security">
                        <i className="bi bi-shield-check"></i>
                        <div>
                            <strong>Your health information is secure</strong>
                            <p>Your appointment details are handled securely by CareConnect.</p>
                        </div>
                    </div>

                </div>

                {/* Right Information Panel */}
                <div className="booking-sidebar">

                    <div className="booking-info-card">
                        <div className="info-icon">
                            <i className="bi bi-heart-pulse"></i>
                        </div>

                        <h5>Your Health Matters</h5>

                        <p>
                            Get connected with experienced healthcare
                            professionals and receive the care you deserve.
                        </p>

                        <div className="info-divider"></div>

                        <div className="info-feature">
                            <i className="bi bi-check-circle-fill"></i>
                            <span>Easy online booking</span>
                        </div>

                        <div className="info-feature">
                            <i className="bi bi-check-circle-fill"></i>
                            <span>Trusted medical professionals</span>
                        </div>

                        <div className="info-feature">
                            <i className="bi bi-check-circle-fill"></i>
                            <span>Manage your appointments</span>
                        </div>
                    </div>

                    <div className="booking-help-card">
                        <i className="bi bi-question-circle"></i>

                        <div>
                            <h6>Need help?</h6>
                            <p>
                                Choose a doctor and select your preferred
                                appointment date and time.
                            </p>
                        </div>
                    </div>

                </div>

            </div>

            <style>{`
                .booking-page {
                    min-height: 100vh;
                    padding: 35px;
                    background: #f5f8fc;
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                }

                .booking-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 35px;
                }

                .booking-breadcrumb {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #8492a6;
                    font-size: 12px;
                    margin-bottom: 12px;
                }

                .booking-breadcrumb a {
                    color: #0d9488;
                    text-decoration: none;
                }

                .booking-header h2 {
                    color: #172b4d;
                    font-size: 28px;
                    font-weight: 800;
                    margin-bottom: 8px;
                }

                .booking-header p {
                    color: #8492a6;
                    font-size: 14px;
                    margin: 0;
                }

                .booking-header-icon {
                    width: 65px;
                    height: 65px;
                    border-radius: 18px;
                    background: #e1f5f2;
                    color: #0d9488;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 28px;
                }

                .booking-layout {
                    display: grid;
                    grid-template-columns: minmax(0, 1.8fr) minmax(260px, 0.9fr);
                    gap: 25px;
                    max-width: 1150px;
                    margin: 0 auto;
                }

                .booking-card {
                    background: #ffffff;
                    border: 1px solid #eaf0f5;
                    border-radius: 16px;
                    padding: 32px;
                    box-shadow: 0 5px 25px rgba(23,43,77,0.035);
                }

                .booking-card-heading {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 30px;
                    padding-bottom: 23px;
                    border-bottom: 1px solid #edf1f5;
                }

                .booking-icon {
                    width: 48px;
                    height: 48px;
                    background: #e5f6f3;
                    color: #0d9488;
                    border-radius: 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 23px;
                }

                .booking-card-heading h5 {
                    font-size: 17px;
                    color: #172b4d;
                    font-weight: 800;
                    margin-bottom: 5px;
                }

                .booking-card-heading p {
                    font-size: 12px;
                    color: #8492a6;
                    margin: 0;
                }

                .booking-error {
                    display: flex;
                    gap: 10px;
                    padding: 13px 15px;
                    border-radius: 9px;
                    background: #fff1f0;
                    color: #c0392b;
                    font-size: 13px;
                    margin-bottom: 22px;
                }

                .booking-field {
                    margin-bottom: 25px;
                    min-width: 0;
                }

                .booking-field label {
                    display: block;
                    font-size: 13px;
                    color: #344563;
                    font-weight: 700;
                    margin-bottom: 10px;
                }

                .booking-field label span {
                    color: #e05252;
                    margin-left: 4px;
                }

                .booking-input {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    height: 54px;
                    padding: 0 15px;
                    border: 1px solid #e1e8ef;
                    border-radius: 10px;
                    background: #ffffff;
                    transition: 0.2s;
                }

                .booking-input:focus-within {
                    border-color: #0d9488;
                    box-shadow: 0 0 0 3px rgba(13,148,136,0.09);
                }

                .booking-input i {
                    color: #0d9488;
                    font-size: 18px;
                    flex-shrink: 0;
                }

                .booking-input input,
                .booking-input select {
                    border: none;
                    outline: none;
                    width: 100%;
                    height: 100%;
                    min-width: 0;
                    color: #344563;
                    background: transparent;
                    font-size: 13px;
                }

                .booking-input select {
                    cursor: pointer;
                }

                .booking-input input::-webkit-calendar-picker-indicator {
                    cursor: pointer;
                }

                .field-hint {
                    display: block;
                    color: #94a0ae;
                    font-size: 11px;
                    margin-top: 9px;
                }

                .field-hint i {
                    margin-right: 5px;
                }

                .booking-date-time {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }

                .booking-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                    margin-top: 15px;
                    padding-top: 25px;
                    border-top: 1px solid #edf1f5;
                }

                .booking-cancel-btn,
                .booking-submit-btn {
                    min-height: 48px;
                    padding: 0 22px;
                    border-radius: 9px;
                    font-size: 13px;
                    font-weight: 700;
                    transition: 0.2s;
                }

                .booking-cancel-btn {
                    background: white;
                    color: #64748b;
                    border: 1px solid #dce4eb;
                }

                .booking-cancel-btn:hover {
                    background: #f5f8fc;
                }

                .booking-submit-btn {
                    background: #0d9488;
                    color: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                }

                .booking-submit-btn:hover:not(:disabled) {
                    background: #0a7a70;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(13,148,136,0.18);
                }

                .booking-submit-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .booking-security {
                    display: flex;
                    gap: 13px;
                    align-items: flex-start;
                    padding: 20px;
                    margin-top: 20px;
                    background: #eaf7f5;
                    border-radius: 12px;
                    color: #0d9488;
                }

                .booking-security > i {
                    font-size: 23px;
                }

                .booking-security strong {
                    display: block;
                    font-size: 12px;
                    margin-bottom: 5px;
                }

                .booking-security p {
                    color: #648b88;
                    font-size: 11px;
                    margin: 0;
                }

                .booking-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .booking-info-card {
                    background: linear-gradient(145deg, #087f78, #0d9488);
                    color: white;
                    border-radius: 16px;
                    padding: 28px;
                }

                .info-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 14px;
                    background: rgba(255,255,255,0.16);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 25px;
                    margin-bottom: 22px;
                }

                .booking-info-card h5 {
                    font-size: 19px;
                    font-weight: 800;
                    margin-bottom: 12px;
                }

                .booking-info-card > p {
                    color: rgba(255,255,255,0.82);
                    font-size: 12px;
                    line-height: 1.8;
                }

                .info-divider {
                    height: 1px;
                    background: rgba(255,255,255,0.2);
                    margin: 22px 0;
                }

                .info-feature {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 12px;
                    margin-bottom: 16px;
                }

                .info-feature:last-child {
                    margin-bottom: 0;
                }

                .info-feature i {
                    color: #a7f3d0;
                }

                .booking-help-card {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    background: white;
                    padding: 22px;
                    border-radius: 14px;
                    border: 1px solid #eaf0f5;
                }

                .booking-help-card > i {
                    font-size: 22px;
                    color: #0d9488;
                }

                .booking-help-card h6 {
                    color: #172b4d;
                    font-weight: 800;
                    font-size: 13px;
                    margin-bottom: 7px;
                }

                .booking-help-card p {
                    color: #8492a6;
                    font-size: 11px;
                    line-height: 1.7;
                    margin: 0;
                }

                @media (max-width: 991px) {
                    .booking-layout {
                        grid-template-columns: 1fr;
                    }

                    .booking-sidebar {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                    }
                }

                @media (max-width: 600px) {
                    .booking-page {
                        padding: 22px 15px;
                    }

                    .booking-header h2 {
                        font-size: 23px;
                    }

                    .booking-header-icon {
                        width: 50px;
                        height: 50px;
                        font-size: 22px;
                    }

                    .booking-card {
                        padding: 22px 17px;
                    }

                    .booking-date-time {
                        grid-template-columns: 1fr;
                        gap: 0;
                    }

                    .booking-actions {
                        flex-direction: column-reverse;
                    }

                    .booking-actions button {
                        width: 100%;
                    }

                    .booking-sidebar {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

        </div>
    );
}

export default BookAppointment;
