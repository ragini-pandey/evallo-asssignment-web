import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './Home/Home';
import Content from './Content/Content';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-content' element={<Content />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
