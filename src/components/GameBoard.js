import React from 'react';
import Tile from './Tile';
import '../styles/GameBoard.css';

const GameBoard = ({ board, onKeyPress }) => {
  // Handle keyboard events
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      onKeyPress(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress]);

  return (
    <div className="game-board" tabIndex={0}>
      <div className="board-grid">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              position={{ row: rowIndex, col: colIndex }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;

