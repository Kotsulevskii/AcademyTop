import React, { useState, useEffect, useRef } from 'react';

function DynamicForm() {
    const [fields, setFields] = useState([{ id: 1, value: '' }]);
  
    const addField = () => setFields([...fields, { id: Date.now(), value: '' }]);
    const removeField = (id) => setFields(fields.filter(f => f.id !== id));
    const updateField = (id, value) => setFields(
      fields.map(f => f.id === id ? {...f, value} : f)
    );
  
    return (
      <form>
        {fields.map(field => (
          <div key={field.id}>
            <input 
              value={field.value}
              onChange={(e) => updateField(field.id, e.target.value)}
            />
            <button type="button" onClick={() => removeField(field.id)}>
              Удалить
            </button>
          </div>
        ))}
        <button type="button" onClick={addField}>Добавить поле</button>
      </form>
    );
  }

export default DynamicForm;