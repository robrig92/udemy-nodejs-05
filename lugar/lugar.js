const axios = require('axios');

const getLugarLatLng = async(dir) => {
    const encodedUrl = encodeURI(dir);

    const instance = axios.create({
        baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com',
        headers: {
            'x-rapidapi-key': '08f23d3f4amshbbeff6bfe196d91p112d60jsn460e3a411e7c'
        }
    });

    const response = await instance.get(`/latlon.php?location=${encodedUrl}`);

    if (response.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${direccion}`);
    }

    const data = response.data.Results[0];
    const direccion = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        lat,
        lng,
        direccion
    };
}

module.exports = {
    getLugarLatLng
}