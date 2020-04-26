const express = require("require");
const router = express.Router(); //const axios = require("axios");
const mapBoxUrl = (address) => {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/oderberger.json?types=${address}&access_token=${process.env.MAPBOX_TOKEN}`;
};
router.post("/extApi", (req, res) => {
  const { address } = req.body;
  const call = mapBoxUrl(address);
  axios.post(call);
});

module.exports = router;
