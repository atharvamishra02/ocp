import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

// Check if we're running on the server side
const isServer = typeof window === 'undefined';

// Only create/access the model on the server side
let User;
if (isServer) {
  // Use existing model or create a new one
  User = mongoose.models.User || mongoose.model('User', UserSchema);
} else {
  // On client side, return a dummy object that won't cause errors
  User = { findById: () => Promise.resolve(null) };
}

export default User;
