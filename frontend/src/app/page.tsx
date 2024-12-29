'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    symptoms: '',
    diet: '',
    sleepHours: '',
    exercise: '',
  });

  const [testData, setTestData] = useState<null | any>(null); // To store test API response
  const [testError, setTestError] = useState<string | null>(null); // To store test API error

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:10000/api/logs', {
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

  // Test API handler
  const testApi = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test`); // Test endpoint
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const result = await response.json();
      setTestData(result); // Store the response from the backend
      setTestError(null); // Clear any previous error
    } catch (error: any) {
      console.error('Test API Error:', error);
      setTestError(error.message);
      setTestData(null);
    }
  };

  return (
    <main style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
        <h1 style={{ fontSize: '3rem', padding: '1rem' }}>IBSense AI</h1>
      </div>

      {/* Form for logging data */}
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

      {/* Button to test API connection */}
      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={testApi}
          style={{
            padding: '0.5rem',
            border: 'none',
            backgroundColor: '#28a745',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Test Backend API
        </button>
      </div>

      {/* Display API Test Results */}
      <div style={{ marginTop: '1rem' }}>
        {testData && <p>Response: {JSON.stringify(testData)}</p>}
        {testError && <p style={{ color: 'red' }}>Error: {testError}</p>}
      </div>
    </main>
  );
}
