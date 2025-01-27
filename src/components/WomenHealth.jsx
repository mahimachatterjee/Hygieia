import React, { useState } from 'react';
import { Calendar as CalendarIcon, Crop as Drop } from 'lucide-react';

interface CycleDay {
  date: string;
  flow: 'light' | 'medium' | 'heavy' | null;
  symptoms: string[];
}

export default function WomensHealth() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [cycleData, setCycleData] = useState<Record<string, CycleDay>>({});
  const [symptoms, setSymptoms] = useState<string>('');

  const flowOptions: { value: 'light' | 'medium' | 'heavy'; label: string; className: string }[] = [
    { value: 'light', label: 'Light', className: 'flow-light' },
    { value: 'medium', label: 'Medium', className: 'flow-medium' },
    { value: 'heavy', label: 'Heavy', className: 'flow-heavy' },
  ];

  const updateCycleData = (flow: 'light' | 'medium' | 'heavy' | null) => {
    setCycleData((prev) => ({
      ...prev,
      [selectedDate]: {
        date: selectedDate,
        flow,
        symptoms: symptoms.split(',').map((s) => s.trim()).filter(Boolean),
      },
    }));
  };

  const generateCalendarDays = () => {
    const days = [];
    const currentDate = new Date();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Add empty cells for days before the first day of the month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-day empty">
          <span></span>
        </div>
      );
    }

    // Add the days of the month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
      const dateString = date.toISOString().split('T')[0];
      const dayData = cycleData[dateString];

      days.push(
        <div
          key={d}
          onClick={() => setSelectedDate(dateString)}
          className={`calendar-day ${selectedDate === dateString ? 'selected' : ''} ${
            dayData?.flow ? flowOptions.find(f => f.value === dayData.flow)?.className : ''
          }`}
        >
          <span>{d}</span>
          {dayData?.flow && <Drop className="flow-icon" />}
        </div>
      );
    }

    return days;
  };

  return (
    <div>
      <h2 className="card-title">Women's Health Tracking</h2>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <CalendarIcon className="text-primary" />
            <h3>Menstrual Calendar</h3>
          </div>
          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="calendar-header">{day}</div>
            ))}
            {generateCalendarDays()}
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Track Your Cycle</h3>
          <div className="form-group">
            <label className="form-label">Selected Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Flow Intensity</label>
            <div className="flow-buttons">
              {flowOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateCycleData(option.value)}
                  className={`flow-btn ${option.className}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Symptoms</label>
            <input
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="form-input"
              placeholder="Enter symptoms (comma-separated)"
            />
          </div>

          {cycleData[selectedDate] && (
            <div className="summary-card">
              <h4 className="summary-title">Data for {selectedDate}</h4>
              <p className="summary-text">
                Flow: {cycleData[selectedDate].flow || 'Not recorded'}
              </p>
              <p className="summary-text">
                Symptoms: {cycleData[selectedDate].symptoms.join(', ') || 'None recorded'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}