import React, { useState, useEffect } from "react";
import modalDialogService from "../../../services/modalDialog.service";
import { profesionalesService } from "../../../services/profesionales.service";
import ProfesionalesListado from "./ProfesionalesListado";
import ProfesionalesBuscar from "./ProfesionalesBuscar";
import ProfesionalesRegistro from "./ProfesionalesRegistro";
import RevealOnClick from "../../RevealOnClick";

function Profesionales() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Activo, setActivo] = useState("");
  const [Profesionales, setProfesionales] = useState([]);
  const [Profesional, setProfesional] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  useEffect(() => {
    async function BuscarProfesionales() {
      let data = await profesionalesService.Buscar(Nombre, Apellido, Activo, Pagina);
      setProfesionales(data.Items);
      setRegistrosTotal(data.RegistrosTotal);

      // Generar array de las paginas para mostrar en select del paginador
      const arrPaginas = [];
      for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
        arrPaginas.push(i);
      }
      setPaginas(arrPaginas);
    }
    BuscarProfesionales();
  }, [Pagina]);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await profesionalesService.Buscar(Nombre, Apellido, Activo, _pagina);
    modalDialogService.BloquearPantalla(false);
    setProfesionales(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    // Generar array de las paginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(profesional, accionABMC) {
    const data = await profesionalesService.BuscarPorId(profesional);
    console.log("Datos del profesional:", data); // Verifica que los datos sean correctos
    setProfesional(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(profesional) {
    BuscarPorId(profesional, "C");
  }

  function Modificar(profesional) {
    if (!profesional.Activo) {
      alert("No puede modificar un registro Inactivo.");
      return;
    }
    BuscarPorId(profesional, "M");
  }

  async function Agregar() {
    setAccionABMC("A");
    setProfesional({
      IdProfesional: 0,
      Nombre: '',
      Apellido: '',
      Activo: true,
    });
    alert("preparando el Alta...");
  }

  async function ActivarDesactivar(profesional) {
    const confirmacion = window.confirm(
      "Esta seguro que quiere " +
      (profesional.Activo ? "desactivar" : "activar") +
      " el registro?"
    );
    if (confirmacion) {
      await profesionalesService.ActivarDesactivar(profesional);
      await Buscar();
    }
  }

  async function Grabar(profesional) {
    try {
      await profesionalesService.Grabar(profesional);
    } catch (error) {
      alert(error?.response?.data?.message ?? error.toString());
      return;
    }
    await Buscar();
    Volver();

    setTimeout(() => {
      alert(
        "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente."
      );
    }, 0);
  }

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <RevealOnClick>
    <div className="container mx-auto p-4 m-1">
      <div className="mt-8 tituloPagina flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Mis Profesionales
        </h1>

        <p className="text-gray-400 text-lg mb-8 max-w-lg text-justify">
          Aquí puedes Listar, Editar, Eliminar y Agregar Profesionales.
        </p>
      </div>

      {AccionABMC === "L" && (
        <ProfesionalesBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Apellido={Apellido}
          setApellido={setApellido}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {AccionABMC === "L" && Profesionales.length > 0 && (
        <ProfesionalesListado
          Profesionales={Profesionales}
          Consultar={Consultar}
          Modificar={Modificar}
          ActivarDesactivar={ActivarDesactivar}
          Pagina={Pagina}
          RegistrosTotal={RegistrosTotal}
          Paginas={Paginas}
          Buscar={Buscar}
        />
      )}

      {AccionABMC === "L" && Profesionales.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {AccionABMC !== "L" && (
        <ProfesionalesRegistro
          AccionABMC={AccionABMC}
          Profesional={Profesional}
          Grabar={Grabar}
          Volver={Volver}
        />
      )}
    </div>
    </RevealOnClick>
  );
}

export default Profesionales;