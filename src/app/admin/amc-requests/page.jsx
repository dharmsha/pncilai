"use client";

import AdminRoute from "@/components/AdminRoute";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

export default function AmcRequestsPage() {
  return (
    <AdminRoute>
      <AmcRequests />
    </AdminRoute>
  );
}

// =============================
// AMC REQUESTS COMPONENT
// =============================
function AmcRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const querySnapshot = await getDocs(collection(db, "amc_requests"));
    const list = [];
    querySnapshot.forEach((docSnap) =>
      list.push({ id: docSnap.id, ...docSnap.data() })
    );
    setRequests(list);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔥 Approve AMC
  const approveRequest = async (request) => {
    const confirmMsg = window.confirm("Approve AMC request?");
    if (!confirmMsg) return;

    const planYears = {
      "1 Year": 1,
      "2 Years": 2,
      "3 Years": 3,
    };

    const yearsToExtend = planYears[request.plan];

    // 1️⃣ Find client data
    const clientsSnap = await getDocs(collection(db, "clients"));
    let clientDocId = null;

    clientsSnap.forEach((docSnap) => {
      if (docSnap.data().phone === request.phone) {
        clientDocId = docSnap.id;
      }
    });

    if (clientDocId) {
      const clientRef = doc(db, "clients", clientDocId);
      const clientData = (await getDoc(clientRef)).data();

      const newWarranty =
        Number(clientData.warrantyYears) + Number(yearsToExtend);

      // 2️⃣ Update warranty
      await updateDoc(clientRef, {
        warrantyYears: newWarranty,
      });
    }

    // 3️⃣ Update AMC status
    await updateDoc(doc(db, "amc_requests", request.id), {
      status: "Approved",
    });

    // 4️⃣ Auto WhatsApp Notification
    const message = encodeURIComponent(
      `Hello ${request.name}! Your AMC has been approved 🎉\n\nProduct: ${request.product}\nPlan: ${request.plan}\nAmount: ${request.amount}\n\nThank you for choosing PencilAI!`
    );

    window.open(`https://wa.me/91${request.phone}?text=${message}`, "_blank");

    fetchRequests();
  };

  // ❌ Reject AMC
  const rejectRequest = async (id) => {
    const confirmMsg = window.confirm("Reject this AMC request?");
    if (!confirmMsg) return;

    await updateDoc(doc(db, "amc_requests", id), { status: "Rejected" });
    fetchRequests();
  };

  // 🗑 Delete Request
  const deleteRequest = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this request permanently?"
    );
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "amc_requests", id));
    fetchRequests();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        AMC Requests
      </h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No AMC Requests Found
        </p>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Product</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="p-3 font-semibold">{item.name}</td>
                  <td className="p-3">{item.phone}</td>
                  <td className="p-3">{item.product}</td>
                  <td className="p-3">{item.plan}</td>
                  <td className="p-3">{item.amount}</td>

                  <td className="p-3">
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td
                    className={`p-3 font-bold ${
                      item.status === "Pending"
                        ? "text-yellow-600"
                        : item.status === "Approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </td>

                  <td className="p-3 flex gap-2 justify-center flex-wrap">
                    {/* Approve + Reject only if Pending */}
                    {item.status === "Pending" && (
                      <>
                        <button
                          onClick={() => approveRequest(item)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => rejectRequest(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {/* Always visible delete */}
                    <button
                      onClick={() => deleteRequest(item.id)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
