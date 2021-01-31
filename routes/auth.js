const express = require('express');
const router = express.Router();
const db = require('../models');
const asyncWrap = require('../middleware/asyncWrap');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/sign-in', asyncWrap(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await db.users.findOne({ where: { email } });
    if (!user)
        return res.status(404).json({ success: false, message: 'No user found' });

    const passwordIsValid = await bcrypt.compareSync(password, user.password);

    if (!passwordIsValid)
        return res.status(401).send({ success: false, token: null });

    const token = jwt.sign({ id: user._id }, 'somesecretvalue', {
        expiresIn: 86400, // expires in 24 hours
    });

    res.status(200).send({ success: true, token, type: user.type });
}));

module.exports = router;