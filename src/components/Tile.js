import React from 'react';
import '../styles/Tile.css';

const Tile = ({ value, position }) => {
  // Don't render anything if the tile is empty
  if (!value) {
    return <div className="tile empty" />;
  }

  // Get tile class based on value for styling
  const getTileClass = (val) => {
    const baseClass = 'tile';
    const valueClass = `tile-${val}`;
    return `${baseClass} ${valueClass}`;
  };

  return (
    <div className={getTileClass(value)}>
      <span className="tile-value">{value}</span>
    </div>
  );
};

export default Tile;