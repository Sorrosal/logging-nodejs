const { createLogger, format, transports } = require("winston");

const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'warn',
            filename: './logs/logsWarnings.log'
        }),
        new transports.File({
            level: 'error',
            filename: './logs/logsErrors.log'
        }),
        new transports.MongoDB({
            db: process.env.MONGODB_URI,
            collection: 'logs'
        }),
        new transports.File({
            level: 'info',
            filename: './logs/logsInfo.log'
        }),
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.metadata(),
        format.prettyPrint()
    )
});

module.exports = logger;