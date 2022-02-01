const moment = require("moment");
module.exports = server => {
    return (startDate, endDate) => {
        return [moment(startDate, "DD-MM-YYYY"), moment(endDate, "DD-MM-YYYY" )]
    }
}
