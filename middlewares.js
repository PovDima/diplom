const path = require('path');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const config = require('./utils/config')

module.exports = [
    bodyParser.json({
        limit: 1024 * 1024,
        verify: (req, res, buf) => {
            try {
                JSON.parse(buf);
            } catch (e) {
                res.send({
                    status: 0,
                    error: {
                        code: 'BROKEN_JSON',
                        message: 'Please, verify your json'
                    }
                });
                throw new Error('BROKEN_JSON');
            }
        }
    }),
    bodyParser.urlencoded({ extended: true }),
    cors({
        origin: [
            `https://${config.HOST}`,
            `http://${config.HOST}`,
            `${config.HOST}`
        ],
        methods: ["GET", "POST", "PUT", 'DELETE', 'PATCH'],
        credentials: true
    }),
    passport.initialize()
];
