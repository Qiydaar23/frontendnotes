import Header from './components/Header';
import './App.css';
import NoteListPage from './components/pages/NoteListPage';
import Notepage from './components/pages/Notepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);


  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <BrowserRouter>
      <div className={isDarkMode ? 'container dark' : 'container light'}>
        <div className='app'>
          <Header />
          <button onClick={toggleTheme} className="toggle-btn">
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
          <Routes>
            <Route path='/' exact element={<NoteListPage />} />
            <Route path='/note/:id' element={<Notepage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
