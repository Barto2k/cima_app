import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function PacientesListado({
  Pacientes,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  // Ordenar los pacientes alfabéticamente por nombre
  const pacientesOrdenados = [...Pacientes].sort((a, b) => a.Nombre.localeCompare(b.Nombre));

  return (
    <div className="container mx-auto p-2 mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed bg-white border border-gray-600 rounded-lg shadow-md">
          <thead className="bg-gray-600 text-gray-200 uppercase">
            <tr>
              <th className="w-1/6 px-4 py-2 text-center">Nombre</th>
              <th className="w-1/6 px-4 py-2 text-center">Apellido</th>
              <th className="w-1/6 px-4 py-2 text-center">Fecha Nacimiento</th>
              <th className="w-1/6 px-4 py-2 text-center">DNI</th>
              <th className="w-1/6 px-4 py-2 text-center">Activo</th>
              <th className="w-1/6 px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {pacientesOrdenados &&
              pacientesOrdenados.map((Paciente) => (
                <tr key={Paciente.IdPaciente} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b border-gray-600 text-center ">{Paciente.Nombre}</td>
                  <td className="px-4 py-2 border-b border-gray-600 text-center bg-gray-200">{Paciente.Apellido}</td>
                  <td className="px-4 py-2 border-b border-gray-600 text-center ">{moment(Paciente.FechaNacimiento).format("DD/MM/YYYY")}</td>
                  <td className="px-4 py-2 border-b border-gray-600 text-center bg-gray-200">{Paciente.DNI}</td>
                  <td className="px-4 py-2 border-b border-gray-600 text-center ">
                    <span className={`px-2 py-1 rounded-full text-white ${Paciente.disponible ? 'bg-green-500' : 'bg-red-500'}`}>
                      {Paciente.disponible ? "SI" : "NO"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b text-center bg-gray-200">
                    <button
                      className="px-2 py-1 mx-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
                      title="Consultar"
                      onClick={() => Consultar(Paciente)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      className="px-2 py-1 mx-1 text-yellow-500 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-white"
                      title="Modificar"
                      onClick={() => Modificar(Paciente)}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button
                      className={`px-2 py-1 mx-1 border rounded ${Paciente.disponible ? 'text-red-500 border-red-500 hover:bg-red-500 hover:text-white' : 'text-green-500 border-green-500 hover:bg-green-500 hover:text-white'}`}
                      title={Paciente.disponible ? "Desactivar" : "Activar"}
                      onClick={() => ActivarDesactivar(Paciente)}
                    >
                      <FontAwesomeIcon icon={Paciente.disponible ? faTimes : faCheck} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Paginador */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-gray-700">Registros: {RegistrosTotal}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-gray-700">Página:</span>
          <select
            value={Pagina}
            onChange={(e) => Buscar(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            {Paginas?.map((x) => (
              <option value={x} key={x}>
                {x}
              </option>
            ))}
          </select>
          <span className="ml-2 text-gray-700">de {Paginas?.length}</span>
        </div>
      </div>
    </div>
  );
}