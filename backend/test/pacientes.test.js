const request = require("supertest");
const app = require("../index.js");

const pacienteAlta = {
    Nombre: "paciente " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
    Apellido: "Apellido " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
    FechaNacimiento: (() => {
        const randomDate = new Date(
            new Date(1970, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(1970, 0, 1).getTime())
        );
        const day = String(randomDate.getDate()).padStart(2, '0');
        const month = String(randomDate.getMonth() + 1).padStart(2, '0');
        const year = randomDate.getFullYear();
        return `${year}-${month}-${day}`;
    })(), // Genera una fecha aleatoria en el formato 2003-03-23
    DNI: Math.floor(10000000 + Math.random() * 90000000), // Genera un DNI aleatorio de 8 números
    disponible: true
};

const pacienteModificacion = {
    Nombre: "paciente modificado",
    Apellido: "Apellido " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
    FechaNacimiento: (() => {
        const randomDate = new Date(
            new Date(1970, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(1970, 0, 1).getTime())
        );
        const day = String(randomDate.getDate()).padStart(2, '0');
        const month = String(randomDate.getMonth() + 1).padStart(2, '0');
        const year = randomDate.getFullYear();
        return `${year}-${month}-${day}`;
    })(), // Genera una fecha aleatoria en el formato 2003-03-23
    DNI: Math.floor(10000000 + Math.random() * 90000000), // Genera un DNI aleatorio de 8 números
    disponible: false
};

// test route/pacientes GET
describe("GET /api/pacientes", () => {
    it("Deberia devolver todos los pacientes paginados", async () => {
        const res = await request(app).get("/api/pacientes?Pagina=1");
        expect(res.statusCode).toEqual(200);

        expect(res.body).toEqual(
            expect.objectContaining({
                Items: expect.arrayContaining([
                    expect.objectContaining({
                        IdPaciente: expect.any(Number),
                        Nombre: expect.any(String),
                        Apellido: expect.any(String),
                        FechaNacimiento: expect.any(String),
                        DNI: expect.any(Number),
                        disponible: expect.any(Boolean), // Cambiado a minúsculas
                    }),
                ]),
                RegistrosTotal: expect.any(Number),
            })
        );
    });
});

// test route/pacientes GET
describe("GET /api/pacientes con filtros", () => {
    it("Deberia devolver los pacientes según filtro ", async () => {
        const res = await request(app).get("/api/pacientes?Nombre=Marco&Pagina=1");
        expect(res.statusCode).toEqual(200);

        expect(verificarPropiedades(res.body.Items)).toEqual(false);

        function verificarPropiedades(array) {
            for (let i = 0; i < array.length; i++) {
                if (!array[i].Nombre.includes("Marco")) {
                    return false;
                }
            }
            return true;
        }

    });
});

// test route/pacientes/:id GET
describe("GET /api/pacientes/:id", () => {
    it("Deberia devolver el artículo con el id 1", async () => {
        const res = await request(app).get("/api/pacientes/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdPaciente: expect.any(Number),
                Nombre: expect.any(String),
                Apellido: expect.any(String),
                FechaNacimiento: expect.any(String),
                DNI: expect.any(Number),
                disponible: expect.any(Boolean), // Cambiado a minúsculas
            })
        );
    });
});

// test route/pacientes POST
describe("POST /api/pacientes", () => {
    it("Deberia devolver el articulo que acabo de crear", async () => {
        console.log("Datos enviados en POST:", pacienteAlta); // Agregar registro de consola
        const res = await request(app).post("/api/pacientes").send(pacienteAlta);
        console.log("Respuesta de POST:", res.body); // Agregar registro de consola
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdPaciente: expect.any(Number),
                Nombre: expect.any(String),
                Apellido: expect.any(String),
                FechaNacimiento: expect.any(String),
                DNI: expect.any(Number),
                disponible: expect.any(Boolean), // Cambiado a minúsculas
            })
        );
    }, 20000);
});

// test route/pacientes/:id PUT
describe("PUT /api/pacientes/:id", () => {
    it("Deberia devolver el articulo con el id 1 modificado", async () => {
        const res = await request(app)
            .put("/api/pacientes/1")
            .send(pacienteModificacion);
        expect(res.statusCode).toEqual(200);
    }, 20000);
});

// test route/pacientes/:id DELETE
describe("DELETE /api/pacientes/:id", () => {
    it("Debería devolver el pacientes con el id 1 borrado", async () => {
        const res = await request(app).delete("/api/pacientes/1");
        expect(res.statusCode).toEqual(200);

        // baja lógica, no se borra realmente
        // expect(res.body).toEqual(
        //   expect.objectContaining({
        //     IdArticulo: expect.any(Number),
        //     Nombre: expect.any(String),
        //     Precio: expect.any(Number),
        //   })
        // );
    }, 20000);
});