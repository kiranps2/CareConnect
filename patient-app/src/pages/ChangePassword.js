
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function ChangePassword() {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setMessage("");

        if (newPassword.length < 8) {
            setError("Your new password must contain at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        if (currentPassword === newPassword) {
            setError("Your new password must be different from your current password.");
            return;
        }

        setLoading(true);

        try {

            const response = await api.put(
                "/change-password",
                {
                    currentPassword,
                    newPassword
                }
            );

            setMessage(
                response.data.message ||
                "Password updated successfully."
            );

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setShowCurrent(false);
            setShowNew(false);
            setShowConfirm(false);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to update password. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    const PasswordInput = ({
        id,
        label,
        value,
        setValue,
        visible,
        setVisible,
        placeholder
    }) => (

        <div className="password-field">

            <label htmlFor={id}>
                {label}
                <span>*</span>
            </label>

            <div className="password-input-wrapper">

                <i className="bi bi-lock password-field-icon"></i>

                <input
                    type={visible ? "text" : "password"}
                    id={id}
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                        setError("");
                        setMessage("");
                    }}
                    placeholder={placeholder}
                    autoComplete={
                        id === "currentPassword"
                            ? "current-password"
                            : "new-password"
                    }
                    required
                    minLength={id === "currentPassword" ? undefined : 8}
                />

                <button
                    type="button"
                    className="password-visibility-btn"
                    onClick={() => setVisible(!visible)}
                    aria-label={visible ? "Hide password" : "Show password"}
                >
                    <i className={
                        visible ? "bi bi-eye-slash" : "bi bi-eye"
                    }></i>
                </button>

            </div>

        </div>
    );

    return (

        <div className="change-password-page">

            {/* Header */}
            <div className="password-page-header">

                <div>
                    <div className="password-breadcrumb">
                        <Link to="/">Home</Link>
                        <i className="bi bi-chevron-right"></i>
                        Change Password
                    </div>

                    <h2>Change Password</h2>

                    <p>
                        Update your password to keep your account secure.
                    </p>
                </div>

                <div className="password-header-icon">
                    <i className="bi bi-shield-lock"></i>
                </div>

            </div>

            <div className="password-layout">

                {/* Password Form */}
                <div className="password-main">

                    <div className="password-card">

                        <div className="password-card-heading">

                            <div className="password-card-icon">
                                <i className="bi bi-key"></i>
                            </div>

                            <div>
                                <h5>Update Your Password</h5>
                                <p>
                                    Enter your current password and choose a new one.
                                </p>
                            </div>

                        </div>

                        {/* Success Message */}
                        {message && (

                            <div className="password-success">
                                <i className="bi bi-check-circle-fill"></i>
                                <span>{message}</span>
                            </div>

                        )}

                        {/* Error Message */}
                        {error && (

                            <div className="password-error">
                                <i className="bi bi-exclamation-circle-fill"></i>
                                <span>{error}</span>
                            </div>

                        )}

                        <form onSubmit={handleSubmit}>

                            <PasswordInput
                                id="currentPassword"
                                label="Current Password"
                                value={currentPassword}
                                setValue={setCurrentPassword}
                                visible={showCurrent}
                                setVisible={setShowCurrent}
                                placeholder="Enter your current password"
                            />

                            <div className="password-form-divider"></div>

                            <PasswordInput
                                id="newPassword"
                                label="New Password"
                                value={newPassword}
                                setValue={setNewPassword}
                                visible={showNew}
                                setVisible={setShowNew}
                                placeholder="Enter your new password"
                            />

                            <PasswordInput
                                id="confirmPassword"
                                label="Confirm New Password"
                                value={confirmPassword}
                                setValue={setConfirmPassword}
                                visible={showConfirm}
                                setVisible={setShowConfirm}
                                placeholder="Re-enter your new password"
                            />

                            <div className="password-hint">
                                <i className="bi bi-info-circle"></i>
                                Your new password must contain at least 8 characters.
                            </div>

                            <div className="password-actions">

                                <button
                                    type="button"
                                    className="password-back-btn"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="password-submit-btn"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm"></span>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-shield-check"></i>
                                            Update Password
                                        </>
                                    )}
                                </button>

                            </div>

                        </form>

                    </div>

                    <div className="password-security-note">
                        <i className="bi bi-shield-check"></i>

                        <div>
                            <strong>Your account security matters</strong>
                            <p>
                                Never share your password with anyone.
                                CareConnect will never ask you to disclose it.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Security Information */}
                <div className="password-sidebar">

                    <div className="password-tips-card">

                        <div className="tips-icon">
                            <i className="bi bi-shield-lock-fill"></i>
                        </div>

                        <h5>Create a Strong Password</h5>

                        <p>
                            Follow these recommendations to protect your account.
                        </p>

                        <div className="tips-divider"></div>

                        <div className="password-tip">
                            <i className="bi bi-check-circle-fill"></i>
                            <span>At least 8 characters long</span>
                        </div>

                        <div className="password-tip">
                            <i className="bi bi-check-circle-fill"></i>
                            <span>Use uppercase and lowercase letters</span>
                        </div>

                        <div className="password-tip">
                            <i className="bi bi-check-circle-fill"></i>
                            <span>Include numbers and special characters</span>
                        </div>

                        <div className="password-tip">
                            <i className="bi bi-check-circle-fill"></i>
                            <span>Avoid easily guessed information</span>
                        </div>

                    </div>

                    <div className="password-help-card">

                        <i className="bi bi-question-circle"></i>

                        <div>
                            <h6>Security Reminder</h6>
                            <p>
                                Use a unique password that you do not use
                                for other websites or applications.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            <style>{`

                .change-password-page {
                    min-height: 100vh;
                    padding: 35px;
                    background: #f5f8fc;
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                }

                .password-page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 35px;
                }

                .password-breadcrumb {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #8492a6;
                    font-size: 12px;
                    margin-bottom: 12px;
                }

                .password-breadcrumb a {
                    color: #0d9488;
                    text-decoration: none;
                }

                .password-page-header h2 {
                    color: #172b4d;
                    font-size: 28px;
                    font-weight: 800;
                    margin-bottom: 8px;
                }

                .password-page-header p {
                    color: #8492a6;
                    font-size: 14px;
                    margin: 0;
                }

                .password-header-icon {
                    width: 62px;
                    height: 62px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #e5f6f3;
                    color: #0d9488;
                    border-radius: 16px;
                    font-size: 27px;
                }

                .password-layout {
                    display: grid;
                    grid-template-columns: minmax(0, 1.8fr) minmax(260px, 0.9fr);
                    gap: 25px;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .password-card {
                    background: white;
                    border: 1px solid #eaf0f5;
                    border-radius: 16px;
                    padding: 32px;
                    box-shadow: 0 5px 25px rgba(23,43,77,0.035);
                }

                .password-card-heading {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding-bottom: 23px;
                    margin-bottom: 27px;
                    border-bottom: 1px solid #edf1f5;
                }

                .password-card-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    background: #e5f6f3;
                    color: #0d9488;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 23px;
                }

                .password-card-heading h5 {
                    color: #172b4d;
                    font-size: 17px;
                    font-weight: 800;
                    margin-bottom: 5px;
                }

                .password-card-heading p {
                    color: #8492a6;
                    font-size: 12px;
                    margin: 0;
                }

                .password-field {
                    margin-bottom: 23px;
                }

                .password-field label {
                    display: block;
                    color: #344563;
                    font-size: 13px;
                    font-weight: 700;
                    margin-bottom: 10px;
                }

                .password-field label span {
                    color: #e05252;
                    margin-left: 4px;
                }

                .password-input-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    height: 54px;
                    padding: 0 15px;
                    background: white;
                    border: 1px solid #e1e8ef;
                    border-radius: 10px;
                    transition: 0.2s;
                }

                .password-input-wrapper:focus-within {
                    border-color: #0d9488;
                    box-shadow: 0 0 0 3px rgba(13,148,136,0.09);
                }

                .password-field-icon {
                    color: #0d9488;
                    font-size: 18px;
                }

                .password-input-wrapper input {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: #172b4d;
                    font-size: 13px;
                }

                .password-input-wrapper input::placeholder {
                    color: #aab5c2;
                }

                .password-visibility-btn {
                    background: transparent;
                    border: none;
                    color: #8492a6;
                    font-size: 18px;
                    cursor: pointer;
                }

                .password-form-divider {
                    height: 1px;
                    background: #edf1f5;
                    margin: 5px 0 25px;
                }

                .password-hint {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #8492a6;
                    font-size: 11px;
                    margin-top: -5px;
                    margin-bottom: 25px;
                }

                .password-hint i {
                    color: #0d9488;
                }

                .password-error,
                .password-success {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    padding: 13px 15px;
                    border-radius: 9px;
                    font-size: 13px;
                    margin-bottom: 22px;
                }

                .password-error {
                    background: #fff1f0;
                    color: #c0392b;
                }

                .password-success {
                    background: #eaf7f1;
                    color: #16845d;
                }

                .password-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                    padding-top: 22px;
                    border-top: 1px solid #edf1f5;
                }

                .password-back-btn,
                .password-submit-btn {
                    min-height: 48px;
                    padding: 0 20px;
                    border-radius: 9px;
                    font-size: 12px;
                    font-weight: 700;
                    transition: 0.2s;
                }

                .password-back-btn {
                    background: white;
                    border: 1px solid #dce4eb;
                    color: #64748b;
                }

                .password-back-btn:hover {
                    background: #f5f8fc;
                }

                .password-submit-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    background: #0d9488;
                    color: white;
                    border: none;
                }

                .password-submit-btn:hover:not(:disabled) {
                    background: #0a7a70;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(13,148,136,0.18);
                }

                .password-submit-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .password-security-note {
                    display: flex;
                    gap: 13px;
                    align-items: flex-start;
                    padding: 20px;
                    margin-top: 20px;
                    background: #eaf7f5;
                    border-radius: 12px;
                    color: #0d9488;
                }

                .password-security-note > i {
                    font-size: 23px;
                }

                .password-security-note strong {
                    display: block;
                    font-size: 12px;
                    margin-bottom: 5px;
                }

                .password-security-note p {
                    color: #648b88;
                    font-size: 11px;
                    margin: 0;
                    line-height: 1.7;
                }

                .password-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .password-tips-card {
                    padding: 28px;
                    border-radius: 16px;
                    background: linear-gradient(145deg, #087f78, #0d9488);
                    color: white;
                }

                .tips-icon {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 14px;
                    background: rgba(255,255,255,0.16);
                    font-size: 24px;
                    margin-bottom: 22px;
                }

                .password-tips-card h5 {
                    font-size: 18px;
                    font-weight: 800;
                    margin-bottom: 10px;
                }

                .password-tips-card > p {
                    color: rgba(255,255,255,0.82);
                    font-size: 12px;
                    line-height: 1.8;
                }

                .tips-divider {
                    height: 1px;
                    background: rgba(255,255,255,0.2);
                    margin: 22px 0;
                }

                .password-tip {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    margin-bottom: 17px;
                    font-size: 11px;
                    line-height: 1.6;
                }

                .password-tip:last-child {
                    margin-bottom: 0;
                }

                .password-tip i {
                    color: #a7f3d0;
                    font-size: 14px;
                }

                .password-help-card {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    padding: 22px;
                    background: white;
                    border: 1px solid #eaf0f5;
                    border-radius: 14px;
                }

                .password-help-card > i {
                    color: #0d9488;
                    font-size: 22px;
                }

                .password-help-card h6 {
                    color: #172b4d;
                    font-size: 13px;
                    font-weight: 800;
                    margin-bottom: 7px;
                }

                .password-help-card p {
                    color: #8492a6;
                    font-size: 11px;
                    line-height: 1.7;
                    margin: 0;
                }

                @media (max-width: 991px) {
                    .password-layout {
                        grid-template-columns: 1fr;
                    }

                    .password-sidebar {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                    }
                }

                @media (max-width: 600px) {
                    .change-password-page {
                        padding: 22px 15px;
                    }

                    .password-page-header h2 {
                        font-size: 23px;
                    }

                    .password-header-icon {
                        width: 50px;
                        height: 50px;
                        font-size: 22px;
                    }

                    .password-card {
                        padding: 22px 17px;
                    }

                    .password-actions {
                        flex-direction: column-reverse;
                    }

                    .password-actions button {
                        width: 100%;
                    }

                    .password-sidebar {
                        grid-template-columns: 1fr;
                    }
                }

            `}</style>

        </div>
    );
}

export default ChangePassword;
