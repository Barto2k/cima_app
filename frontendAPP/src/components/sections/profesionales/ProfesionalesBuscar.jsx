import React from "react";

export default function ProfesionalesBuscar({
    Nombre,
    setNombre,
    Apellido,
    setApellido,
    Activo,
    setActivo,
    Buscar,
    Agregar
}) {
    // Función para limpiar los filtros
    const limpiarFiltros = () => {
        setNombre("");
        setApellido("");
        setActivo("");
    };

    // Función para manejar la búsqueda
    const handleBuscar = () => {
        limpiarFiltros(); // Limpia los filtros
        Buscar(1); // Ejecuta la búsqueda
    };

    return (
        <form name="FormBusqueda" className="space-y-4">
            <div className="container mx-auto p-4 bg-white shadow-md rounded-lg border border-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Campo Nombre */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <label className="w-full md:w-1/4 text-gray-700" htmlFor="Nombre">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-2xl shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e) => setNombre(e.target.value)}
                            value={Nombre}
                            maxLength="60"
                            autoFocus
                        />
                    </div>

                    {/* Campo Apellido */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <label className="w-full md:w-1/4 text-gray-700" htmlFor="Apellido">
                            Apellido:
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-2xl shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e) => setApellido(e.target.value)}
                            value={Apellido}
                            maxLength="60"
                        />
                    </div>

                    {/* Campo Activo */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <label className="w-full md:w-1/4 text-gray-700" htmlFor="Activo">
                            Activo:
                        </label>
                        <select
                            className="w-full px-4 py-2 border rounded-2xl shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e) => setActivo(e.target.value)}
                            value={Activo}
                        >
                            <option value={""}></option>
                            <option value={false}>NO</option>
                            <option value={true}>SI</option>
                        </select>
                    </div>
                </div>

                <hr className="my-4" />

                {/* Botones */}
                <div className="flex justify-center space-x-4">
                    <button
                        type="button"
                        className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium hover:-translate-y-0.5 
                        hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-900 hover:text-white transition-all duration-200"
                        onClick={handleBuscar}
                    >
                        <i className="fa fa-search"></i> Buscar
                    </button>
                    <button
                        type="button"
                        className="border border-green-500/50 text-green-500 py-3 px-6 rounded font-medium hover:-translate-y-0.5 
                        hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-green-600 hover:text-white transition-all duration-200"
                        onClick={() => Agregar()}
                    >
                        <i className="fa fa-plus"></i> Agregar
                    </button>
                </div>
            </div>
        </form>
    );
}