import React, { useState, useEffect } from 'react';

function ClickerGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [targetSize, setTargetSize] = useState(50);

  // Генерация случайной позиции
  const generateRandomPosition = () => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 200;
    setTargetPosition({
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    });
  };

  // Обработка клика по цели
  const handleTargetClick = () => {
    if (!gameActive) return;
    setScore(prev => prev + 1);
    setTargetSize(prev => Math.max(20, prev - 2)); // Уменьшаем цель
    generateRandomPosition();
  };

  // Таймер игры
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  // Старт игры
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setTargetSize(50);
    setGameActive(true);
    generateRandomPosition();
  };

  return (
    <div style={{ textAlign: 'center', height: '100vh' }}>
      <h2>Кликер</h2>
      <div>
        <p>Счёт: {score}</p>
        <p>Время: {timeLeft} сек</p>
        {!gameActive && (
          <button onClick={startGame}>
            {timeLeft === 0 ? 'Играть снова' : 'Начать игру'}
          </button>
        )}
      </div>

      {gameActive && (
        <div
          onClick={handleTargetClick}
          style={{
            position: 'absolute',
            left: `${targetPosition.x}px`,
            top: `${targetPosition.y}px`,
            width: `${targetSize}px`,
            height: `${targetSize}px`,
            backgroundColor: 'red',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        />
      )}

      {timeLeft === 0 && !gameActive && (
        <p style={{ fontSize: '24px', marginTop: '20px' }}>
          Игра окончена! Ваш счёт: {score}
        </p>
      )}
    </div>
  );
}

export default ClickerGame;
