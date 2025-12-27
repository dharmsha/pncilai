"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useSearchParams, useRouter } from "next/navigation";

export default function AmcRequestInner() {
  const params = useSearchParams();
  const phone = params.get("phone");
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: phone || "",
    plan: "",
    message: "",
  });

  useEffect(() => {
    const storedClient = localStorage.getItem("clientName");
    if (storedClient) {
      setForm((prev) => ({ ...prev, name: storedClient }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.plan) return alert("Please select AMC plan");

    try {
      await addDoc(collection(db, "amc_requests"), {
        ...form,
        date: new Date().toISOString(),
        status: "Pending",
      });

      alert("AMC Request Submitted Successfully!");
      router.push(`/client/dashboard?phone=${phone}`);
    } catch (error) {
      alert("Error submitting request!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="bg-white shadow-xl rounded-xl p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          AMC Request Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* --- Rest of your UI stays same --- */}

          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded p-3"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Phone</label>
            <input
              type="text"
              value={form.phone}
              readOnly
              className="w-full bg-gray-200 border rounded p-3 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Select AMC Plan</label>
            <select
              value={form.plan}
              onChange={(e) => setForm({ ...form, plan: e.target.value })}
              className="w-full border rounded p-3"
              required
            >
              <option value="">-- Select Plan --</option>
              <option value="1 Year - ₹1999">1 Year – ₹1999</option>
              <option value="2 Years - ₹3499">2 Years – ₹3499</option>
              <option value="3 Years - ₹4599">3 Years – ₹4599</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Message (Optional)</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border rounded p-3"
              placeholder="Write here if you need specific help..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
