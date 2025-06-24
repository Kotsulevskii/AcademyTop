import { useState, useEffect } from "react";

function NasaPhoto() {
    const [photo, setPhoto] = useState(null);
  
    useEffect(() => {
      fetch('https://api.nasa.gov/planetary/apod?api_key=z7BuKZQOjq8farGlbdZGIKfRNUz4gZBDHpxr2ZIH')
        .then(res => res.json())
        .then(data => setPhoto(data))
        .catch(() => alert('Ошибка загрузки фото'));
    }, []);
  
    return (
      <div>
        {photo ? (
          <>
            <h2>{photo.title}</h2>
            <img src={photo.url} alt={photo.title} style={{ maxWidth: '100%' }} />
            <p>{photo.explanation}</p>
          </>
        ) : (
          <p>Загрузка...</p>
        )}
      </div>
    );
  }

  export default NasaPhoto;

