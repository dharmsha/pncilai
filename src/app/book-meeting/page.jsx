"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import moment from "moment";

// ReactPlayer without SSR to avoid hydration error
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function BookMeetingPage() {
  const [meetings, setMeetings] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  // Submit meeting form
  const onSubmit = async (data) => {
    await addDoc(collection(db, "meetings"), {
      ...data,
      createdAt: Timestamp.now(),
    });
    reset();
    fetchMeetings();
  };

  // Fetch all meetings
  const fetchMeetings = async () => {
    const snapshot = await getDocs(collection(db, "meetings"));
    const meetingList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMeetings(meetingList);
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  // Get next webinar Wednesday 4 PM session date/time
  const getNextWednesday = () => {
    const now = moment();
    let thisWednesday = moment().day(3).hour(16).minute(0).second(0); // Wednesday 4 PM

    if (now.isAfter(thisWednesday)) {
      // If current time is after this week's Wednesday 4 PM, show next week's Wednesday
      thisWednesday = thisWednesday.add(1, "week");
    }
    return thisWednesday.format("dddd, MMMM Do YYYY [at] h:mm A");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">📅 Book a Meeting</h1>

      {/* Weekly Webinar Section */}
      <div className="bg-purple-100 border border-purple-300 p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-purple-800 mb-2">🌐 Weekly Webinar</h2>
        <p className="text-gray-700">
          Join our free live webinar every <strong>Wednesday at 4 PM</strong>!
        </p>
        <p className="text-gray-600 mt-1">
          📍 <strong>Next Webinar:</strong> {getNextWednesday()}
        </p>
        <a
          href="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Join Now
        </a>
      </div>

      {/* Meeting Booking Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-xl shadow-lg"
      >
        <input
          {...register("name")}
          placeholder="Your Name"
          required
          className="p-2 border rounded"
        />
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          required
          className="p-2 border rounded"
        />
        <input
          {...register("meetingDate")}
          type="date"
          required
          className="p-2 border rounded"
        />
        <input
          {...register("meetingTime")}
          type="time"
          required
          className="p-2 border rounded"
        />
        <textarea
          {...register("message")}
          placeholder="Write a message (optional)"
          className="p-2 border rounded col-span-1 md:col-span-2"
        ></textarea>
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {/* Recorded Demo Video */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">📹 Recorded Demo Video</h2>
        <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" controls width="100%" />
      </div>

      {/* Scheduled Meetings List */}
      <div>
        <h2 className="text-2xl font-semibold mt-10 mb-4">📋 Scheduled Meetings</h2>
        <ul className="space-y-2">
          {meetings.map((meeting) => (
            <li key={meeting.id} className="border rounded p-3 shadow-sm bg-gray-50">
              <strong>{meeting.name}</strong> scheduled a meeting on{" "}
              <span className="text-blue-600">
                {moment(meeting.meetingDate).format("MMM Do")} at {meeting.meetingTime}
              </span>
              <p className="text-sm text-gray-600">{meeting.email}</p>
              {meeting.message && <p className="italic">{meeting.message}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
