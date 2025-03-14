import {config} from "../config";
import httpService from "./http.service";
const urlResource = config.urlResourcePacientes;


async function Buscar(Nombre, Apellido, disponible, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { nombre:Nombre, apellido:Apellido, disponible:disponible, pagina:Pagina },
  });
  return resp.data;
}


async function BuscarPorId(pacientes) {
  const resp = await httpService.get(urlResource + "/" + pacientes.IdPaciente);
  return resp.data;
}


async function ActivarDesactivar(pacientes) {
  await httpService.delete(urlResource + "/" + pacientes.IdPaciente);
}


async function Grabar(paciente) {
  if (paciente.IdPaciente === 0) {
    paciente.IdPaciente = null;
    await httpService.post(urlResource, paciente);
  } else {
    await httpService.put(urlResource + "/" + paciente.IdPaciente, paciente);
  }
}


export const pacientesService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
