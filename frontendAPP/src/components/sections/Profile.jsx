import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";

export default function Profile() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [nuevaClave, setNuevaClave] = useState("");
  const [rol, setRol] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const usuarioLogueado = AuthService.getUsuarioLogueado();
    setUsuario(usuarioLogueado || "");
    setClave("");
    setRol("");
  }, []);

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };
  
  const handleSave = async () => {
    if (!validatePassword(nuevaClave)) {
      alert("La contraseña debe tener al menos 8 caracteres, incluir números y caracteres especiales.");
      return;
    }
  
    try {
      await AuthService.updatePassword(usuario, nuevaClave);
      alert("Contraseña actualizada correctamente");
      setNuevaClave("");
      setEditMode(false);
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      alert("Error al actualizar la contraseña. Intente nuevamente.");
    }
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-black mb-6">Perfil de Usuario</h1>
      <form className="flex flex-col">
        <div className="pb-4">
          <label htmlFor="nombreUsuario" className="block mb-2 text-base font-medium text-[#111827]">Nombre Usuario</label>
          <input
            type="text"
            name="nombreUsuario"
            id="nombreUsuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            disabled={!editMode}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="pb-4">
          <label htmlFor="nuevaClave" className="block mb-2 text-base font-medium text-[#111827]">Nueva Contraseña</label>
          <input
            type="password"
            name="nuevaClave"
            id="nuevaClave"
            value={nuevaClave}
            onChange={(e) => setNuevaClave(e.target.value)}
            disabled={!editMode}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="pb-4">
          <label htmlFor="rol" className="block mb-2 text-base font-medium text-[#111827]">Rol</label>
          <input
            type="text"
            name="rol"
            id="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            disabled={!editMode}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        {editMode ? (
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Editar
          </button>
        )}
      </form>
    </div>
  );
}