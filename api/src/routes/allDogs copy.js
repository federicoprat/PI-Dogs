const {
  alfabeticamente,
} = require("../../../client/src/components/Utilidades/alfabeticamente");
const { getAllDogs } = require("../controllers/getAllDogs");
const { conn } = require("../db");

exports.dogsHome = async (req, res) => {
  const { name, ascOrDesc, orderBy } = req.query;
  try {
    const info = await getAllDogs(name);
    const infoNecesaria = info.map((elemento) => {
      // array con los perros de la api
      const { name, image, weight, temperament, height, life_span, id } =
        elemento;
      return {
        name,
        image: image ? image.url : elemento.reference_image_id,
        weightMin: Number(weight.metric.split(" - ")[0]) || 0,
        weightMax: Number(weight.metric.split(" - ")[1]) || 0,
        temperament: temperament || "No Data",
        height: height.metric,
        lifeSpan: life_span || "No Data",
        id,
        created: false,
      };
    });

    let infoDBFormateada;
    const { Dog, Temperament } = conn.models;
    if (name) {
      const infoDB = await Dog.findAll({
        where: {name: name[0].toUpperCase() + name.slice(1).toLowerCase()},
        include: [
          {
            model: Temperament,
            attributes: ["name"],
          },
        ],
      }); // array con los perros de la DB
      infoDBFormateada = infoDB.map(
        ({
          dbID,
          name,
          height,
          weightMin,
          weightMax,
          lifeSpan,
          Temperaments,
          image,
          created,
        }) => {
          const temperamentsString = Temperaments.map(
            (element) => element.name
          );
          return {
            id: dbID,
            name,
            height,
            weightMin,
            weightMax,
            lifeSpan,
            temperament: temperamentsString.toString(),
            image: `http://localhost:3001/dogimage?name=${image}`,
            created,
          };
        }
      );
    } else {
      const infoDB = await Dog.findAll({
        include: [
          {
            model: Temperament,
            attributes: ["name"],
          },
        ],
      }); // array con los perros de la DB
      infoDBFormateada = infoDB.map(
        ({
          dbID,
          name,
          height,
          weightMin,
          weightMax,
          lifeSpan,
          Temperaments,
          image,
          created,
        }) => {
          const temperamentsString = Temperaments.map(
            (element) => element.name
          );
          return {
            id: dbID,
            name,
            height,
            weightMin,
            weightMax,
            lifeSpan,
            temperament: temperamentsString.toString(),
            image: `http://localhost:3001/dogimage?name=${image}`,
            created,
          };
        }
      );
    }

    const infoTotal = [...infoNecesaria, ...infoDBFormateada]; // ambos arrays juntos en un solo array
    
    let infoFiltrada;
    if (orderBy === "name") {
      infoFiltrada = alfabeticamente(infoTotal, ascOrDesc);
    } else if (orderBy === "weight") {
      if (ascOrDesc === "asc")
        infoFiltrada = infoTotal.sort(function (a, b) {
          return a.weightMin + a.weightMax - (b.weightMin + b.weightMax);
        });
      else if (ascOrDesc === "desc")
        infoFiltrada = infoTotal.sort(function (a, b) {
          return b.weightMin + b.weightMax - (a.weightMin + a.weightMax);
        });
    }
    return res.json(infoTotal);
  } catch (error) {
    return res.status(500).send(error);
  }
};
