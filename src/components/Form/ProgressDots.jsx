import React from 'react';
import './Index.css';

const ProgressDots = ({ currentIndex, totalSteps }) => {
  // Calcular a largura da linha de progresso
  const progressWidth = currentIndex === 0 ? 0 : ((currentIndex / (totalSteps - 1)) * 100);

  return (
    <div className="progress-dots-container">
      <div className="progress-dots">
        <div 
          className="progress-line" 
          style={{ width: `${progressWidth}%` }} 
        />
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className={`dot ${index <= currentIndex ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
};

export default ProgressDots;
