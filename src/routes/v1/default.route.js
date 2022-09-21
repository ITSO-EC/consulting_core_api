const express = require('express');
const { pageController } = require('../../controllers');

const router = express.Router();

router
    .route('/file')
    .get(
        (req, res) => {
            res.send('Hello World!');
        }
    );


module.exports = router;
