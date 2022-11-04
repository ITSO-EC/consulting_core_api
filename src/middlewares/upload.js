const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
        // cb(null, path.join(__dirname, '../uploads/'));
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/').reverse()[0])
    }
})
const fileFilter = (req, file, cb) => {
    cb(null, true)
    
    // if (file.mimetype === 'application/pdf' ||
    //     file.mimetype === 'application/pdf' ||
    //     file.mimetype === 'image/jpeg' ||
    //     file.mimetype === 'image/jpg' ||
    //     file.mimetype === 'image/png'
    // ) {
    //     cb(null, true)
    // } else {
    //     cb(null, false)
    //     // return cb(new Error('Invalid upload: fieldname should be test_doc and .csv format '));
    // }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
})
module.exports = upload;