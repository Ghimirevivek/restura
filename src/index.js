import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import StateContext from './context/StateProvider';
import Reducer from './context/Reducer';
import { initialState } from './context/initialState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <StateContext initialState={initialState} reducer={Reducer}>
      <App />
    </StateContext>
  </BrowserRouter>
);
