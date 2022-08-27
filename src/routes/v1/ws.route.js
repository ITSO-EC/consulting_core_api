const express = require('express');
const fs = require('fs')
const router = express.Router();
const { sendMessage } = require('../../services/ws.service');
const auth = require('../../middlewares/auth');
const { getUserByToken } = require('../../services/auth.service');
const { createSession } = require('../../services/ws.service');

router
    .route('/qr/:number')
    .get((req, res) => {
        const { number } = req.params;
        const routeQR = `./src/files/${number}.svg`;
        fs.stat(routeQR, function (err, stats) {
            res.writeHead(200, { 'content-type': 'image/svg+xml' });
            if (err) {
                fs.createReadStream('./src/files/qr-code.svg').pipe(res);
                return console.error(err);
            }
            fs.createReadStream(routeQR).pipe(res);
        });

    });


router
    .route('/actions/sendto/:to')
    .get((req, res) => {
        const { to } = req.params;
        sendMessage(to, 'Hola');
        res.send({ message: 'Mensaje enviado' })
    })



module.exports = router;
