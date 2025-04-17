import { useState } from "react";

function SearchList() {
  const [searchTerm, setSearchTerm] = useState("");
  const items = [
    "React",
    "JavaScript",
    "HTML",
    "CSS",
    "TypeScript",
    "Node.js",
    "Python",
  ];

  // Фильтрация элементов по введённому тексту
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Поиск по списку</h1>
      <input
        type="text"
        placeholder="Введите текст..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchList;