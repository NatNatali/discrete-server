const jwt = require('jsonwebtoken');
const User = require('../models/users');
const asyncWrap = require('./asyncWrap');

module.exports = asyncWrap(async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token)
        return res
            .status(401)
            .send({ success: false, message: 'No token provided.' });

    jwt.verify(token, 'somesecretvalue', async (err, decoded) => {
        if (err)
            return res
                .status(500)
                .send({ success: false, message: 'Failed to authenticate token.' });

        const user = await User.findById(decoded.id, { password: 0 });
        if (!user) {
            return res.status(404).send('No user found.');
        }

        req.user = user;

        next();
    });
});