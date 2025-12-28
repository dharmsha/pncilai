"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useSearchParams, useRouter } from "next/navigation";

export default function AmcRequestInner() {
  const params = useSearchParams();
  const phone = params.get("phone");
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: phone || "",
    product: "",
    plan: "",
    amount: "",
    message: "",
  });

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchClient = async () => {
      const q = query(collection(db, "clients"), where("phone", "==", phone));
      const res = await getDocs(q);

      res.forEach((doc) => {
        const data = doc.data();

        setForm((prev) => ({ ...prev, name: data.name }));

        const products = [];
        if (data.product1) products.push(data.product1);
        if (data.product2) products.push(data.product2);
        if (data.product3) products.push(data.product3);
        setProductList(products);
      });
    };

    fetchClient();
  }, [phone]);

  const handlePlanChange = (value) => {
    const priceMap = {
      "1 Year": "₹5000",
      "2 Years": "₹10000",
      "3 Years": "₹15000",
    };

    setForm({
      ...form,
      plan: value,
      amount: priceMap[value] || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.product || !form.plan)
      return alert("Please select product and plan");

    try {
      await addDoc(collection(db, "amc_requests"), {
        ...form,
        date: new Date().toISOString(),
        status: "Pending",
      });

      alert("AMC Request Submitted Successfully!");
      router.push(`/client/dashboard?phone=${phone}`);
    } catch (error) {
      console.error(error);
      alert("Error submitting AMC request");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="bg-white shadow-xl rounded-xl p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          AMC Request Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              readOnly
              className="w-full bg-gray-200 border rounded p-3 cursor-not-allowed"
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
            <label className="block font-semibold mb-1">Select Product</label>
            <select
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
              className="w-full border rounded p-3"
              required
            >
              <option value="">-- Select Product --</option>
              {productList.map((p, index) => (
                <option key={index} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">AMC Plan</label>
            <select
              value={form.plan}
              onChange={(e) => handlePlanChange(e.target.value)}
              className="w-full border rounded p-3"
              required
            >
              <option value="">-- Select Plan --</option>
              <option value="1 Year">1 Year – ₹5000</option>
              <option value="2 Years">2 Years – ₹10000</option>
              <option value="3 Years">3 Years – ₹15000</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">AMC Amount</label>
            <input
              type="text"
              value={form.amount}
              readOnly
              className="w-full bg-gray-200 border rounded p-3 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Message (Optional)</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border rounded p-3"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Submit AMC Request
          </button>
        </form>
      </div>
    </div>
  );
}
