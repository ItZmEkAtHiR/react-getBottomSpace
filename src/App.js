import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './style.scss';
const App = () => {
  const [spaceAvailable, setSpaceAvailable] = useState(true);
  const country = [
    { value: 'india', label: 'india' },
    { value: 'china', label: 'china' },
    { value: 'china', label: 'china' },
    { value: 'china', label: 'china' },
    { value: 'china', label: 'china' },
    { value: 'china', label: 'china' },
    // { value: 'china', label: 'china' },
    // { value: 'china', label: 'china' },
  ];
  let margin = 0;

  useEffect(() => {
    // Check if there is enough space at the bottom of the viewport
    const checkSpace = () => {
      const element = document.querySelector('.select');
      const elementRect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const optionHeight = element.offsetHeight || 0;
      const spaceAtBottom = viewportHeight - elementRect.bottom;
      console.log({ spaceAtBottom });
      console.log(optionHeight * country.length);
      margin = optionHeight * country.length;
      if (spaceAtBottom < margin) {
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
  const ddStyles = {
    control: (styles) => ({
      ...styles,
      cursor: 'pointer',
      // margin: spaceAvailable ? '0' : `-${margin}px`,
    }),
  };
  return (
    <div className="select-container">
      {/* <select className={`select ${!spaceAvailable && 'upsideDown'}`}>
        <option value="india">India</option>
        <option value="china">China</option>
        <option value="usa">USA</option>
      </select> */}
      <div className={`select ${!spaceAvailable && 'upsideDown'}`}>
        <Select
          options={country}
          menuPlacement={!spaceAvailable ? 'top' : 'bottom'}
        />
      </div>
    </div>
  );
};

export default App;
