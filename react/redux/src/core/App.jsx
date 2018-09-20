import React from 'react';
import { Router, Redirect } from '@reach/router';

import DrawerBar from './DrawerBar';
import routes from './routes';
import './App.css';

function App() {
  return (
    <div className="App">
      <DrawerBar />
      <div className="App-main">
        <Router>
          <Redirect from="/" to="/frontend-lab" noThrow />
          {routes.map(({ path, component: Comp }) => (
            <Comp key={path} path={path} />
          ))}
        </Router>
      </div>
    </div>
  );
}

export default App;
