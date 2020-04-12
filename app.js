const argv = require('yargs')
    .options({
        direccion: {
            alias: 'd',
            demmand: true,
            desc: 'Dirección de la ciudad a obtener el clima '
        }
    })
    .argv;
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const getInfo = (dir) => {
    return new Promise((resolve, reject) => {
        lugar.getLugarLatLng(dir)
            .then((coords) => {
                clima.getClima(coords.lat, coords.lng)
                    .then((temperatura) => {
                        resolve(`El clima de ${coords.direccion} es ${temperatura.temperatura}`);
                    })
                    .catch((error) => {
                        reject(`No fue posible obtener el clima`);
                    });
            })
            .catch((error) => reject(error));
    })
}

const getInfoAsync = async(direccion) => {
    try {
        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClima(coords.lat, coords.lng);

        return `El clima de ${coords.direccion} es ${temp.temperatura}`;
    } catch (error) {
        return `No fue posible obtener el clima de ${direccion}`;
    }
}

getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log);

getInfoAsync(argv.direccion)
    .then(console.log)
    .catch(console.log);