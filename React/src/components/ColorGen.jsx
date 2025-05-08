import React, { useState } from 'react';

function ColorGenerator() {
  const [color, setColor] = useState("#FFFFFF");
  const [isLocked, setIsLocked] = useState(false);

  const generateRandomColor = () => {
    if (isLocked) return;
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColor(randomColor);
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Случайный цвет</h2>
      <div style={{
        width: '200px',
        height: '200px',
        backgroundColor: color,
        margin: '20px auto',
        border: '1px solid #000'
      }}></div>
      <p>HEX: {color}</p>
      <div>
        <button onClick={generateRandomColor} style={{ marginRight: '10px' }}>
          Сгенерировать
        </button>
        <button onClick={() => setIsLocked(!isLocked)}>
          {isLocked ? 'Разблокировать' : 'Заблокировать'}
        </button>
      </div>
    </div>
  );
}

export default ColorGenerator;