import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import MainContent from './components/Layout/MainContent';
import Player from './components/Player/Player';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="app-container">
          <Sidebar />
          <div className="main-container">
            <Header />
            <MainContent />
          </div>
        </div>
        <Player />
      </div>
    </Provider>
  );
}

export default App;