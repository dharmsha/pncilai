"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import AdminRoute from "@/components/AdminRoute";

export default function ClientsPage() {
  return (
    <AdminRoute>
      <ClientsList />
    </AdminRoute>
  );
}

// ==========================
// Clients List Component
// ==========================
function ClientsList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const querySnapshot = await getDocs(collection(db, "clients"));
      const data = [];
      querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      setClients(data);
    };
    fetchClients();
  }, []);

  const calcWarranty = (item) => {
    const installDate = new Date(item.installationDate);
    const expiry = new Date(installDate);
    expiry.setFullYear(expiry.getFullYear() + Number(item.warrantyYears));

    const diff = expiry - new Date();
    const left = Math.floor(diff / (1000 * 60 * 60 * 24));

    return left > 0 ? `${left} days left` : "Expired";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        All Clients
      </h1>

      <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Client</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Warranty</th>
              <th className="p-3">Installation</th>
              <th className="p-3">Invoice</th>
              <th className="p-3">View</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-100">
                <td className="p-3 font-semibold">{c.name}</td>
                <td className="p-3">{c.phone}</td>

                <td
                  className={`p-3 font-semibold ${
                    calcWarranty(c) === "Expired" ? "text-red-600" : "text-green-700"
                  }`}
                >
                  {calcWarranty(c)}
                </td>

                <td className="p-3">{c.installationDate}</td>

                <td className="p-3">
                  {c.invoiceUrl ? (
                    <a
                      href={c.invoiceUrl}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      Download
                    </a>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="p-3">
                  <Link
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    href={`/client/dashboard?phone=${c.phone}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
