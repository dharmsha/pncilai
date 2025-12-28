"use client";

import { useEffect, useRef, useState } from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { FaPhone, FaShieldAlt, FaWhatsapp, FaKey, FaArrowLeft } from "react-icons/fa";

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
      setError("Please enter a valid 10-digit mobile number");
      setLoading(false);
      return;
    }

    try {
      const res = await signInWithPhoneNumber(
        auth,
        `+91${phoneNumber}`,  // ✅ Fixed: Added backticks
        recaptchaRef.current
      );
      setConfirmationResult(res);
      setShowOtp(true);
      setSuccess("✓ OTP sent successfully to your mobile");
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again.");
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
      setSuccess("✓ Authentication successful! Redirecting...");

      setTimeout(() => {
        if (phoneNumber === "9234477961") {
          router.push(`/admin/dashboard?phone=${phoneNumber}`);  // ✅ Fixed: Added backticks
        } else {
          router.push(`/client/dashboard?phone=${phoneNumber}`); // ✅ Fixed: Added backticks
        }
      }, 1200);
    } catch {
      setError("Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="relative rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl overflow-hidden">
          {/* Header Gradient Bar */}
          <div className="h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
          
          <div className="p-8">
            {/* Logo/Brand */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 mb-4 shadow-lg">
                <FaShieldAlt className="text-2xl text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                Pencil<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI</span>
              </h1>
              <p className="text-gray-400 mt-2 text-sm">
                Secure authentication system
              </p>
            </div>

            {/* Alerts */}
            {error && (
              <div className="mb-6 animate-fade-in rounded-xl bg-red-900/30 border border-red-700/50 text-red-200 px-4 py-3 text-sm flex items-start">
                <div className="mr-2 mt-0.5">⚠️</div>
                <div>{error}</div>
              </div>
            )}
            {success && (
              <div className="mb-6 animate-fade-in rounded-xl bg-emerald-900/30 border border-emerald-700/50 text-emerald-200 px-4 py-3 text-sm flex items-start">
                <div className="mr-2 mt-0.5">✓</div>
                <div>{success}</div>
              </div>
            )}

            {!showOtp ? (
              /* Phone Input Form */
              <form onSubmit={sendOtp} className="space-y-6">
                <div>
                  <label className="flex items-center text-gray-300 text-sm font-medium mb-2">
                    <FaPhone className="mr-2 text-gray-400" />
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">+91</span>
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(
                          e.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-16 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter 10-digit number"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    We'll send a 6-digit verification code
                  </p>
                </div>

                {/* hidden captcha */}
                <div id="recaptcha-container" style={{ display: "none" }} />

                <button
                  disabled={loading}
                  className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-700 to-purple-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center justify-center">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Continue
                        <FaKey className="ml-2" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            ) : (
              /* OTP Verification Form */
              <form onSubmit={verifyOtp} className="space-y-6">
                <div>
                  <label className="flex items-center text-gray-300 text-sm font-medium mb-2">
                    <FaShieldAlt className="mr-2 text-gray-400" />
                    Enter Verification Code
                  </label>
                  <input
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3.5 text-center text-2xl tracking-[0.35em] text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="••••••"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Enter the 6-digit code sent to +91{phoneNumber}
                  </p>
                </div>

                <button
                  disabled={loading}
                  className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3.5 shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-700 to-teal-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center justify-center">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Verifying...
                      </>
                    ) : (
                      "Verify & Login"
                    )}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowOtp(false)}
                  className="w-full flex items-center justify-center text-sm text-gray-400 hover:text-white transition-colors py-2"
                >
                  <FaArrowLeft className="mr-2" />
                  Change mobile number
                </button>
              </form>
            )}

            {/* Support Section - Fixed at bottom */}
            <div className="mt-8 pt-6 border-t border-gray-800/50">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Having trouble logging in?
                </p>
                <a
                  href="https://wa.me/917070853444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-900/30 border border-emerald-800/50 text-emerald-300 hover:bg-emerald-900/50 hover:border-emerald-700 transition-all group"
                >
                  <FaWhatsapp className="mr-2 text-emerald-400" />
                  WhatsApp Support
                  <span className="ml-2 text-xs bg-emerald-900/50 px-2 py-1 rounded">
                    7070853444
                  </span>
                </a>
                <p className="text-xs text-gray-600 mt-3">
                  Our support team is available 24/7
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-600 text-sm mt-6">
          © {new Date().getFullYear()} PencilAI. All rights reserved.
        </p>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}