require('dotenv').config()
require('winston-mongodb')

const express = require('express');
const app = express();
const expressWinston = require('express-winston');
const { transports, format } = require('winston');
const logger = require('./logger');
const service = require("./services/services");


setInterval(function () {
    console.log("Hola, soy el servicio de heartbeat y me ejecuto cada 5 segundos, aquí checkearia los servicios, guardaría logs en ficheros, base de datos y enviaría notificación por websockets");
    const status = service.checkServices();
    if (status) console.log("Todos servicios están perfectamente");
}, 5000);

const myFormat = format.printf(({ level, meta, timestamp }) => {
    return `${timestamp}${level}:${meta.message}`;
});
app.use('/', require("./routes/api"));

app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}));

app.use(expressWinston.errorLogger({
    transports: [
        new transports.File({
            filename: './logs/logsInternalErrors.log'
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        myFormat
    )
}));

app.listen(3000);