// require('dotenv').config();
const app = require('./app');

async function main() { //metodo asincrono
 await app.listen(4000)
 console.log('server on port 4000')
}
// require('./database');



main();
