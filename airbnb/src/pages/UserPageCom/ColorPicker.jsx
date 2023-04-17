import React, { useState, useRef, useEffect } from 'react';
import { SketchPicker } from 'react-color';

export default function ColorPicker() {
  const [colors, setColors] = useState([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef(null);

  function handleColorChange(color) {
    setColors((prevColors) => [...prevColors, color.hex]);
  }

  function handleColorRemove(colorIndex) {
    setColors((prevColors) => prevColors.filter((_, i) => i !== colorIndex));
  }

  function handlePickerToggle() {
    setIsPickerOpen((prevState) => !prevState);
  }

  function handleOutsideClick(event) {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setIsPickerOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <h2>Colors</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{ backgroundColor: colors[0], height: 40, cursor: 'pointer' }}
          className='border rounded-full w-full'
          onClick={handlePickerToggle}
        />
        {isPickerOpen && (
          <div style={{ position: 'absolute', zIndex: 1 }} ref={pickerRef}>
            <SketchPicker onChangeComplete={handleColorChange} />
            <button onClick={handlePickerToggle}>Save</button>
          </div>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {colors.slice(1).map((color, i) => (
            <div
              key={i}
              style={{
                backgroundColor: color,
                width: 20,
                height: 20,
                marginRight: 5,
                marginBottom: 5,
                borderRadius: 2,
                cursor: 'pointer',
              }}
              onClick={() => handleColorRemove(i + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}