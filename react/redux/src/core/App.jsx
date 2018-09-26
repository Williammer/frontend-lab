import React from 'react';
import { Router, Redirect } from '@reach/router';
import CssBaseline from '@material-ui/core/CssBaseline';

import routes from './routes';
import DrawerBar from './drawerBar/DrawerBar';
import JankDetectClockWithTip from './jankDetectClock/JankDetectClockWithTip';
import ResizableCodeViewer from './codeViewer/ResizableCodeViewer';
import './App.css';
import rawEpic from '!!raw-loader!./codeViewer/ResizableCodeViewer'; // eslint-disable-line import/no-webpack-loader-syntax

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <DrawerBar />
      <JankDetectClockWithTip />
      <div className="App-main">
        <ResizableCodeViewer
          collapse={false}
          size={{ height: '100vh', width: 700 }}
          enable={{ right: true }}
          code={rawEpic}
        />
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
