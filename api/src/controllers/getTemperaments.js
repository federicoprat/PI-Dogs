const { getAllDogs } = require("../controllers/getAllDogs");
const { conn } = require("../db");
const { Temperament } = conn.models;

module.exports = async () => {
  const info = await getAllDogs();
  for (element of info) {               // IMPORTANTE NO USAR FOREACH PORQUE ES SINCRONO, NO ES ASINCRONO
    const { temperament } = element;    // ESO CAUSA QUE TERMINE EL LOOP ANTES DE QUE LA API CONTESTE
    if (temperament) {
      const eachOne = temperament.split(", ");
      for (i in eachOne) {
        await Temperament.findOrCreate({
          where: { name: eachOne[i] },
        });
      }
    }
  }
};
