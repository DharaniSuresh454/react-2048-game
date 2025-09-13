import React from 'react';
import '../styles/GameHeader.css';

const GameHeader = ({ score, bestScore, onNewGame }) => {
  return (
    <div className="game-header">
      <div className="header-top">
        <h1 className="game-title">2048</h1>
        <button className="new-game-button" onClick={onNewGame}>
          New Game
        </button>
      </div>
      
      <div className="header-subtitle">
        Join the numbers and get to the <strong>2048 tile!</strong>
      </div>
      
      <div className="score-container">
        <div className="score-box">
          <div className="score-label">Score</div>
          <div className="score-value">{score.toLocaleString()}</div>
        </div>
        
        <div className="score-box">
          <div className="score-label">Best</div>
          <div className="score-value">{bestScore.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;