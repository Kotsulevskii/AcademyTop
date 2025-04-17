import { useState, useRef } from "react";

function DragAndDropList() {
  const [items, setItems] = useState(["🍎 Яблоко", "🍌 Банан", "🍊 Апельсин", "🍓 Клубника"]);
  const dragItem = useRef(null); // Перетаскиваемый элемент
  const dragOverItem = useRef(null); // Элемент, над которым перетаскивают

  // Обработка окончания перетаскивания
  const handleSort = () => {
    const newItems = [...items];
    const draggedItem = newItems.splice(dragItem.current, 1)[0]; // Удаляем перетаскиваемый элемент
    newItems.splice(dragOverItem.current, 0, draggedItem); // Вставляем его на новую позицию
    setItems(newItems);
  };

  return (
    <div>
      <h1>Drag and Drop</h1>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            draggable
            onDragStart={() => (dragItem.current = index)}
            onDragEnter={() => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            style={{
              cursor: "move",
              padding: "10px",
              margin: "5px",
              background: "#f0f0f0",
              listStyleType: "none"
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DragAndDropList;