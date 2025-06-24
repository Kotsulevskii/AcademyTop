import React, { useState, useEffect, useRef } from 'react';


function useHover() {
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef(null);
  
    useEffect(() => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseenter', () => setIsHovered(true));
        node.addEventListener('mouseleave', () => setIsHovered(false));
        return () => {
          node.removeEventListener('mouseenter', () => setIsHovered(true));
          node.removeEventListener('mouseleave', () => setIsHovered(false));
        };
      }
    }, []);
  
    return [ref, isHovered];
  }
  
  // Использование:
  function UserHook() {
    const [ref, isHovered] = useHover();
    return (
      <button
        ref={ref}
        style={{ background: isHovered ? 'lightblue' : 'white' }}
      >
        Наведи на меня
      </button>
    );
  }

export default UserHook;