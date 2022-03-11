const { getAllDogs } = require("../controllers/getAllDogs");
const { conn } = require("../db");
const { Sequelize } = require("sequelize");

exports.dogsHome = async (req, res) => {
  const { name } = req.query;
  try {
    const info = await getAllDogs(name);
    const infoNecesaria = info.map((elemento) => {
      // array con los perros de la api
      const { name, image, weight, temperament, height, life_span, id } = elemento;
      return {
        name,
        image: image ? image.url : elemento.reference_image_id,
        weight: weight.metric,
        temperament,
        height: height.metric,
        lifeSpan: life_span,
        id,
        created:false
      };
    });
    const { Dog, Temperament } = conn.models;
    const infoDB = await Dog.findAll({
      include: [
        {
          model: Temperament,
          attributes: ["name"],
        },
      ],
    });// array con los perros de la DB

    const infoDBFormateada = infoDB.map(({dbID, name, height, weight, lifeSpan, Temperaments, image, created}) => {
      const temperamentsString = Temperaments.map(element => element.name)
      return {
        id: dbID,
        name,
        height,
        weight,
        lifeSpan,
        temperament: temperamentsString.toString().replace(',', ', '),
        image: `http://localhost:3001/dogimage?name=${image}`,
        created
      }
    })
    const infoTotal = [...infoNecesaria, ...infoDBFormateada]; // ambos arrays juntos en un solo array
    res.json(infoTotal);
  } catch (error) {
    res.status(500).send("algo salio mal", error);
  }
};
