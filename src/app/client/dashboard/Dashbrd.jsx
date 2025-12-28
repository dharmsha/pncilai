"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSearchParams, useRouter } from "next/navigation";
import { db, auth } from "@/firebase";

export default function DashboardInner() {
  const params = useSearchParams();
  const phone = params.get("phone");
  const router = useRouter();

  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      if (!phone) return;

      const q = query(collection(db, "clients"), where("phone", "==", phone));
      const res = await getDocs(q);

      res.forEach((doc) => {
        setClient({ id: doc.id, ...doc.data() });
      });
    };

    fetchClient();
  }, [phone]);

  if (!client)
    return (
      <p className="text-center mt-20 text-gray-500 text-xl">Loading...</p>
    );

  // Warranty calculation
  const installDate = new Date(client.installationDate);
  const expiryDate = new Date(installDate);
  expiryDate.setFullYear(
    expiryDate.getFullYear() + Number(client.warrantyYears)
  );
  const today = new Date();
  const diff = expiryDate - today;
  const remainingDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  let warrantyMsg =
    remainingDays > 0
      ? `Warranty Remaining: ${remainingDays} days`
      : "Warranty Expired";

  return (
    <>
      {/* 🌐 NAVBAR */}
      <div className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between fixed top-0 left-0 z-50">
        <h2 className="text-xl font-bold text-blue-600">PencilAI</h2>

        <div className="flex items-center gap-6">
          <button
            onClick={() => router.push(`/client/dashboard?phone=${client.phone}`)}
            className="text-gray-700 font-semibold hover:text-blue-600"
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              router.push(`/client/amc-request?phone=${client.phone}`)
            }
            className="text-gray-700 font-semibold hover:text-blue-600"
          >
            Buy AMC
          </button>

          <button
            onClick={() =>
              window.open(
                `https://wa.me/919835665318?text=Hello,%20I%20need%20help.`,
                "_blank"
              )
            }
            className="text-gray-700 font-semibold hover:text-blue-600"
          >
            Support
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "https://pencilai.in";
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="h-20"></div>

      {/* MAIN CONTENT */}
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {client.name}
            </h1>
            <p className="text-gray-600">Phone: {client.phone}</p>
          </div>

          {/* Warranty Status */}
          <div
            className={`p-6 rounded-xl shadow-md text-white mb-6 ${
              remainingDays > 0 ? "bg-green-600" : "bg-red-600"
            }`}
          >
            <h2 className="text-xl font-bold mb-2">Warranty Status</h2>
            <p className="text-lg">{warrantyMsg}</p>
            <p className="opacity-80 text-sm mt-2">
              Installation Date: {client.installationDate}
            </p>
          </div>

          {/* Products Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Your Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {client.product1 && (
                <ProductCard name={client.product1} />
              )}
              {client.product2 && (
                <ProductCard name={client.product2} />
              )}
              {client.product3 && (
                <ProductCard name={client.product3} />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() =>
                router.push(`/client/amc-request?phone=${client.phone}`)
              }
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl shadow"
            >
              Purchase AMC
            </button>

            {client.invoiceUrl ? (
              <button
                onClick={() => window.open(client.invoiceUrl, "_blank")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow"
              >
                Download Invoice
              </button>
            ) : (
              <button
                className="w-full bg-gray-400 text-white font-semibold py-3 rounded-xl cursor-not-allowed shadow"
                disabled
              >
                No Invoice Found
              </button>
            )}

            <button
              onClick={() =>
                window.open(
                  `https://wa.me/919835665318?text=Hello,%20I%20need%20help%20regarding%20my%20product.`,
                  "_blank"
                )
              }
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow"
            >
              Customer Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductCard({ name }) {
  return (
    <div className="p-5 bg-white rounded-xl shadow flex items-center gap-4">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        📦
      </div>
      <p className="text-lg font-semibold">{name}</p>
    </div>
  );
}
