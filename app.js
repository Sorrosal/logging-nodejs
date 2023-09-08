require('dotenv').config()
require('winston-mongodb')

const express = require('express');
const app = express();
const expressWinston = require('express-winston');
const { transports, format } = require('winston');
const logger = require('./logger');

app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}));

app.get('/', (req, res) => {
    logger.info('This is an info log')
    res.sendStatus(200)
});

app.get('/nombres', (req, res) => {
    const nombres = ['Sergio,Hector,Ramon'];
    logger.info('Se ha llamado al endpoint /nombres y ha devuelto ' + nombres)
    res.status(200).send({
        "status": "success",
        "nombres": nombres
    });
});

app.get('/400', (req, res) => {
    logger.warn('Log de advertencia')
    res.sendStatus(400)
});

app.get('/500', (req, res) => {
    logger.error('Log de error')
    res.sendStatus(500)
});

app.get('/error', (req, res) => {
    throw new Error("Error personalizado")
});

const myFormat = format.printf(({ level, meta, timestamp }) => {
    return `${timestamp}${level}:${meta.message}`;
});

app.use(expressWinston.errorLogger({
    transports: [
        new transports.File({
            filename: 'logsInternalErrors.log'
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        myFormat

    )

}))

app.listen(3000);