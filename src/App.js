import React, { useState, useEffect } from 'react';
import GameHeader from './components/GameHeader';
import GameBoard from './components/GameBoard';
import useGameLogic from './hooks/useGameLogic';
import './styles/App.css';

function App() {
  const {
    board,
    score,
    gameWon,
    gameOver,
    handleKeyPress,
    resetGame
  } = useGameLogic();

  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('2048-best-score') || '0');
  });

  // Update best score when current score exceeds it
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('2048-best-score', score.toString());
    }
  }, [score, bestScore]);

  const handleNewGame = () => {
    resetGame();
  };

  const handleContinue = () => {
    // Continue playing after winning
    resetGame();
  };

  return (
    <div className="app">
      <GameHeader 
        score={score}
        bestScore={bestScore}
        onNewGame={handleNewGame}
      />
      
      <GameBoard 
        board={board}
        onKeyPress={handleKeyPress}
      />
      
      {/* Game Won Overlay */}
      {gameWon && (
        <div className="game-won-overlay">
          <div className="game-won-text">You Win!</div>
          <div className="game-won-subtext">
            Congratulations! You reached the 2048 tile!
          </div>
          <button className="continue-button" onClick={handleContinue}>
            Continue Playing
          </button>
        </div>
      )}
      
      {/* Game Over Overlay */}
      {gameOver && (
        <div className="game-over-overlay">
          <div className="game-over-text">Game Over!</div>
          <div className="game-over-subtext">
            No more moves available. Try again!
          </div>
          <button className="continue-button" onClick={handleNewGame}>
            New Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;