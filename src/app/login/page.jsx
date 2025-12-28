"use client";

import { useEffect, useRef, useState } from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { FaPhone, FaShieldAlt, FaWhatsapp, FaKey, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const recaptchaRef = useRef(null);
  const router = useRouter();

  /* ===== AUTH CHECK ===== */
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const phone = user.phoneNumber?.replace("+91", "");
        if (phone === "9234477961") {
          router.push(`/admin/dashboard?phone=${phone}`);
        } else {
          router.push(`/client/dashboard?phone=${phone}`);
        }
      }
    });
  }, [router]);

  /* ===== IMPROVED CAPTCHA INITIALIZATION ===== */
  const initCaptcha = () => {
    try {
      // Clear existing captcha if any
      if (recaptchaRef.current) {
        try {
          recaptchaRef.current.clear();
        } catch (err) {
          console.log("Clearing old captcha failed:", err);
        }
      }

      // Ensure we're in browser environment
      if (typeof window === "undefined") return;

      // Initialize new recaptcha verifier
      recaptchaRef.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved successfully");
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired, reinitializing...");
            setTimeout(initCaptcha, 1000);
          },
          "error-callback": (error) => {
            console.error("reCAPTCHA error:", error);
            if (retryCount < 3) {
              setRetryCount(prev => prev + 1);
              setTimeout(initCaptcha, 2000);
            } else {
              setError("Unable to initialize security verification. Please refresh the page.");
            }
          }
        }
      );

      // Render the recaptcha
      recaptchaRef.current.render().catch((err) => {
        console.error("Failed to render reCAPTCHA:", err);
        if (err.message.includes("Hostname match not found")) {
          setError(`⚠️ Domain verification failed. Please contact support immediately at 7070853444.`);
        }
      });
    } catch (error) {
      console.error("Captcha initialization error:", error);
      if (error.message.includes("Hostname match")) {
        setError(`❌ System configuration issue detected. Call support now: 7070853444`);
      }
    }
  };

  /* ===== INITIALIZE CAPTCHA ON MOUNT ===== */
  useEffect(() => {
    // Only run in browser
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        initCaptcha();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  /* ===== SEND OTP WITH RETRY MECHANISM ===== */
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
      // Validate recaptcha is ready
      if (!recaptchaRef.current) {
        initCaptcha();
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      const formattedPhoneNumber = `+91${phoneNumber}`;
      console.log("Attempting to send OTP to:", formattedPhoneNumber);
      
      const result = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        recaptchaRef.current
      );
      
      setConfirmationResult(result);
      setShowOtp(true);
      setSuccess(`✅ OTP sent to ${phoneNumber}. Valid for 2 minutes.`);
      
      // Auto-refresh captcha after successful send
      setTimeout(initCaptcha, 500);
    } catch (err) {
      console.error("OTP Send Error:", err);
      
      // Handle specific Firebase errors
      if (err.code === 'auth/invalid-phone-number') {
        setError("Invalid phone number format. Use 10 digits without +91.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Too many attempts. Please wait 2 minutes or call support: 7070853444");
      } else if (err.code === 'auth/captcha-check-failed') {
        setError(`🔒 Security verification failed. Call support: 7070853444`);
        // Try to reinitialize captcha
        setTimeout(initCaptcha, 1000);
      } else if (err.message.includes("Hostname match")) {
        setError(`🚨 SYSTEM CONFIGURATION ERROR - Call support immediately: 7070853444`);
      } else {
        setError(`Failed to send OTP. ${err.message || "Please try again."}`);
      }
      
      // Reset retry count on error
      setRetryCount(0);
      setTimeout(initCaptcha, 2000);
    } finally {
      setLoading(false);
    }
  };

  /* ===== VERIFY OTP ===== */
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!confirmationResult) {
      setError("Session expired. Please request a new OTP.");
      setLoading(false);
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      
      setSuccess("✅ Authentication successful! Redirecting...");
      
      // Extract phone number from user
      const userPhone = user.phoneNumber?.replace("+91", "") || phoneNumber;
      
      setTimeout(() => {
        if (userPhone === "9234477961") {
          router.push(`/admin/dashboard?phone=${userPhone}`);
        } else {
          router.push(`/client/dashboard?phone=${userPhone}`);
        }
      }, 1500);
    } catch (err) {
      console.error("OTP Verification Error:", err);
      
      if (err.code === 'auth/invalid-verification-code') {
        setError("Invalid OTP. Please enter correct code.");
      } else if (err.code === 'auth/code-expired') {
        setError("OTP expired. Please request a new one.");
        setShowOtp(false);
      } else {
        setError("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ===== EMERGENCY SUPPORT FUNCTION ===== */
  const handleEmergencySupport = () => {
    // Direct WhatsApp and call options
    const whatsappUrl = `https://wa.me/917070853444?text=URGENT:+Login+issue+with+reCAPTCHA+error`;
    const callUrl = `tel:+917070853444`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show call prompt
    if (window.confirm("Call support immediately at 7070853444?")) {
      window.location.href = callUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      {/* Emergency Support Overlay */}
      {error && error.includes("7070853444") && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <div className="bg-red-900/90 border border-red-700 rounded-xl p-4 text-white shadow-2xl animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaExclamationTriangle className="text-red-300 mr-3 text-xl" />
                <div>
                  <p className="font-bold">URGENT SUPPORT REQUIRED</p>
                  <p className="text-sm">System configuration issue detected</p>
                </div>
              </div>
              <button
                onClick={handleEmergencySupport}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
              >
                CALL NOW
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="relative rounded-2xl bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 shadow-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500"></div>
          
          <div className="p-8">
            {/* Logo/Brand */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 mb-4 shadow-lg animate-pulse">
                <FaShieldAlt className="text-2xl text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                Pencil<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">AI</span>
              </h1>
              <p className="text-gray-400 mt-2 text-sm">
                Secure Authentication System
              </p>
            </div>

            {/* Alerts */}
            {error && (
              <div className="mb-6 rounded-xl bg-red-900/40 border border-red-700/50 text-red-200 px-4 py-3 text-sm">
                <div className="flex items-start">
                  <FaExclamationTriangle className="mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Error</div>
                    <div>{error}</div>
                    {error.includes("7070853444") && (
                      <button
                        onClick={handleEmergencySupport}
                        className="mt-2 bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-xs font-bold"
                      >
                        🚨 CLICK HERE FOR IMMEDIATE SUPPORT
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            {success && (
              <div className="mb-6 rounded-xl bg-emerald-900/30 border border-emerald-700/50 text-emerald-200 px-4 py-3 text-sm">
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">✅</div>
                  <div>{success}</div>
                </div>
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
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-16 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="Enter 10-digit number"
                      required
                    />
                  </div>
                </div>

                {/* Hidden reCAPTCHA container */}
                <div id="recaptcha-container" className="hidden" />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3.5 shadow-lg hover:shadow-red-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-700 to-orange-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center justify-center">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        SEND OTP
                        <FaKey className="ml-2" />
                      </>
                    )}
                  </span>
                </button>

                {/* Emergency Login Note */}
                <div className="text-center text-xs text-gray-500 mt-4">
                  <p>If facing issues, contact support immediately</p>
                </div>
              </form>
            ) : (
              /* OTP Verification Form */
              <form onSubmit={verifyOtp} className="space-y-6">
                <div>
                  <label className="flex items-center text-gray-300 text-sm font-medium mb-2">
                    <FaShieldAlt className="mr-2 text-gray-400" />
                    Enter 6-digit OTP
                  </label>
                  <input
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3.5 text-center text-2xl tracking-[0.35em] text-white font-mono focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="••••••"
                    required
                    autoFocus
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Sent to +91{phoneNumber}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3.5 shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-700 to-teal-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center justify-center">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Verifying...
                      </>
                    ) : (
                      "VERIFY & LOGIN"
                    )}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowOtp(false);
                    setOtp("");
                    setError("");
                  }}
                  className="w-full flex items-center justify-center text-sm text-gray-400 hover:text-white transition-colors py-2"
                >
                  <FaArrowLeft className="mr-2" />
                  Change mobile number
                </button>
              </form>
            )}

            {/* EMERGENCY SUPPORT SECTION */}
            <div className="mt-8 pt-6 border-t border-red-800/50">
              <div className="text-center">
                <p className="text-sm text-red-400 mb-3 font-semibold">
                  🚨 EMERGENCY SUPPORT
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleEmergencySupport}
                    className="w-full bg-red-900/50 border border-red-700/70 text-red-300 hover:bg-red-900/70 hover:border-red-600 transition-all py-3 rounded-xl font-bold animate-pulse"
                  >
                    🚨 IMMEDIATE SUPPORT: 7070853444
                  </button>
                  
                  <a
                    href="https://wa.me/917070853444"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-3 rounded-lg bg-emerald-900/30 border border-emerald-800/50 text-emerald-300 hover:bg-emerald-900/50 hover:border-emerald-700 transition-all"
                  >
                    <FaWhatsapp className="mr-2 text-emerald-400" />
                    WhatsApp Support
                  </a>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  24/7 Support Available • Call or WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-600 text-sm mt-6">
          © {new Date().getFullYear()} PencilAI • Support: 7070853444
        </p>
      </div>
    </div>
  );
}