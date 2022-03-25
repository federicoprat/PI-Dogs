const path = require("path");

exports.sendImage = (req, res) => {
  const { name } = req.query;
  if (name) {
    return res.sendFile(path.join(__dirname, "../images", `${name}.jpg`));
  }
};
