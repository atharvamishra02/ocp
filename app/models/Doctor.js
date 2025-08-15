import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  mode: { type: String, enum: ['online', 'in-person', 'both'], default: 'both' },
  imageUrl: { type: String },
  experience: { type: Number },
  description: { type: String },
  availability: {
    days: [{ type: String }],
    hours: { start: String, end: String }
  },
  fees: { type: Number },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

// Check if we're running on the server side
const isServer = typeof window === 'undefined';

// Only create/access the model on the server side
let Doctor;
if (isServer) {
  // Use existing model or create a new one
  Doctor = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
} else {
  // On client side, return a dummy object that won't cause errors
  Doctor = {};
}

export default Doctor;