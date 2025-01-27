import React, { useState } from 'react';
import './Diet.css';

function Diet() {
  // State to manage meals
  const [meals, setMeals] = useState({
    breakfast: { name: '', calories: 0, notes: '' },
    lunch: { name: '', calories: 0, notes: '' },
    dinner: { name: '', calories: 0, notes: '' },
  });

  // Reusable meal input component
  const MealInput = ({ meal, type }) => (
    <div className="meal-card">
      <h3 className="meal-title">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
      <div className="form-group">
        <label htmlFor={`${type}-name`} className="form-label">
          Meal Name
        </label>
        <input
          id={`${type}-name`}
          type="text"
          value={meal.name}
          onChange={(e) =>
            setMeals((prevMeals) => ({
              ...prevMeals,
              [type]: { ...meal, name: e.target.value },
            }))
          }
          className="form-input"
          placeholder="Enter meal name"
        />
      </div>
      <div className="form-group">
        <label htmlFor={`${type}-calories`} className="form-label">
          Calories
        </label>
        <input
          id={`${type}-calories`}
          type="number"
          value={meal.calories}
          onChange={(e) =>
            setMeals((prevMeals) => ({
              ...prevMeals,
              [type]: { ...meal, calories: Number(e.target.value) },
            }))
          }
          className="form-input"
          placeholder="Enter calories"
        />
      </div>
      <div className="form-group">
        <label htmlFor={`${type}-notes`} className="form-label">
          Notes
        </label>
        <textarea
          id={`${type}-notes`}
          value={meal.notes}
          onChange={(e) =>
            setMeals((prevMeals) => ({
              ...prevMeals,
              [type]: { ...meal, notes: e.target.value },
            }))
          }
          className="form-input"
          placeholder="Add notes about your meal"
        />
      </div>
    </div>
  );

  // Calculate total calories
  const totalCalories = Object.values(meals).reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="diet-tracker">
      <h2 className="title">Diet Tracking</h2>
      <div className="meal-container">
        <MealInput meal={meals.breakfast} type="breakfast" />
        <MealInput meal={meals.lunch} type="lunch" />
        <MealInput meal={meals.dinner} type="dinner" />
      </div>
      <div className="summary">
        <h3 className="summary-title">Daily Summary</h3>
        <p>Total Calories: {totalCalories}</p>
      </div>
    </div>
  );
}

export default Diet;
