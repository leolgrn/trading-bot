const server = require("express")();
global.fetch = require('node-fetch');

require('dotenv').config();

require("./src/models")(server);
require("./src/utils")(server);
require("./src/services")(server);
require("./src/controllers")(server);
require("./src/middlewares")(server);
require("./src/routes")(server);

server.listen(process.env.PORT, () => {
    console.log(`Server starting listening on ${process.env.PORT}`);
})

const run = async () => {
    server.services.binance.sell("ETH", 0.004)
        .then(console.log)
        .catch(console.error);
}

//run();

