// src/components/HMPIGauge.jsx
import React from 'react';

const HMPIGauge = ({ hmpiValue }) => {
  const normalizedValue = Math.min(hmpiValue, 200); 
  const rotation = (normalizedValue / 200) * 180; 

  let pointerColor = '#22c55e'; // Safe (Green)
  if (normalizedValue > 50) {
    pointerColor = '#facc15'; // Moderate (Yellow)
  }
  if (normalizedValue > 100) {
    pointerColor = '#ef4444'; // Unsafe (Red)
  }

  const gaugeContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '20px',
  };

  const halfCircleStyle = {
    width: '180px',
    height: '90px',
    backgroundColor: '#e5e7eb',
    borderRadius: '180px 180px 0 0',
    position: 'relative',
    overflow: 'hidden',
  };

  const innerCircleStyle = {
    width: '150px',
    height: '75px',
    backgroundColor: 'white',
    borderRadius: '150px 150px 0 0',
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1,
  };

  const gaugeTextStyle = {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    top: '30px',
    zIndex: 2,
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: '#333',
  };

  const indicatorStyle = {
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transformOrigin: 'bottom center',
    transform: `translateX(-50%) rotate(${90 + rotation}deg)`, 
    width: '2px',
    height: '65px',
    backgroundColor: pointerColor,
    zIndex: 3,
    transition: 'transform 0.5s ease-in-out',
  };

  return (
    <div style={gaugeContainerStyle}>
      <div style={halfCircleStyle}>
        <div style={innerCircleStyle}></div>
        <div style={{...halfCircleStyle, backgroundColor: '#22c55e', width: '90px', position: 'absolute', left: '0'}}></div>
        <div style={{...halfCircleStyle, backgroundColor: '#facc15', width: '90px', position: 'absolute', left: '50%'}}></div>
        <div style={{...halfCircleStyle, backgroundColor: '#ef4444', width: '45px', position: 'absolute', left: '75%'}}></div>
        <div style={innerCircleStyle}></div> 
        <div style={indicatorStyle}></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '180px', marginTop: '5px' }}>
        <span>Safe</span>
        <span>Unsafe</span>
      </div>
    </div>
  );
};

export default HMPIGauge;