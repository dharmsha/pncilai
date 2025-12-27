"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPhone, FaShieldAlt, FaWhatsapp, FaKey, FaArrowLeft, FaBolt, FaMagic } from "react-icons/fa";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mockMode, setMockMode] = useState(false);

  const router = useRouter();

  /* ===== MOCK LOGIN ===== */
  const mockLogin = () => {
    setMockMode(true);
    setPhoneNumber("9999999999");
    
    setTimeout(() => {
      const mockOtp = "123456";
      setOtp(mockOtp);
      setSuccess(`✓ Mock OTP ${mockOtp} auto-filled. Click verify to login.`);
      setShowOtp(true);
    }, 500);
  };

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

    // Mock testing ke liye
    if (phoneNumber === "9999999999") {
      setMockMode(true);
      setSuccess("✓ OTP sent successfully (Mock Mode). Use 123456 to verify.");
      setShowOtp(true);
      setLoading(false);
      return;
    }

    try {
      // Agar real Firebase use karna hai to yahan Firebase call hoga
      // Lekin testing ke liye mock mode mein hi raho
      setMockMode(true);
      setSuccess("✓ OTP sent successfully (Mock Mode). Use 123456 to verify.");
      setShowOtp(true);
    } catch (err) {
      setError("For testing, use phone number: 9999999999 with OTP: 123456");
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
      // Mock authentication - Firebase use nahi karega
      if (otp === "123456") {
        setSuccess("✓ Authentication successful! Redirecting...");
        
        setTimeout(() => {
          // Check if admin or client
          const isAdmin = phoneNumber === "9234477961";
          const path = isAdmin 
            ? `/admin/dashboard?phone=${phoneNumber}&mock=true&timestamp=${Date.now()}`
            : `/client/dashboard?phone=${phoneNumber}&mock=true&timestamp=${Date.now()}`;
          
          // Store mock user in localStorage for session
          localStorage.setItem("mockUser", JSON.stringify({
            phoneNumber: phoneNumber,
            uid: "mock-user-" + Date.now(),
            isAdmin: isAdmin,
            loginTime: new Date().toISOString()
          }));
          
          router.push(path);
        }, 800);
      } else {
        setError("For mock testing, use OTP: 123456");
      }
    } catch {
      setError("Invalid OTP. Use 123456 for testing.");
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
                Development Mode - Mock Authentication
              </p>
            </div>

            {/* Testing Notice */}
            <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-xl">
              <p className="text-yellow-300 text-sm font-medium flex items-center">
                <FaBolt className="mr-2" />
                Development Mode Active
              </p>
              <p className="text-yellow-500/80 text-xs mt-1">
                Using mock authentication. No Firebase required.
              </p>
            </div>

            {/* Quick Test Button */}
            <div className="mb-6">
              <button
                onClick={mockLogin}
                className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-3.5 shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] transition-all duration-300 mb-4"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-700 to-orange-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center justify-center">
                  <FaMagic className="mr-2" />
                  Quick Test Login (Phone: 9999999999, OTP: 123456)
                </span>
              </button>
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
                      onChange={(e) => {
                        setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10));
                      }}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-16 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter 10-digit number"
                      required
                    />
                    {phoneNumber === "9999999999" && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">Mock</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    For testing use: <span className="text-amber-400">9999999999</span>
                  </p>
                </div>

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
                        Continue (Mock Mode)
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
                  <div className="relative">
                    <input
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                      }}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3.5 text-center text-2xl tracking-[0.35em] text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="123456"
                      required
                      autoFocus
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded flex items-center">
                        <FaMagic className="mr-1" /> Mock
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Use OTP: <span className="text-amber-400 font-bold">123456</span> for testing
                  </p>
                </div>

                {/* Quick OTP Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOtp("123456")}
                    className="text-sm bg-amber-900/30 text-amber-300 border border-amber-800/50 rounded-xl py-2.5 hover:bg-amber-900/50 transition flex items-center justify-center"
                  >
                    <FaMagic className="mr-2" />
                    Use 123456
                  </button>
                  <button
                    type="button"
                    onClick={() => setOtp("000000")}
                    className="text-sm bg-gray-800/30 text-gray-300 border border-gray-700/50 rounded-xl py-2.5 hover:bg-gray-800/50 transition"
                  >
                    Use 000000
                  </button>
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
                        Redirecting...
                      </>
                    ) : (
                      "Verify & Login"
                    )}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowOtp(false);
                    setOtp("");
                  }}
                  className="w-full flex items-center justify-center text-sm text-gray-400 hover:text-white transition-colors py-2"
                >
                  <FaArrowLeft className="mr-2" />
                  Change mobile number
                </button>
              </form>
            )}

            {/* Dashboard Quick Access */}
            <div className="mt-6 pt-6 border-t border-gray-800/50">
              <p className="text-xs text-gray-500 mb-3 text-center">Quick Access Presets</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setPhoneNumber("9234477961");
                    setMockMode(true);
                    setTimeout(() => {
                      setOtp("123456");
                      setShowOtp(true);
                      setSuccess("Admin login ready. Click verify.");
                    }, 100);
                  }}
                  className="text-xs bg-purple-900/30 text-purple-300 border border-purple-800/50 rounded-lg py-2.5 hover:bg-purple-900/50 transition"
                >
                  Admin Login
                </button>
                <button
                  onClick={() => {
                    setPhoneNumber("9876543210");
                    setMockMode(true);
                    setTimeout(() => {
                      setOtp("123456");
                      setShowOtp(true);
                      setSuccess("Client login ready. Click verify.");
                    }, 100);
                  }}
                  className="text-xs bg-blue-900/30 text-blue-300 border border-blue-800/50 rounded-lg py-2.5 hover:bg-blue-900/50 transition"
                >
                  Client Login
                </button>
              </div>
            </div>

            {/* Support Section */}
            <div className="mt-8 pt-6 border-t border-gray-800/50">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Firebase setup help needed?
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
                  Contact for Firebase setup assistance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Development Note */}
        <div className="mt-4 p-3 bg-gray-800/30 border border-gray-700/30 rounded-lg">
          <p className="text-xs text-gray-400 text-center">
            🔧 <strong>Development Mode:</strong> Mock authentication active. 
            Firebase not required. Use phone: <code className="bg-gray-900 px-1 rounded">9999999999</code> with OTP: <code className="bg-gray-900 px-1 rounded">123456</code>
          </p>
        </div>
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