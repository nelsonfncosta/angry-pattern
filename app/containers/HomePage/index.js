import React, { useRef, useEffect } from 'react';
import PatternCanvas from '../PatternCanvas/PatternCanvas';

function HomePage() {
  const onSaveClick = () => {};
  return (
    <div className="HomePage">
      <h1>Angry Pattern</h1>
      <PatternCanvas />
      <button type="button" onClick={onSaveClick}>
        Save
      </button>
    </div>
  );
}

export default HomePage;
