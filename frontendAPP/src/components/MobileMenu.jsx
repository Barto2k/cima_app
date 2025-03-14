import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export const MobileMenu = ({ menuOpen, setMenuOpen, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout button clicked");
    AuthService.logout(); // Llama al servicio de logout
    setMenuOpen(false); // Cierra el menú
    onLogout(); // Actualiza el estado isLoggedIn en App
    navigate("/login"); // Redirige a la ruta "/login"
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-[rgba(10,10,10,0.8)] z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out
            ${
              menuOpen
                ? "h-screen opacity-100 pointer-events-auto"
                : "h-0 opacity-0 pointer-events-none"
            }`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 text-white text-3xl focus:outline-none cursor-pointer"
        aria-label="Close menu"
      >
        &times;
      </button>
      <div className="md:flex items-center space-x-8 p-4">
        <Link
          to="/home"
          onClick={() => setMenuOpen(false)}
          className={`text-2xl font-semibold text-white my-4 transform transition-transform duration-300
                                    ${
                                      menuOpen
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-5"
                                    }`}
        >
          Home
        </Link>
      </div>

      <div className="md:flex items-center space-x-8 p-4">
        <Link
          to="/pacientes"
          onClick={() => setMenuOpen(false)}
          className={`text-2xl font-semibold text-white my-4 transform transition-transform duration-300
                                    ${
                                      menuOpen
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-5"
                                    }`}
        >
          Pacientes
        </Link>
      </div>

      <div className="md:flex items-center space-x-8 p-4">
        <Link
          to="/profesionales"
          onClick={() => setMenuOpen(false)}
          className={`text-2xl font-semibold text-white my-4 transform transition-transform duration-300
                                    ${
                                      menuOpen
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-5"
                                    }`}
        >
          Profesionales
        </Link>
      </div>

      <div className="md:flex items-center space-x-8 p-4">
        <Link
          to="/profile"
          onClick={() => setMenuOpen(false)}
          className={`text-2xl font-semibold text-white my-4 transform transition-transform duration-300
                                    ${
                                      menuOpen
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-5"
                                    }`}
        >
          Profile
        </Link>
      </div>
      <div className="md:flex items-center space-x-8 p-4">
        <button
          onClick={handleLogout}
          className={`text-2xl font-semibold text-white my-4 transform transition-transform duration-300
                                    ${
                                      menuOpen
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-5"
                                    }`}
        >
          Logout
        </button>
      </div>
    </div>
  );
};