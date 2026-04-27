import Appointment from "../models/Appointment.js";

export const bookAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      patient: req.user.id,  
      doctor: req.body.doctor,
      date: req.body.date,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    let appointments;

    if (req.user.role === "patient") {
      appointments = await Appointment.find({
        patient: req.user.id,   // ✅ filter
      })
        .populate("patient")
        .populate("doctor");
    } else if (req.user.role === "doctor") {
      appointments = await Appointment.find({
        doctor: req.user.id,
      })
        .populate("patient")
        .populate("doctor");
    }

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


export const cancelAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ msg: "Not found" });
  }

  
  if (appointment.patient.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not allowed" });
  }

  appointment.status = "cancelled";
  await appointment.save();

  res.json({ msg: "Appointment Cancelled" });
};