import React from 'react';
import { Router, Redirect } from '@reach/router';
import CssBaseline from '@material-ui/core/CssBaseline';

import routes from './routes';
import DrawerBar from './drawerBar/DrawerBar';
import JankDetectClockWithTip from './jankDetectClock/JankDetectClockWithTip';
import MainWithCodeViewer from './codeViewer/MainWithCodeViewer';
import './App.css';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <DrawerBar />
      <JankDetectClockWithTip />
      <div className="App-main">
        <Router>
          <Redirect from="/" to="/frontend-lab" noThrow />
          {routes.map(({ path, component: Comp }) => (
            <MainWithCodeViewer
              collapse={false}
              size={{ height: '100vh', width: 700 }}
              enable={{ right: true }}
              key={path}
              path={path}
              Comp={Comp}
            />
          ))}
        </Router>
      </div>
    </div>
  );
}

export default App;
