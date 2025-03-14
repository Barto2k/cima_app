import {config} from "../config";
import httpService from "./http.service";
const urlResource = config.urlResourceProfesionales;


async function Buscar(Nombre, Apellido, Activo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { nombre:Nombre, apellido:Apellido, activo:Activo, pagina:Pagina },
  });
  return resp.data;
}


async function BuscarPorId(profesional) {
  const resp = await httpService.get(urlResource + "/" + profesional.IdProfesional);
  return resp.data;
}


async function ActivarDesactivar(profesional) {
  await httpService.delete(urlResource + "/" + profesional.IdProfesional);
}


async function Grabar(profesional) {
  if (profesional.IdProfesional === 0) {
    profesional.IdProfesional = null;
    await httpService.post(urlResource, profesional);
  } else {
    await httpService.put(urlResource + "/" + profesional.IdProfesional, profesional);
  }
}


export const profesionalesService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
