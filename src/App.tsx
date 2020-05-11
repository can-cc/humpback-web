import React, { useEffect } from 'react';
import { RootRouter } from './Router/RootRouter';
import { checkSessionRedirectAfterLandIn } from './util/auth';

function App() {
  useEffect(() => {
    checkSessionRedirectAfterLandIn();
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column'
      }}
      className="App"
    >
      <RootRouter />
    </div>
  );
}

export default App;
