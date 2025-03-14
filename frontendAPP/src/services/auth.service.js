import httpService from "./http.service";
import { config } from "../config";
import modalService from "./modalDialog.service";

const updatePassword = async (usuario, nuevaClave) => {
  try {
    const response = await httpService.put(`${config.urlServidor}/api/update-password`, {
      usuario,
      nuevaClave,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    throw error;
  }
};

const login = async (usuario, clave, navigateToComponent) => {
  try {
    let resp = await httpService.post(config.urlServidor + "/api/login", {
      usuario,
      clave,
    });

    if (resp.data?.accessToken) {
      sessionStorage.setItem("usuarioLogueado", usuario);
      sessionStorage.setItem("accessToken", resp.data.accessToken);
      sessionStorage.setItem("refreshToken", resp.data.refreshToken);
      if (CambioUsuarioLogueado) CambioUsuarioLogueado(usuario);
      navigateToComponent(); // Redirige solo si la autenticación es exitosa
    } else {
      if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);
      window.alert("Usuario o clave incorrectos");
    }
  } catch (error) {
    console.error("Error en la autenticación:", error);
    window.alert("Error en la autenticación. Intente nuevamente.");
  }
};

const logout = () => {
  sessionStorage.removeItem("usuarioLogueado");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);
};

const getUsuarioLogueado = () => {
  return sessionStorage.getItem("usuarioLogueado");
};

let CambioUsuarioLogueado = null;
const subscribeUsuarioLogueado = (x) => (CambioUsuarioLogueado = x);

const AuthService = {
  login,
  logout,
  getUsuarioLogueado,
  subscribeUsuarioLogueado,
  updatePassword,
};

export default AuthService;