const { Router } = require("express");
const { dogsHome } = require("./allDogs");
const { createDog } = require("./createDog");
const { dogById } = require("./dogById");
const { temperaments } = require("./getTemperaments");
const {sendImage} = require("./DogImage")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs/:id", dogById);
router.get("/dogs", dogsHome);
router.get("/temperament", temperaments)
router.post("/dog", createDog)
router.get("/dogimage", sendImage)
router.get("/", (req, res) => res.json({data: "cannot GET /"}))
//https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg
module.exports = router;

/* 
Nombre
Imagen
Peso
Temperamento
 */
