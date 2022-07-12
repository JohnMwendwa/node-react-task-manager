import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { TaskContextProvider } from "./contexts/TaskContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <TaskContextProvider>
           <App />
      </TaskContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);

