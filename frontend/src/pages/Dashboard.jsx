import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch Users
  const fetchUsers = async () => {
    const res = await axios.get("/auth/users"); 
    setUsers(res.data);
  };

  // Fetch Appointments
  const fetchAppointments = async () => {
    const res = await axios.get("/appointments"); 
    setAppointments(res.data);
  };

  // Book Appointment
  const book = async (doctorId) => {
    await axios.post("/appointments/book", {
      doctor: doctorId, // ✅ patient remove
      date: new Date().toISOString().split("T")[0],
    });

    fetchAppointments();
  };

  // Cancel Appointment
  const cancel = async (id) => {
    await axios.delete(`/appointments/${id}`);
    fetchAppointments();
  };

  useEffect(() => {
    fetchUsers();
    fetchAppointments();
  }, []);



  return (
    <>
      <Navbar />

      <div className="p-6 grid md:grid-cols-2 gap-6">
        <div>
  <h2 className="text-lg font-bold mb-3">Doctors</h2>

  {users
    .filter((u) => u.role === "doctor")
    .map((doc) => (
      <div
        key={doc._id}
        className="border p-4 mb-3 rounded flex justify-between items-center shadow-sm"
      >
        {/* Doctor Info */}
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">
            🩺 Dr. {doc.name}
          </span>

          <span className="text-sm text-gray-500">
            Available for appointment
          </span>
        </div>

        {/* Action */}
        {user.role === "patient" && (
          <button
            onClick={() => book(doc._id)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded transition"
          >
            Book
          </button>
        )}
      </div>
    ))}
</div>

        {/* Appointments */}
        <div>
          <h2 className="text-lg font-bold mb-2">Appointments</h2>

          {appointments.map((app) => {
            const date = new Date(app.createdAt).toLocaleDateString();
            const time = new Date(app.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            const statusStyle =
              app.status === "cancelled"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600";

            return (
              <div
                key={app._id}
                className="border p-3 mb-3 rounded flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                <div className="flex flex-col">
  <span className="font-medium">
    👤 {app.patient?.name}
  </span>

  <span className="text-sm text-gray-600">
    with 🩺 Dr. {app.doctor?.name}
  </span>
</div>

                  {/* Status Badge */}
                  <span className={`text-xs px-2 py-1 rounded ${statusStyle}`}>
                    {app.status?.toUpperCase()}
                  </span>
                </div>

                <span className="text-sm text-gray-600">
                  📅 {date}  {time}
                </span>
                {app.patient?._id === user._id && app.status !== "cancelled" && (
  <button
    onClick={() => cancel(app._id)}
    className="bg-red-500 text-white px-3 py-1 rounded w-fit"
  >
    Cancel
  </button>
)}
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}
