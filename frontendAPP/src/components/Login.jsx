import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const cleanForm = () => {
    console.log("Limpiando formulario..."); // Depuración
    setUsuario("");
    setClave("");
  };

  const handleIngresar = async () => {
    try {
      await AuthService.login(usuario, clave, () => {
        onLogin(true); // Llama a onLogin para actualizar el estado isLoggedIn
        navigate("/home"); // Redirige al usuario a /home
      });
      cleanForm(); // Limpia el formulario después de un login exitoso
    } catch (error) {
      console.error("Error en la autenticación:", error);
      alert("Error en la autenticación. Intente nuevamente.");
    }
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
      <div className="flex flex-row gap-3 pb-4">
        <div>
          <FontAwesomeIcon icon={faRightFromBracket} size="3x" color="#7f7f7f" />
        </div>
        <h1 className="text-3xl font-bold text-black my-auto">CIMA</h1>
      </div>
      <form className="flex flex-col">
        <div className="pb-2">
          <label htmlFor="nombreUsuario" className="block mb-2 text-base font-medium text-[#111827]">Nombre Usuario</label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </span>
            <input
              type="text"
              name="nombreUsuario"
              id="nombreUsuario"
              onChange={(e) => setUsuario(e.target.value)}
              value={usuario} // Vincula el valor al estado
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
              placeholder="Tu nombre de usuario..."
              autoComplete="off"
            />
          </div>
        </div>
        <div className="pb-6">
          <label htmlFor="contraseña" className="block mb-2 text-base font-medium text-[#111827]">Contraseña</label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M12 8v8"></path>
                <path d="m8.5 14 7-4"></path>
                <path d="m8.5 10 7 4"></path>
              </svg>
            </span>
            <input
              type="password"
              name="contraseña"
              id="contraseña"
              onChange={(e) => setClave(e.target.value)}
              value={clave} // Vincula el valor al estado
              placeholder="••••••••••"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-hidden focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
              autoComplete="nueva-contraseña"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleIngresar} // Solo llama a handleIngresar
          className="w-full text-[#FFFFFF] bg-[#7f7f7f] focus:ring-4 focus:outline-hidden focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6 hover:-translate-y-0.5 
                      hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
        >
          Login
        </button>
        <div className="text-sm text-[#6B7280]">
          Powered By <i>Marco Figueroa</i> © 2024
        </div>
      </form>
    </div>
  );
}