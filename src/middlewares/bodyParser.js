const bodyParser = require('body-parser');

module.exports = server => {

    server
        .use(bodyParser.urlencoded({
            limit: '500mb',
            extended: true
        }))
        .use(bodyParser.json({
                limit: '500mb',
                extended: true
            })
        );

    return (req, res, next) => next();
};
