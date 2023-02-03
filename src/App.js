import React, { useState, useEffect } from 'react';
import './style.css';
const App = () => {
  const [spaceAvailable, setSpaceAvailable] = useState(true);

  useEffect(() => {
    // Check if there is enough space at the bottom of the viewport
    const checkSpace = () => {
      const element = document.querySelector('.select-container');
      const elementRect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const optionElement = document.querySelector('option');
      const optionHeight = optionElement.offsetHeight;
      const spaceAtBottom = viewportHeight - elementRect.bottom;

      if (spaceAtBottom < optionHeight) {
        setSpaceAvailable(false);
      } else {
        setSpaceAvailable(true);
      }
    };

    // Call the function on component mount and window resize
    checkSpace();
    window.addEventListener('resize', checkSpace);

    // Remove the event listener on component unmount
    return () => window.removeEventListener('resize', checkSpace);
  }, []);

  return (
    <div className="select-container">
      <select className={`select ${!spaceAvailable && 'upsideDown'}`}>
        <option value="india">India</option>
        <option value="china">China</option>
        <option value="usa">USA</option>
      </select>
    </div>
  );
};

export default App;
