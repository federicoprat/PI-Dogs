const { getDogById } = require("../controllers/getDogById");
const { conn } = require("../db");

exports.dogById = async (req, res) => {
  const { id } = req.params;

  try {
    const info = await getDogById(id);
    const infoNecesaria = info.map((elemento) => {
      // array con los perros de la api
      const { name, image, weight, temperament, height, life_span } = elemento;
      return {
        name,
        image: image.url,
        height: height.metric,
        weight: weight.metric,
        temperament,
        life_span,
      };
    });
    const { Dog, Temperament } = conn.models;
    if (id.length === 36) {
      const infoDB = await Dog.findAll({
        where: {dbID: id},
        include: { model: Temperament, attributes: ["name"] },
      });
      const infoFormateada = infoDB.map(elemento => {
        return {
          name: elemento.name,
          height: elemento.height,
          weight: `${elemento.weightMin} - ${elemento.weightMax}`,
          life_span: elemento.lifeSpan,
          temperament: elemento.Temperaments.map(elemento => elemento.name),
          image: `http://localhost:3001/dogimage?name=${elemento.image}`
          
        }
      })
      const infoTotal = [...infoNecesaria, ...infoFormateada]; // ambos arrays juntos en un solo array
      return res.json(infoTotal);
    }
    const infoTotal = [...infoNecesaria]
    return res.json(infoTotal);
  } catch (error) {
    res.status(500).send("algo salio mal", error);
  }
};
