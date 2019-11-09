const multer = require('multer');
const path = require('path');
const criptografia = require('crypto')

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'temp'),
    storage: multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, path.resolve(__dirname, '..', '..', 'temp'))
        },
        filename: (req, file, cb) => {

            criptografia.randomBytes(16, (err, hash) =>{
                if(err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            })
        }
    }),
}