const express = require('express');
const { pageController } = require('../../controllers');

const router = express.Router();

router
    .route('/uploads/:filename')
    .get(
        (req, res) => {

            const fileName = req.params.filename;
            const path = `./${fileName}`;
            res.sendFile(require('path').join(__dirname, '../../../uploads/' + path));
            // res.sendFile(path, { root: __dirname + '../uploads/' });
        }
    );

// router
//     .route('/search/:data')
//     .get(
//         (req, res) => {
//             const fileName = req.params.data;
           
//         }
//     );

module.exports = router;
