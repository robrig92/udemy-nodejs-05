const axios = require('axios');

const getClima = async(lat, lng) => {
    const client = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather?appid=be017b7c98333fd658aaf9eda14214e0&units=metric'
    });

    const response = await client.get(`&lat=${lat}&lon=${lng}`);

    const data = response.data.main;
    const temperatura = data.temp;

    return {
        temperatura
    };
}

module.exports = {
    getClima
}