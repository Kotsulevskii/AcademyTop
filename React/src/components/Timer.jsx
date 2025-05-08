import { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Запуск/остановка таймера
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, [isRunning]);

  // Форматирование времени в "мм:сс"
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h1>Таймер: {formatTime(time)}</h1>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "⏸️ Пауза" : "▶️ Старт"}
      </button>
      <button onClick={() => setTime(0)}>🔄 Сброс</button>
    </div>
  );
}

export default Timer;