"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AdminRoute from "@/components/AdminRoute";

export default function AdminDashboardPage() {
  return (
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  );
}

function AdminDashboard() {
  const router = useRouter();
  const params = useSearchParams();
  const phone = params.get("phone"); // Admin phone (9234477961)

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-blue-600">Pencil AI</h2>

        <nav className="space-y-3">

          {/* Add Client */}
          <button
            onClick={() =>
              router.push(`/admin/add-client?phone=${phone}`)
            }
            className="w-full text-left bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            ➕ Add Client
          </button>

          {/* View Clients */}
          <button
            onClick={() =>
              router.push(`/admin/clients?phone=${phone}`)
            }
            className="w-full text-left bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            👁 View Clients
          </button>

          {/* AMC Requests */}
          <button
            onClick={() =>
              router.push(`/admin/amc-requests?phone=${phone}`)
            }
            className="w-full text-left bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
          >
            📝 AMC Requests
          </button>

          {/* Logout */}
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full text-left bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Admin Dashboard
        </h1>

        <p className="text-gray-600 text-lg">
          Welcome to Pencil AI Admin Panel — manage all client data from here.
        </p>

        {/* Cards Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Total Clients</h3>
            <p className="text-gray-500 mt-2">View and manage all customers</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">Add New Client</h3>
            <p className="text-gray-500 mt-2">Upload client data & invoices</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">AMC Requests</h3>
            <p className="text-gray-500 mt-2">Approve or reject AMC orders</p>
          </div>

        </div>
      </main>

    </div>
  );
}
