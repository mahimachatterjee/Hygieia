import React, { useState } from 'react';
import './Vitals.css';

export default function Vitals() {
  const defaultVitals = {
    bloodPressure: '120/80',
    heartRate: 75,
    oxygenLevel: 98,
    stressLevel: 3,
  };

  const [vitals, setVitals] = useState(defaultVitals);

  const handleReset = () => setVitals(defaultVitals);

  const validateBloodPressure = (value) => {
    const regex = /^\d{2,3}\/\d{2,3}$/; // Matches '120/80' format
    return regex.test(value);
  };

  const handleInputChange = (key, value) => {
    setVitals((prev) => ({
      ...prev,
      [key]: key === 'bloodPressure' && typeof value === 'string' && !validateBloodPressure(value)
        ? prev.bloodPressure // Keeps old value if input is invalid
        : value,
    }));
  };

  return (
    <div>
      <h2 className="card-title">Vitals Tracking</h2>

      <div className="grid grid-4">
        {/* Blood Pressure */}
        <div className="card">
          <div className="card-header">
            <h3>Blood Pressure</h3>
          </div>
          <div className="form-group">
            <input
              type="text"
              value={vitals.bloodPressure}
              onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
              className="form-input"
              placeholder="120/80"
            />
            <p className="summary-text">
              Last reading: {vitals.bloodPressure} mmHg
            </p>
          </div>
        </div>

        {/* Heart Rate */}
        <div className="card">
          <div className="card-header">
            <h3>Heart Rate</h3>
          </div>
          <div className="form-group">
            <input
              type="number"
              min="40"
              max="200"
              value={vitals.heartRate}
              onChange={(e) => handleInputChange('heartRate', Number(e.target.value))}
              className="form-input"
              placeholder="75"
            />
            <p className="summary-text">
              Current: {vitals.heartRate} BPM
            </p>
          </div>
        </div>

        {/* Oxygen Level */}
        <div className="card">
          <div className="card-header">
            <h3>Oxygen Level</h3>
          </div>
          <div className="form-group">
            <input
              type="number"
              min="80"
              max="100"
              value={vitals.oxygenLevel}
              onChange={(e) => handleInputChange('oxygenLevel', Number(e.target.value))}
              className="form-input"
              placeholder="98"
            />
            <p className="summary-text">
              SpO2: {vitals.oxygenLevel}%
            </p>
          </div>
        </div>

        {/* Stress Level */}
        <div className="card">
          <div className="card-header">
            <h3>Stress Level</h3>
          </div>
          <div className="form-group">
            <input
              type="range"
              min="1"
              max="10"
              value={vitals.stressLevel}
              onChange={(e) => handleInputChange('stressLevel', Number(e.target.value))}
              className="form-input"
            />
            <p className="summary-text">
              Level: {vitals.stressLevel}/10
            </p>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset to Default
        </button>
      </div>
    </div>
  );
}
