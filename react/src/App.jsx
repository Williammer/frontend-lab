import React from 'react';
// import StopWatch from './components/StopWatch';
// import NameForm from './components/NameForm';
import DataFetchList from './components/DataFetchList';
import logo from './logo.svg'
import './App.css';

function App() {
    return (
        <div className="App">
            <div className="App-header">
                <img
                  src={logo}
                  className="App-logo"
                  alt="logo"
                />
            </div>

            /*<StopWatch />
            <br/>
            <br/>
            <NameForm />*/

            <DataFetchList />
        </div>
    );
}

export default App;
