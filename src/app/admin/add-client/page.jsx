"use client";

import AdminRoute from "@/components/AdminRoute";
import { useState } from "react";
import { db, storage } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddClientPage() {
  return (
    <AdminRoute>
      <AddClient />
    </AdminRoute>
  );
}

// ================================
// ORIGINAL AddClient Component
// ================================

function AddClient() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    product1: "",
    product2: "",
    product3: "",
    installationDate: "",
    warrantyYears: "",
    invoice: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let invoiceUrl = "";

      // 1️⃣ Invoice Upload
      if (form.invoice) {
        const invoiceRef = ref(storage, `invoices/${Date.now()}_${form.invoice.name}`);
        const snapshot = await uploadBytes(invoiceRef, form.invoice);
        invoiceUrl = await getDownloadURL(snapshot.ref);
      }

      // 2️⃣ Save Data Firestore
      await addDoc(collection(db, "clients"), {
        name: form.name,
        phone: form.phone,
        product1: form.product1 || "",
        product2: form.product2 || "",
        product3: form.product3 || "",
        installationDate: form.installationDate,
        warrantyYears: form.warrantyYears,
        invoiceUrl: invoiceUrl,
        createdAt: new Date().toISOString()
      });

      alert("Client Added Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error while saving!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          ➕ Add Client
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold">Client Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-3 border rounded"
              placeholder="Enter Client Name"
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-semibold">Phone Number</label>
            <input
              type="text"
              name="phone"
              required
              className="w-full p-3 border rounded"
              placeholder="Enter Phone Number"
              onChange={handleChange}
            />
          </div>

          {/* Product Fields */}
          <div>
            <label className="block text-gray-700 font-semibold">Product Name 1</label>
            <input
              type="text"
              name="product1"
              className="w-full p-3 border rounded"
              onChange={handleChange}
              placeholder="Product / Machine Name 1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Product Name 2</label>
            <input
              type="text"
              name="product2"
              className="w-full p-3 border rounded"
              onChange={handleChange}
              placeholder="Product / Machine Name 2 (optional)"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Product Name 3</label>
            <input
              type="text"
              name="product3"
              className="w-full p-3 border rounded"
              onChange={handleChange}
              placeholder="Product / Machine Name 3 (optional)"
            />
          </div>

          {/* Installation Date */}
          <div>
            <label className="block text-gray-700 font-semibold">Installation Date</label>
            <input
              type="date"
              name="installationDate"
              required
              className="w-full p-3 border rounded"
              onChange={handleChange}
            />
          </div>

          {/* Warranty */}
          <div>
            <label className="block text-gray-700 font-semibold">Warranty (Years)</label>
            <select
              name="warrantyYears"
              required
              className="w-full p-3 border rounded"
              onChange={handleChange}
            >
              <option value="">Select Warranty</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="4">4 Years</option>
              <option value="5">5 Years</option>
            </select>
          </div>

          {/* Invoice Upload */}
          <div>
            <label className="block text-gray-700 font-semibold">Upload Invoice</label>
            <input
              type="file"
              name="invoice"
              accept="image/*,application/pdf"
              className="w-full p-3 border rounded"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Save Client
          </button>

        </form>
      </div>
    </div>
  );
}
