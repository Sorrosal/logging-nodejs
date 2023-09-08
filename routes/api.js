
const { Router } = require('express');
const logger = require('../logger');
const router = Router();


router.get('/', (req, res) => {
    logger.info('LLamada al metodo /')
    res.sendStatus(200)
});

router.get('/nombres', (req, res) => {
    const nombres = ['Sergio,Hector,Ramon'];
    logger.info('Se ha llamado al endpoint /nombres y ha devuelto ' + nombres)
    res.status(200).send({
        "status": "success",
        "nombres": nombres
    });
});

router.get('/400', (req, res) => {
    logger.warn('Log de advertencia')
    res.sendStatus(400)
});

router.get('/500', (req, res) => {
    logger.error('Log de error')
    res.sendStatus(500)
});

router.get('/error', (req, res) => {
    throw new Error("Error personalizado")
});

module.exports = router;