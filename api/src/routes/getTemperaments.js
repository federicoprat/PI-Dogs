const getTemperaments = require("../controllers/getTemperaments");
const { conn } = require("../db");
const { Temperament } = conn.models;

exports.temperaments = async (req, res) => {
  try {
    await getTemperaments();
  } catch (error) {
    res.status(500).send("something gone wrong", error);
  }
  const temperamentsDB = await Temperament.findAll();
  return res.json(temperamentsDB);
};
