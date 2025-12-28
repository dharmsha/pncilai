"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import {
  FaPhone,
  FaShieldAlt,
  FaWhatsapp,
  FaKey,
  FaArrowLeft,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const phone = user.phoneNumber?.replace("+91", "");
        if (phone === "7070853444") {
          router.push(`/admin/dashboard?phone=${phone}`);
        } else {
          router.push(`/client/dashboard?phone=${phone}`);
        }
      }
    });
  }, [router]);

  /* ================= INIT CAPTCHA (ONCE) ================= */
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );

      window.recaptchaVerifier.render();
    }
  }, []);

  /* ================= SEND OTP ================= */
  const sendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (phoneNumber.length !== 10) {
      setError("Enter valid 10-digit mobile number");
      setLoading(false);
      return;
    }

    try {
      const formattedPhone = `+91${phoneNumber}`;

      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );

      setConfirmationResult(result);
      setShowOtp(true);
      setSuccess("✅ OTP sent successfully");
    } catch (err) {
      console.error(err);

      if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Please wait and try again.");
      } else if (err.code === "auth/invalid-phone-number") {
        setError("Invalid phone number.");
      } else {
        setError("Failed to send OTP. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await confirmationResult.confirm(otp);
      const userPhone =
        result.user.phoneNumber?.replace("+91", "") || phoneNumber;

      setSuccess("✅ Login successful");

      setTimeout(() => {
        if (userPhone === "7070853444") {
          router.push(`/admin/dashboard?phone=${userPhone}`);
        } else {
          router.push(`/client/dashboard?phone=${userPhone}`);
        }
      }, 1200);
    } catch (err) {
      if (err.code === "auth/invalid-verification-code") {
        setError("Invalid OTP");
      } else if (err.code === "auth/code-expired") {
        setError("OTP expired. Request new OTP.");
        setShowOtp(false);
      } else {
        setError("Verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= SUPPORT ================= */
  const handleEmergencySupport = () => {
    window.open(
      "https://wa.me/917070853444?text=URGENT:+Login+issue",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl border border-gray-700">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Pencil<span className="text-red-500">AI</span>
        </h1>

        {error && (
          <div className="mb-4 text-red-400 text-sm flex items-center">
            <FaExclamationTriangle className="mr-2" /> {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-green-400 text-sm">{success}</div>
        )}

        {!showOtp ? (
          <form onSubmit={sendOtp} className="space-y-4">
            <input
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="Enter mobile number"
              className="w-full p-3 rounded bg-gray-800 text-white"
            />

            <div id="recaptcha-container"></div>

            <button
              disabled={loading}
              className="w-full bg-red-600 py-3 rounded text-white font-bold"
            >
              {loading ? "Sending OTP..." : "SEND OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <input
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Enter OTP"
              className="w-full p-3 rounded bg-gray-800 text-white text-center tracking-widest"
            />

            <button className="w-full bg-green-600 py-3 rounded text-white font-bold">
              VERIFY OTP
            </button>

            <button
              type="button"
              onClick={() => setShowOtp(false)}
              className="w-full text-gray-400 text-sm flex items-center justify-center"
            >
              <FaArrowLeft className="mr-2" /> Change number
            </button>
          </form>
        )}

        <button
          onClick={handleEmergencySupport}
          className="mt-6 w-full text-emerald-400 text-sm flex justify-center items-center"
        >
          <FaWhatsapp className="mr-2" /> WhatsApp Support
        </button>
      </div>
    </div>
  );
}
