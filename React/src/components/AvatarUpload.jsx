import React, { useState } from 'react';

function AvatarUpload() {
  // 1. Состояния компонента
  const [file, setFile] = useState(null);       // Хранит выбранный файл
  const [preview, setPreview] = useState(null); // DataURL для превью
  const [loading, setLoading] = useState(false); // Флаг загрузки
  const [error, setError] = useState(null);     // Сообщение об ошибке
  const [response, setResponse] = useState(null); // Ответ сервера

  // 2. Обработчик выбора файла
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // 3. Валидация типа файла
    if (!selectedFile.type.startsWith('image/')) {
      setError('Пожалуйста, выберите изображение (JPEG, PNG)');
      return;
    }

    setFile(selectedFile);
    setError(null);

    // 4. Создание превью через FileReader
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  // 5. Отправка файла на сервер
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError('Файл не выбран');
      return;
    }

    setLoading(true);
    setError(null);

    // 6. Формируем FormData
    const formData = new FormData();
    formData.append('file', file); // 'file' - ключ, ожидаемый сервером

    // 7. Отправка fetch-запроса
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData,
      // Заголовки не нужны - браузер сам установит multipart/form-data
    })
      .then((res) => {
        // 8. Проверка статуса ответа
        if (!res.ok) {
          throw new Error(`Ошибка сервера: ${res.status}`);
        }
        return res.json(); // Парсим JSON
      })
      .then((data) => {
        // 9. Успешная обработка
        setResponse(data);
        console.log('Успешно:', data);
      })
      .catch((err) => {
        // 10. Обработка ошибок
        setError(err.message);
      })
      .finally(() => {
        // 11. Финализация
        setLoading(false);
      });
  };

  // 12. Рендер компонента
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          disabled={loading}
        />
        
        {/* 13. Превью изображения */}
        {preview && (
          <div style={{ margin: '10px 0' }}>
            <img 
              src={preview} 
              alt="Превью" 
              style={{ maxWidth: '200px' }} 
            />
            <p>{file.name}</p>
          </div>
        )}

        <button type="submit" disabled={loading || !file}>
          {loading ? 'Загрузка...' : 'Отправить'}
        </button>
      </form>

      {/* 14. Вывод ошибок */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 15. Вывод ответа сервера */}
      {response && (
        <div style={{ marginTop: '20px' }}>
          <h3>Ответ сервера:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default AvatarUpload;


