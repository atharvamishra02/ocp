import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String,
});

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
