"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';

export default function SlotPicker({ doctorId }) {
  const router = useRouter();
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    mobile: "",
    pincode: "",
    state: "",
    issue: "",
  });
  const [formError, setFormError] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [error, setError] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [verified, setVerified] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    fetch("/api/slots")
      .then((res) => res.json())
      .then((data) => setSlots(data))
      .catch(() => setError("Failed to load slots."));
  }, []);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setShowForm(true);
    setOtp("");
    setShowOtpPopup(false);
    setShowOtpForm(false);
    setVerified(false);
    setBookingSuccess(false);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !form.fullname ||
      !form.mobile ||
      !form.pincode ||
      !form.state ||
      !form.issue
    ) {
      setFormError("Please fill all fields.");
      return false;
    }
    if (!/^\d{10}$/.test(form.mobile)) {
      setFormError("Mobile number must be 10 digits.");
      return false;
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      setFormError("Pincode must be 6 digits.");
      return false;
    }
    setFormError("");
    return true;
  };

  // Generate a random 6-digit OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const newOtp = generateOtp();
    setOtp(newOtp);
    setShowOtpPopup(true);
    setShowForm(false);
    setShowOtpForm(true);
    setTimeout(() => setShowOtpPopup(false), 4000);

    // Save booking to database
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor: doctorId,
          fullname: form.fullname,
          mobile: form.mobile,
          pincode: form.pincode,
          state: form.state,
          issue: form.issue,
          slotTime: selectedSlot.time,
          otp: newOtp,
        }),
      });
    } catch {
      setError("Could not save booking. Try again.");
    }
  };

  const handleOtpChange = (e) => {
    setEnteredOtp(e.target.value);
    setOtpError("");
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    if (enteredOtp === String(otp)) {
      setVerified(true);
      setOtpError("");
      setBookingSuccess(true);
    } else {
      setOtpError("Invalid OTP. Please try again.");
      setVerified(false);
      setBookingSuccess(false);
    }
  };

  return (
    <div className="p-6">
      {/* OTP Popup */}
      {showOtpPopup && (
        <div
          className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-4 rounded-b-lg shadow-lg animate-slideDown"
          style={{ minWidth: "250px", textAlign: "center" }}
        >
          <span className="font-bold text-lg">Your OTP is:</span>
          <div className="mt-2 text-2xl font-extrabold tracking-widest">{otp}</div>
        </div>
      )}

      {/* Add animation styles */}
      <style>{`
        @keyframes slideDown {
          from { transform: translate(-50%, -100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease;
        }
      `}</style>

      <h1 className="text-xl font-bold mb-4 text-green-700">Available Slots</h1>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {slots.map((slot, i) => (
          <button
            key={i}
            disabled={!slot.available}
            onClick={() => handleSlotClick(slot)}
            className={`border p-4 rounded-lg shadow transition-all
              ${slot.available ? "bg-white hover:bg-green-50 cursor-pointer" : "bg-gray-200 cursor-not-allowed text-gray-400"}
              ${selectedSlot?.time === slot.time ? "border-green-500 ring-2 ring-green-300" : ""}
            `}
          >
            <span className="block text-lg font-semibold">{slot.time}</span>
            <span className={`block mt-2 text-sm font-medium ${slot.available ? "text-green-600" : "text-gray-500"}`}>
              {slot.available ? "Available" : "Booked"}
            </span>
          </button>
        ))}
      </div>

      {/* Show form after slot selection */}
      {showForm && (
        <form
          ref={formRef}
          className="mt-6 p-6 border rounded-lg bg-white shadow max-w-md mx-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-lg font-bold text-green-800 mb-4">Confirm Your Details</h2>
          <div className="mb-3">
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Mobile No</label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
              required
              pattern="\d{10}"
              maxLength={10}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
              required
              pattern="\d{6}"
              maxLength={6}
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">State</label>
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Your Issue</label>
            <textarea
              name="issue"
              value={form.issue}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
              required
              rows={2}
            />
          </div>
          {formError && <p className="text-red-500 mb-2">{formError}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition"
          >
            Submit & Get OTP
          </button>
        </form>
      )}

      {/* OTP Verification Form */}
      {showOtpForm && (
        <form
          className="mt-6 p-6 border rounded-lg bg-white shadow max-w-md mx-auto"
          onSubmit={handleOtpVerify}
        >
          <h2 className="text-lg font-bold text-green-800 mb-4">Enter OTP</h2>
          <div className="mb-3">
            <label className="block font-medium mb-1">OTP</label>
            <input
              type="text"
              value={enteredOtp}
              onChange={handleOtpChange}
              className="w-full border rounded px-3 py-2"
              required
              maxLength={6}
              pattern="\d{6}"
              autoFocus
            />
          </div>
          {otpError && <p className="text-red-500 mb-2">{otpError}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition"
          >
            Verify OTP
          </button>
        </form>
      )}

      {/* Show Proceed button if OTP is verified */}
      {verified && bookingSuccess && (
  <div className="mt-6 p-6 border rounded-lg bg-green-50 shadow max-w-md mx-auto text-center">
    <h2 className="text-lg font-bold text-green-800 mb-2">OTP Verified!</h2>
    <button
      onClick={() => router.push('/book-appointment')}
      className="bg-green-600 text-white py-2 px-6 rounded font-bold hover:bg-green-700 transition"
    >
      Proceed
    </button>
  </div>
)}
    </div>
  );
}