const urlServidor = import.meta.env.VITE_URL_SERVIDOR;
const urlResourcePacientes = urlServidor + "/api/pacientes";
const urlResourceProfesionales = urlServidor + "/api/profesionales";

export const config = {
    urlServidor,
    urlResourcePacientes,
    urlResourceProfesionales
    };