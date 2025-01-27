import React, { useState } from 'react';
import './Exercise.css';

function Exercise() {
  const [exerciseData, setExerciseData] = useState([
    { steps: 8000, calories: 400, date: '2024-03-01' },
    { steps: 10000, calories: 500, date: '2024-03-02' },
    { steps: 6000, calories: 300, date: '2024-03-03' },
    { steps: 12000, calories: 600, date: '2024-03-04' },
    { steps: 7500, calories: 375, date: '2024-03-05' },
  ]);

  const [currentData, setCurrentData] = useState({
    steps: 0,
    calories: 0,
    date: new Date().toISOString().split('T')[0],
  });

  const addExerciseData = () => {
    if (currentData.steps <= 0 || currentData.calories <= 0) {
      alert('Please enter valid steps and calories values');
      return;
    }

    setExerciseData([...exerciseData, currentData]);
    setCurrentData({
      steps: 0,
      calories: 0,
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="exercise-tracker">
      <h2 className="title">Exercise Tracking</h2>

      <div className="grid-container">
        {/* Input Section */}
        <div className="card">
          <h3 className="card-title">Add Today's Exercise</h3>
          <div className="form-group">
            <label className="form-label">Steps</label>
            <input
              type="number"
              min="0"
              value={currentData.steps}
              onChange={(e) =>
                setCurrentData({ ...currentData, steps: Number(e.target.value) })
              }
              className="form-input"
              placeholder="Enter steps"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Calories Burned</label>
            <input
              type="number"
              min="0"
              value={currentData.calories}
              onChange={(e) =>
                setCurrentData({
                  ...currentData,
                  calories: Number(e.target.value),
                })
              }
              className="form-input"
              placeholder="Enter calories"
            />
          </div>
          <button onClick={addExerciseData} className="btn btn-primary">
            Add Exercise Data
          </button>
        </div>

        {/* Graph Section */}
        <div className="card">
          <h3 className="card-title">Progress Graph</h3>
          <div className="graph">
            {exerciseData.map((data, index) => (
              <div key={index} className="graph-bar">
                <div
                  className="graph-bar-fill"
                  style={{ height: `${(data.steps / 15000) * 100}%` }}
                >
                  <span className="graph-value">{data.steps}</span>
                  <span className="graph-tooltip">
                    Calories: {data.calories}
                  </span>
                </div>
                <span className="graph-label">
                  {new Date(data.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="summary-card" style={{ marginTop: '1.5rem' }}>
        <h3 className="summary-title">Weekly Summary</h3>
        <p className="summary-text">
          Average Steps:{' '}
          {Math.round(
            exerciseData.reduce((acc, curr) => acc + curr.steps, 0) /
              exerciseData.length
          )}
        </p>
        <p className="summary-text">
          Total Calories:{' '}
          {exerciseData.reduce((acc, curr) => acc + curr.calories, 0)}
        </p>
      </div>
    </div>
  );
}

export default Exercise;
