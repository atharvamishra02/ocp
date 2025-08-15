'use client';
import { useState } from 'react';

export default function AddDoctorPage() {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    imageUrl: '',
    mode: 'online',
    experience: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/doctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Doctor added successfully!');
      setFormData({ name: '', specialization: '', imageUrl: '', mode: 'online', experience: '' });
    } else {
      alert('Failed to add doctor');
    }
  };

  return (
    <div className="container mx-auto max-w-md py-8">
      <h1 className="text-2xl font-bold mb-4">Add New Doctor</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-4 rounded">
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <select
          name="mode"
          value={formData.mode}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          value={formData.experience}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
}
