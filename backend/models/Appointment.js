import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: String,
  status: { type: String, default: "booked" }
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);