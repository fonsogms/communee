const mapBoxUrl = (address) => {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=address&access_token=${process.env.MAPBOX_TOKEN}`;
};
const axios = require("axios");
module.exports.apis = {
  Query: {
    findAddress: async (parent, { address }) => {
      try {
        let url = mapBoxUrl(address);
        const {
          data: { features },
        } = await axios.get(url);

        if (!features) {
          throw new Error("there are no results");
        }
        return features;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
