import React from 'react';
import { RootRouter } from './Router/RootRouter';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
      }}
      className="App"
    >
      <RootRouter />
    </div>
  );
}

export default App;
