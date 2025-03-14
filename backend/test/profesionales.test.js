const request = require("supertest");
const app = require("../index.js");

const profesionalAlta = {
    Nombre: "profesional " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
    Apellido: "Apellido " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
    Activo: true
};

const profesionalModificacion = {
    Nombre: "profesional modificado",
    Apellido: "Apellido " + (() => (Math.random() + 1).toString(10).substring(2))(), // Genera un nombre aleatorio
    Activo: false
};

// test route/profesionales GET
describe("GET /api/profesionales", () => {
    it("Deberia devolver todos los profesionales paginados", async () => {
        const res = await request(app).get("/api/profesionales?Pagina=1");
        expect(res.statusCode).toEqual(200);

        expect(res.body).toEqual(
            expect.objectContaining({
                Items: expect.arrayContaining([
                    expect.objectContaining({
                        IdProfesional: expect.any(Number),
                        Nombre: expect.any(String),
                        Apellido: expect.any(String),
                        Activo: expect.any(Boolean), // Cambiado a minúsculas
                    }),
                ]),
                RegistrosTotal: expect.any(Number),
            })
        );
    });
});

// test route/profesionales GET
describe("GET /api/profesionales con filtros", () => {
    it("Deberia devolver los profesionales según filtro ", async () => {
        const res = await request(app).get("/api/profesionales?Nombre=Sofia&Pagina=1");
        expect(res.statusCode).toEqual(200);

        expect(verificarPropiedades(res.body.Items)).toEqual(false);

        function verificarPropiedades(array) {
            for (let i = 0; i < array.length; i++) {
                if (!array[i].Nombre.includes("Sofia")) {
                    return false;
                }
            }
            return true;
        }

    });
});

// test route/profesionales/:id GET
describe("GET /api/profesionales/:id", () => {
    it("Deberia devolver el artículo con el id 1", async () => {
        const res = await request(app).get("/api/profesionales/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdProfesional: expect.any(Number),
                Nombre: expect.any(String),
                Apellido: expect.any(String),
                Activo: expect.any(Boolean), // Cambiado a minúsculas
            })
        );
    });
});

// test route/profesionales POST
describe("POST /api/profesionales", () => {
    it("Deberia devolver el articulo que acabo de crear", async () => {
        console.log("Datos enviados en POST:", profesionalAlta); // Agregar registro de consola
        const res = await request(app).post("/api/profesionales").send(profesionalAlta);
        console.log("Respuesta de POST:", res.body); // Agregar registro de consola
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdProfesional: expect.any(Number),
                Nombre: expect.any(String),
                Apellido: expect.any(String),
                Activo: expect.any(Boolean), // Cambiado a minúsculas
            })
        );
    }, 20000);
});

// test route/profesionales/:id PUT
describe("PUT /api/profesionales/:id", () => {
    it("Deberia devolver el articulo con el id 1 modificado", async () => {
        const res = await request(app)
            .put("/api/profesionales/1")
            .send(profesionalModificacion);
        expect(res.statusCode).toEqual(200);
    }, 20000);
});

// test route/profesionales/:id DELETE
describe("DELETE /api/profesionales/:id", () => {
    it("Debería devolver el profesionales con el id 1 borrado", async () => {
        const res = await request(app).delete("/api/profesionales/1");
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