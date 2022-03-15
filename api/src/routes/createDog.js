const { conn } = require("../db");

/* 
[ ] Un formulario controlado con JavaScript con los siguientes campos:
Nombre
Altura (Diferenciar entre altura mínima y máxima)
Peso (Diferenciar entre peso mínimo y máximo)
Años de vida
[ ] Posibilidad de seleccionar/agregar uno o más temperamentos
[ ] Botón/Opción para crear una nueva raza de perro
*/
exports.createDog = async (req, res) => {
  const {
    name,
    alturaMin,
    alturaMax,
    pesoMin,
    pesoMax,
    lifeSpan,
    temperamento,
  } = req.body;
  const imagenes = ['imagenMuestra1', 'imagenMuestra2', 'imagenMuestra3']

  const { Dog } = conn.models;
  try {
    const dog = await Dog.create({
      name,
      height: `${alturaMin} - ${alturaMax}`,
      weightMin: pesoMin,
      weightMax: pesoMax,
      lifeSpan,
      image: imagenes[Math.floor(Math.random() * imagenes.length)],
      created: true
    });
    await dog.addTemperaments(temperamento);
    res.json(dog)
  } catch (error) {
    res.status(500).send("algo malio sal");
  }
};
