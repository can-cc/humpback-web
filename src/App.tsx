import React from 'react';
import './App.css';
import { RootRouter } from './Router/RootRouter';
import { AppHeader } from './Component/AppHeader/AppHeader';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <RootRouter />
    </div>
  );
}

export default App;
