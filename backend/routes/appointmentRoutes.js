// import express from "express";
// import {
//   bookAppointment,
//   getAppointments,
//   cancelAppointment
// } from "../controllers/appointmentController.js";

// const router = express.Router();

// router.post("/book", bookAppointment);
// router.get("/", getAppointments);
// router.delete("/:id", cancelAppointment);

// export default router;

import express from "express";
import {
  bookAppointment,
  getAppointments,
  cancelAppointment
} from "../controllers/appointmentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 Protected Routes
router.post("/book", authMiddleware, bookAppointment);
router.get("/", authMiddleware, getAppointments);
router.delete("/:id", authMiddleware, cancelAppointment);

export default router;