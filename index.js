const server = require("express")();
global.fetch = require('node-fetch');
const schedule = require('node-schedule');

const run = async () => {
    require('dotenv').config();

    await require("./src/models")(server);
    require("./src/utils")(server);
    require("./src/services")(server);
    require("./src/controllers")(server);
    require("./src/middlewares")(server);
    require("./src/routes")(server);

    server.listen(process.env.PORT, () => {
        console.log(`Server starting listening on ${process.env.PORT}`);
    })

    // const run = async () => {
    //     server.services.binance.sell("ETH", 0.004)
    //         .then(console.log)
    //         .catch(console.error);
    // }

    //run();

    //server.controllers.scheduled.job();

    //schedule.scheduleJob('* * * * *', server.controllers.scheduled.job);
}

run();