import React, { useState, useEffect } from "react";
import modalDialogService from "../../../services/modalDialog.service";
import { pacientesService } from "../../../services/pacientes.service";
import PacientesListado from "./PacientesListado";
import PacientesBuscar from "./PacientesBuscar";
import PacientesRegistro from "./PacientesRegistro";
import RevealOnClick from "../../RevealOnClick";

function Pacientes() {
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
  const [disponible, setdisponible] = useState("");
  const [Pacientes, setPacientes] = useState([]);
  const [Paciente, setPaciente] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  useEffect(() => {
    async function BuscarPacientes() {
      let data = await pacientesService.Buscar(Nombre, Apellido, disponible, Pagina);
      setPacientes(data.Items);
      setRegistrosTotal(data.RegistrosTotal);

      // Generar array de las paginas para mostrar en select del paginador
      const arrPaginas = [];
      for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
        arrPaginas.push(i);
      }
      setPaginas(arrPaginas);
    }
    BuscarPacientes();
  }, [Pagina]);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await pacientesService.Buscar(Nombre, Apellido, disponible, _pagina);
    modalDialogService.BloquearPantalla(false);
    setPacientes(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    // Generar array de las paginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(paciente, accionABMC) {
    const data = await pacientesService.BuscarPorId(paciente);
    console.log("Datos del paciente:", data); // Verifica que los datos sean correctos
    setPaciente(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(paciente) {
    BuscarPorId(paciente, "C");
  }

  function Modificar(paciente) {
    if (!paciente.disponible) {
      alert("No puede modificar un registro Inactivo.");
      return;
    }
    BuscarPorId(paciente, "M");
  }

  async function Agregar() {
    setAccionABMC("A");
    setPaciente({
      IdPaciente: 0,
      Nombre: '',
      Apellido: '',
      FechaNacimiento: '',
      DNI: 0,
      disponible: true,
    });
    alert("preparando el Alta...");
  }

  async function ActivarDesactivar(paciente) {
    const confirmacion = window.confirm(
      "Esta seguro que quiere " +
      (paciente.disponible ? "desactivar" : "activar") +
      " el registro?"
    );
    if (confirmacion) {
      await pacientesService.ActivarDesactivar(paciente);
      await Buscar();
    }
  }

  async function Grabar(paciente) {
    try {
      await pacientesService.Grabar(paciente);
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
    <div className="container mx-auto p-4 m-3">
      <div className="mt-8 tituloPagina flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Mis Pacientes
        </h1>

        <p className="text-gray-400 text-lg mb-8 max-w-lg text-justify">
          Aquí puedes Listar, Editar, Eliminar y Agregar Pacientes
        </p>
      </div>

      {AccionABMC === "L" && (
        <PacientesBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Apellido={Apellido}
          setApellido={setApellido}
          disponible={disponible}
          setdisponible={setdisponible}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {AccionABMC === "L" && Pacientes.length > 0 && (
        <PacientesListado
          Pacientes={Pacientes}
          Consultar={Consultar}
          Modificar={Modificar}
          ActivarDesactivar={ActivarDesactivar}
          Pagina={Pagina}
          RegistrosTotal={RegistrosTotal}
          Paginas={Paginas}
          Buscar={Buscar}
        />
      )}

      {AccionABMC === "L" && Pacientes.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {AccionABMC !== "L" && (
        <PacientesRegistro
          AccionABMC={AccionABMC}
          Paciente={Paciente}
          Grabar={Grabar}
          Volver={Volver}
        />
      )}
    </div>
    </RevealOnClick>
  );
}

export default Pacientes;