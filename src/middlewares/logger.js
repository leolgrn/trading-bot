const colors = require('colors');

module.exports = server => {

    const addZero = str => {
        return ('0' + str).slice(-2);
    };

    const getFullDate = () => {
        const date = new Date();
        return (
            '[' +
            date.getFullYear() +
            '/' +
            addZero(date.getMonth()) +
            '/' +
            addZero(date.getDate()) +
            ' - ' +
            addZero(date.getHours()) +
            ':' +
            addZero(date.getMinutes()) +
            ':' +
            addZero(date.getSeconds()) +
            ']'
        );
    };

    return (req, res, next) => {
        if (req.path === '/favicon.ico' || req.path === '/robots.txt') {
            return next();
        }
        console.log(`${getFullDate()}`.green + ' ' + `${req.method}`.blue + ' - ' + `${req.connection.remoteAddress}`.yellow + ' - ' + req.originalUrl);
        next();
    };

};
