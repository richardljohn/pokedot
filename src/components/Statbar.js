import React from 'react';
import '../styles/statbar.css';

const Statbar = ({ statName, statValue }) => {
  const width = `${(statValue / 255) * 100}%`;
  let statColor = '';

  if (statValue >= 0 && statValue <= 50) {
    statColor = 'red';
  } else if (statValue > 50 && statValue <= 95) {
    statColor = 'orange';
  } else if (statValue > 95 && statValue <= 150) {
    statColor = 'green';
  } else {
    statColor = 'teal'; // Or dark green
  }

  return (
    <div className="stat-bar">
      <div className="stat-name">{statName}</div>
      <div className="stat-bar-bg">
        <div className="stat-value-bar" style={{ width, backgroundColor: statColor }}></div>
      </div>
      <div className="stat-value">{statValue}</div>
    </div>
  );
};

export default Statbar;