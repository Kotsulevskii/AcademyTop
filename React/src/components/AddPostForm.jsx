import React, { useState } from 'react';

function AddPostForm() {
  const [title, setTitle] = useState("");  const [body, setBody] = useState("");  const [loading, setLoading] = useState(false);  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();    setLoading(true);    setError(null);

    // Отправка данных на сервер
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка сервера: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Успешно:", data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Текст поста"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Отправка..." : "Отправить"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );}
export default AddPostForm;