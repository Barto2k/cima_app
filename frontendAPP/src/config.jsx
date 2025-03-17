const urlServidor = process.env.BACKEND_URL;
const urlResourcePacientes = urlServidor + "/api/pacientes";
const urlResourceProfesionales = urlServidor + "/api/profesionales";

export const config = {
    urlServidor,
    urlResourcePacientes,
    urlResourceProfesionales
    };