import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  fullname: String,
  mobile: String,
  pincode: String,
  state: String,
  issue: String,
  slotTime: String,
  otp: String,
}, { timestamps: true });

const isServer = typeof window === 'undefined';

let Booking;
if (isServer) {
  Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
} else {
  Booking = {};
}

export default Booking;