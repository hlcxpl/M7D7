const request = require("supertest");
const server = require("../index");


describe("Operaciones CRUD de cafes Pregunta 1", () => {
    it("Obteniendo un 200", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200);
    });
    it("Obteniendo el tipo de dato recibido es un arreglo con por lo menos 1 objeto " , async () => {
        const { body: cafes } = await request(server).get("/cafes").send();
        expect(cafes).toBeInstanceOf(Array)
        expect(cafes).not.toBeNull() 
        expect(cafes[0]).toBeInstanceOf(Object)
    });
  
});

describe("Operaciones CRUD de cafes Pregunta 2", () => {
    it("Comprobando que se obtiene un código 404 al intentar eliminar un café con un id que no existe", async () => {
        const jwt = "token";
        const idDeCafeAEliminar = 5
        const response = await request(server)
            .delete(`/cafes/${idDeCafeAEliminar}`)
            .set("Authorization", jwt)
            .send();
        const status = response.statusCode;
        expect(status).toBe(404);
    })
})

describe("Operaciones CRUD de cafes Pregunta 3", () => {
    it("Probando que la ruta POST /cafes agrega un nuevo café ", async () => {
        const id = 8
        const cafe = { id, nombre: "Nuevo Cafe" };
        const { body: cafes } = await request(server)
            .post("/cafes")
            .send(cafe);
        expect(cafes).toContainEqual(cafe);
    });
    it("Probando envio de codigo 201", async () => {
        const id = 6
        const cafe = { id, nombre: "Nuevo Cafe" };
        const response = await request(server).post("/cafes").send(cafe);
        const status = response.statusCode;
        expect(status).toBe(201);
    })
})

describe("Operaciones CRUD de cafes Pregunta 4", () => {
    it(" Pruebando que la ruta PUT /cafes devuelve un status code 400 al actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
        const idParametro = 4
        const cafe = { id: "3", nombre: "Actualizado" };
        const response = await request(server).put(`/cafes/${idParametro}`).send(cafe);
        const status = response.statusCode;
        expect(status).toBe(400);
    })

})

