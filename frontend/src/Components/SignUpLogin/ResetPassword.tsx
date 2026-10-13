import { Button, Modal, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { resetPassword, sendOtp, verifyOtp } from "../../Services/UserService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useInterval } from "@mantine/hooks";
import { signupValidation } from "../../Services/FormValidation";

const getErrorMessage = (error: any, fallback: string) => {
    if (error?.response) {
        const status = error.response.status;
        const data = error.response.data;
        const backendMsg = data?.errorMessage || data?.message || data?.error;
        if (backendMsg && typeof backendMsg === "string") {
            return backendMsg;
        }
        if (status === 401) {
            return "Invalid email or password.";
        }
        if (status === 409) {
            return "User already exists.";
        }
        if (status === 400) {
            return "Invalid request details. Please check your inputs.";
        }
        if (status === 500) {
            return "Server error. Please try again later.";
        }
        return fallback;
    }

    if (error?.request) {
        return "Unable to connect to the backend server. Please verify the server is running.";
    }

    return error?.message || fallback;
};

const ResetPassword = (props: any) => {
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [resendLoader, setResendLoader] = useState(false);
    const [time, setTime] = useState(60);
    const [verified, setVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const interval = useInterval(() => {
        if (time === 0) {
            setResendLoader(false);
            setTime(60);
            interval.stop();

        }
        else setTime((s) => s - 1);
    }, 1000);
    const handleSendOtp = () => {
        setOtpSending(true);
        sendOtp(email).then(() => {
            successNotification("OTP Sent Successfully.", "Enter OTP to reset password.");
            setOtpSent(true);
            setOtpSending(false);
            setResendLoader(true);
            interval.start();
        }).catch((err) => {
            console.error("OTP send error:", err);
            setOtpSending(false);
            errorNotification("OTP Sending Failed.", getErrorMessage(err, "Unable to send OTP."));
        });

    };

    const changeEmail = () => {
        setOtpSent(false);
        setResendLoader(false);
        setTime(60);
        setVerified(false);
        interval.stop();
    };
    const resendOtp = () => {
        if (resendLoader) return;
        handleSendOtp();
    };
    const handleVerifyOTP = (otp: string) => {
        verifyOtp(email, otp).then(() => {
            successNotification("OTP Verified Successfully.", "Enter new password.");
            setVerified(true);
        }).catch((err) => {
            console.error("OTP verify error:", err);
            errorNotification("OTP Verification Failed.", getErrorMessage(err, "Unable to verify OTP."));
        });
    };
    const handleResetPassword = () => {
        resetPassword(email, password).then(() => {
            successNotification("Password Reset Successfully.", "Redirecting to login page.");
            props.close();
        }).catch((err) => {
            console.error("Password reset error:", err);
            errorNotification("Password Reset Failed.", getErrorMessage(err, "Unable to reset password."));
        });
    };
    return <Modal opened={props.opened} onClose={props.close} overlayProps={{ backgroundOpacity: 0.55, blur: 3, }} title="Reset Password" centered>
        <div className="flex flex-col gap-6">
            <TextInput disabled={otpSent} readOnly={otpSent} value={email} size="md" name="email" onChange={(e) => setEmail(e.target.value)} leftSection={<IconAt size={16} />} label="Email" withAsterisk placeholder="Your email" rightSection={<Button loading={otpSending && !otpSent} onClick={handleSendOtp} disabled={email == "" || otpSent} className="mr-1" size="xs" autoContrast >Send OTP</Button>} rightSectionWidth="xl" />
            {otpSent && <PinInput onComplete={handleVerifyOTP} className="mx-auto" gap="lg" size="md" length={6} type="number" />}
            {otpSent && !verified && <div className="flex gap-2">
                <Button loading={otpSending} onClick={resendOtp} fullWidth color="brightSun.4" variant="light">{resendLoader ? time : "Resend"}</Button>
                <Button fullWidth onClick={changeEmail} autoContrast variant="filled">Change Email</Button>
            </div>}
            {verified && <PasswordInput value={password} error={error} name="password" onChange={(e) => { setPassword(e.target.value); setError(signupValidation("password", e.target.value)); }} leftSection={<IconLock size={16} />} label="Password" withAsterisk placeholder="Password" />}
            {verified && <Button onClick={handleResetPassword} autoContrast variant="filled">Reset Password</Button>}
        </div>
    </Modal>;
};
export default ResetPassword;