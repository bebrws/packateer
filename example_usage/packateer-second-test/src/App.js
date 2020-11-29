// import React from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
    <div id="initial" tabIndex="0">initial</div>
    <div id="First" tabIndex="0">First</div>
    <div id="Second" tabIndex="0">Second</div>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hey, this is a test.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </>
  );
}

export default App;
