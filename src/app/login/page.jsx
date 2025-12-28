"use client";

import { useEffect, useRef, useState } from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const recaptchaRef = useRef(null);
  const router = useRouter();

  /* ===== AUTH CHECK ===== */
  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (u) router.push("/dashboard");
    });
  }, [router]);

  /* ===== HIDDEN CAPTCHA ===== */
  const initCaptcha = () => {
    if (recaptchaRef.current) {
      try {
        recaptchaRef.current.clear();
      } catch {}
    }

    recaptchaRef.current = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );

    recaptchaRef.current.render();
  };

  useEffect(() => {
    if (!showOtp) setTimeout(initCaptcha, 700);
  }, [showOtp]);

  /* ===== SEND OTP ===== */
  const sendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (phoneNumber.length !== 10) {
      setError("Enter valid 10-digit mobile number");
      setLoading(false);
      return;
    }

    try {
      const res = await signInWithPhoneNumber(
        auth,
        `+91${phoneNumber}`,
        recaptchaRef.current
      );
      setConfirmationResult(res);
      setShowOtp(true);
      setSuccess("OTP sent successfully");
    } catch (err) {
      setError(err.message || "Failed to send OTP");
      initCaptcha();
    } finally {
      setLoading(false);
    }
  };

  /* ===== VERIFY OTP ===== */
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await confirmationResult.confirm(otp);
      setSuccess("Login successful");

      setTimeout(() => {
        phoneNumber === "9234477961"
          ? router.push(`/admin/dashboard?phone=${phoneNumber}`)
          : router.push(`/client/dashboard?phone=${phoneNumber}`);
      }, 1200);
    } catch {
      setError("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center px-4">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#4f46e5,_transparent_40%)] opacity-40" />

      <div className="relative w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_80px_rgba(79,70,229,0.35)] p-8">
        
        {/* LOGO / BRAND */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            Pencil<span className="text-indigo-400">AI</span>
          </h1>
          <p className="text-white/60 mt-2 text-sm">
            Secure mobile authentication
          </p>
        </div>

        {/* ALERTS */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-3 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 px-4 py-3 text-sm">
            {success}
          </div>
        )}

        {!showOtp ? (
          /* PHONE INPUT */
          <form onSubmit={sendOtp} className="space-y-6">
            <div>
              <label className="text-white/70 text-sm font-medium">
                Mobile Number
              </label>
              <div className="mt-2 flex items-center rounded-xl bg-white/15 border border-white/20 focus-within:border-indigo-400 transition">
                <span className="px-4 text-white/70">+91</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                  className="w-full bg-transparent px-4 py-3 text-white placeholder-white/40 focus:outline-none"
                  placeholder="9876543210"
                  required
                />
              </div>
            </div>

            {/* hidden captcha */}
            <div id="recaptcha-container" style={{ display: "none" }} />

            <button
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 shadow-lg shadow-indigo-500/30 hover:scale-[1.02] transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Continue"}
            </button>
          </form>
        ) : (
          /* OTP INPUT */
          <form onSubmit={verifyOtp} className="space-y-6">
            <div>
              <label className="text-white/70 text-sm font-medium">
                Enter OTP
              </label>
              <input
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="mt-2 w-full rounded-xl bg-white/15 border border-white/20 px-4 py-4 text-center text-2xl tracking-[0.35em] text-white focus:outline-none focus:border-indigo-400"
                placeholder="••••••"
                required
              />
            </div>

            <button
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 shadow-lg shadow-indigo-500/30 hover:scale-[1.02] transition"
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

            <button
              type="button"
              onClick={() => setShowOtp(false)}
              className="w-full text-sm text-white/50 hover:text-white"
            >
              Change number
            </button>
          </form>
        )}

       
      </div>
    </div>
  );
}
