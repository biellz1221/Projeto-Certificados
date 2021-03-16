const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, "..", "uploads"),
    storage: multer.diskStorage({
        destination: function(req, file, cd) {
            cd(null, path.resolve(__dirname, "..", "uploads"));
        },
        filename: function(req, file, cd) {
            crypto.randomBytes(16, function(err, hash) {
                if (err) cd(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cd(null, fileName);
            });
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: function(req, file, cd) {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cd(null, true);
        } else {
            cd(new Error("Tipo do Arquivo Inválido!"));
        };
    }
};