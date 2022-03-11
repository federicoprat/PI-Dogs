const { CONFIG } = require("./configuration");
const axios = require("axios");
const API_KEY = "146e850c-31e1-4a41-9f72-38fd5433bc57";

exports.getAllDogs = async (search = "") => {
  try {
    const searchTerm = search ? `/search?q=${search}&` : "?";
    const fullUrl = CONFIG.URL + searchTerm + `api_key=${API_KEY}`;
    console.log(fullUrl);
    const { data } = await axios.get(fullUrl);
    return data;
  } catch (error) {
    return console.log("algo salio mal", error);
  }
}; //var objs = s.map(JSON.parse);

//   https://api.thedogapi.com/v1/breeds/search?q={raza_perro}
//   https://api.thedogapi.com/v1/breeds
//   https://api.thedogapi.com/v1/breeds?api_key=146e850c-31e1-4a41-9f72-38fd5433bc57&limit=8&page=0
