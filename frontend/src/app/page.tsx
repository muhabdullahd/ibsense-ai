'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    symptoms: '',
    diet: '',
    sleepHours: '',
    exercise: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Data logged successfully!');
        setFormData({ symptoms: '', diet: '', sleepHours: '', exercise: '' });
      } else {
        alert('Failed to log data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
        <h1 style={{ fontSize: '3rem', padding: '1rem' }}>IBSense AI</h1>
      </div>
      <span style={{ fontSize: '1.5rem', padding: '1rem' }}></span>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Symptoms"
          value={formData.symptoms}
          onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
          style={{ color: 'black', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <input
          type="text"
          placeholder="Diet"
          value={formData.diet}
          onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
          style={{ color: 'black', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <input
          type="number"
          placeholder="Sleep Hours"
          value={formData.sleepHours}
          onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
          style={{ color: 'black', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <input
          type="text"
          placeholder="Exercise"
          value={formData.exercise}
          onChange={(e) => setFormData({ ...formData, exercise: e.target.value })}
          style={{ color: 'black', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button type="submit" style={{ padding: '0.5rem', border: 'none', backgroundColor: '#0070f3', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </main>
  );
}
