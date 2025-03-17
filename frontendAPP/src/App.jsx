import './App.css';
import { LoadingScreen } from './components/LoadingScreen';
import { MobileMenu } from './components/MobileMenu';
import { Sidebar } from './components/Sidebar';
import "./index.css";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './components/sections/Home';
import Pacientes from './components/sections/pacientes/Pacientes';
import Profesionales from './components/sections/profesionales/Profesionales';
import Login from './components/Login'; // Importa el componente Login
import Profile from './components/sections/Profile';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está logueado

  return (
    <Router basename="/">
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div className={`flex flex-row items-center justify-center min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} bg-white text-black-100`}>
        {/* Renderiza el Login si el usuario no está logueado */}
        {!isLoggedIn ? (
          <Routes>
            <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          <>
            {/* Sidebar */}
            <div className="hidden md:block w-64">
              <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} onLogout={() => setIsLoggedIn(false)} />
            </div>

            {/* Botón para abrir el menú en móviles */}
            <div className="h-5 absolute top-1 left-1 cursor-pointer z-40 md:hidden">
              <button
                onClick={() => setMenuOpen(true)}
                className="absolute top-6 left-6 text-gray-500 text-3xl focus:outline-none cursor-pointer"
                aria-label="Open menu"
              >
                &#9776;
              </button>
              <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} onLogout={() => setIsLoggedIn(false)} />
            </div>

            {/* Contenido principal */}
            <div className='p-4 transition-all duration-300 flex-grow w-full'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/pacientes" element={<Pacientes />} />
                <Route path='/profesionales' element={<Profesionales />} />
                <Route path='/profile' element={<Profile />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;