import React, { useState, useCallback, useEffect } from 'react';

const BOARD_SIZE = 4;
const WINNING_TILE = 2048;

const useGameLogic = () => {
  const [board, setBoard] = useState(() => Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0)));
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Add a random tile (2 or 4) to an empty cell
  const addRandomTile = (board) => {
    const emptyCells = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (board[i][j] === 0) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  // Move tiles in a specific direction
  const moveTiles = (board, direction) => {
    const newBoard = board.map(row => [...row]);
    let moved = false;
    let scoreIncrease = 0;

    const slideRow = (row) => {
      const filteredRow = row.filter(val => val !== 0);
      const mergedRow = [];
      let i = 0;

      while (i < filteredRow.length) {
        if (i < filteredRow.length - 1 && filteredRow[i] === filteredRow[i + 1]) {
          const mergedValue = filteredRow[i] * 2;
          mergedRow.push(mergedValue);
          scoreIncrease += mergedValue;
          if (mergedValue === WINNING_TILE) {
            setGameWon(true);
          }
          i += 2;
        } else {
          mergedRow.push(filteredRow[i]);
          i++;
        }
      }

      while (mergedRow.length < BOARD_SIZE) {
        mergedRow.push(0);
      }

      return mergedRow;
    };

    switch (direction) {
      case 'ArrowLeft':
        for (let i = 0; i < BOARD_SIZE; i++) {
          const newRow = slideRow(newBoard[i]);
          if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i])) {
            moved = true;
          }
          newBoard[i] = newRow;
        }
        break;

      case 'ArrowRight':
        for (let i = 0; i < BOARD_SIZE; i++) {
          const newRow = slideRow([...newBoard[i]].reverse()).reverse();
          if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i])) {
            moved = true;
          }
          newBoard[i] = newRow;
        }
        break;

      case 'ArrowUp':
        for (let j = 0; j < BOARD_SIZE; j++) {
          const column = [];
          for (let i = 0; i < BOARD_SIZE; i++) {
            column.push(newBoard[i][j]);
          }
          const newColumn = slideRow(column);
          if (JSON.stringify(newColumn) !== JSON.stringify(column)) {
            moved = true;
          }
          for (let i = 0; i < BOARD_SIZE; i++) {
            newBoard[i][j] = newColumn[i];
          }
        }
        break;

      case 'ArrowDown':
        for (let j = 0; j < BOARD_SIZE; j++) {
          const column = [];
          for (let i = 0; i < BOARD_SIZE; i++) {
            column.push(newBoard[i][j]);
          }
          const newColumn = slideRow([...column].reverse()).reverse();
          if (JSON.stringify(newColumn) !== JSON.stringify(column)) {
            moved = true;
          }
          for (let i = 0; i < BOARD_SIZE; i++) {
            newBoard[i][j] = newColumn[i];
          }
        }
        break;

      default:
        return;
    }

    if (moved) {
      addRandomTile(newBoard);
      setScore(prev => prev + scoreIncrease);
      setBoard(newBoard);

      // Check for game over
      if (isGameOver(newBoard)) {
        setGameOver(true);
      }
    }
  };

  // Check if the game is over
  const isGameOver = (board) => {
    // Check for empty cells
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (board[i][j] === 0) {
          return false;
        }
      }
    }

    // Check for possible merges
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        const current = board[i][j];
        if (
          (i < BOARD_SIZE - 1 && board[i + 1][j] === current) ||
          (j < BOARD_SIZE - 1 && board[i][j + 1] === current)
        ) {
          return false;
        }
      }
    }

    return true;
  };

  // Handle key press
  const handleKeyPress = useCallback((key) => {
    if (gameOver) return;
    
    const validKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (validKeys.includes(key)) {
      moveTiles(board, key);
    }
  }, [board, gameOver]);

  // Initialize board with two random tiles
  useEffect(() => {
    const initialBoard = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
    addRandomTile(initialBoard);
    addRandomTile(initialBoard);
    setBoard(initialBoard);
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    const newBoard = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameWon(false);
    setGameOver(false);
  }, []);

  return {
    board,
    score,
    gameWon,
    gameOver,
    handleKeyPress,
    resetGame
  };
};

export default useGameLogic;