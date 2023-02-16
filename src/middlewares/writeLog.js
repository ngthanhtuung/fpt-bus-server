const morgan = require('morgan')
const path = require('path');
const rfs = require('rotating-file-stream');
const moment = require('moment-timezone');
require('dotenv').config();

const generatorFileDate = () => {
    const fileDate = moment.tz(moment(), "Asia/Ho_Chi_Minh").format('DD-MM-YYYY');
    return fileDate + '.log'
}
morgan.token('date', () => {
    return generateDateByFormat('DD/MM/YYYY, hh:mm:ss a');
}); //customize token :date

const generateDateByFormat = (formatDate) => {
    return moment.tz("Asia/Ho_Chi_Minh").format(formatDate);
}

var accessLogStream = rfs.createStream(generatorFileDate, {
    interval: '1d', // rotate daily
    path: path.join('src', `logger/${process.env.NODE_ENV || 'production'}`)
})

const writeLog = () => {
    return morgan(':method :url :status :response-time ms - :res[content-length] :date', { stream: accessLogStream })
}

module.exports = writeLog;
