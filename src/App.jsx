import React, { useState } from 'react'; 
import { Activity, Utensils, Heart, Calendar } from 'lucide-react';
import Vitals from './components/Vitals';
import Diet from './components/Diet';
import Exercise from './components/Exercise';
import WomensHealth from './components/WomensHealth';

function App() {
  const [activeTab, setActiveTab] = useState('vitals'); // Default active tab

  return (
    <div>
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <div className="nav-brand">
              <Heart />
              <span>HealthTrack</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="main container">
        <div className="grid grid-4">
          {/* Vitals Tab Button */}
          <button
            onClick={() => setActiveTab('vitals')}
            className={`card ${activeTab === 'vitals' ? 'btn-primary' : ''}`}
          >
            <Heart />
            <h2>Vitals</h2>
          </button>

          {/* Diet Tab Button */}
          <button
            onClick={() => setActiveTab('diet')}
            className={`card ${activeTab === 'diet' ? 'btn-primary' : ''}`}
          >
            <Utensils />
            <h2>Diet</h2>
          </button>

          {/* Exercise Tab Button */}
          <button
            onClick={() => setActiveTab('exercise')}
            className={`card ${activeTab === 'exercise' ? 'btn-primary' : ''}`}
          >
            <Activity />
            <h2>Exercise</h2>
          </button>

          {/* Women's Health Tab Button */}
          <button
            onClick={() => setActiveTab('womensHealth')}
            className={`card ${activeTab === 'womensHealth' ? 'btn-primary' : ''}`}
          >
            <Calendar />
            <h2>Women's Health</h2>
          </button>
        </div>

        <div className="card" style={{ marginTop: '1.5rem' }}>
          {/* Tab Content Rendering */}
          {activeTab === 'vitals' && <Vitals />}
          {activeTab === 'diet' && <Diet />}
          {activeTab === 'exercise' && <Exercise />}
          {activeTab === 'womensHealth' && <WomensHealth />}
        </div>
      </main>
    </div>
  );
}

export default App;
