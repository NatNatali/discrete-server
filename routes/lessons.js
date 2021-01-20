const express = require('express');
const router = express.Router();
const db = require('../models');
const asyncWrap = require('../middleware/asyncWrap');
const bcrypt = require('bcryptjs');

router.post('/lesson', asyncWrap(async (req, res) => {
    const { lecture } = req.body;
    if (lecture) {
        res.status(400).send({
            status: false,
            message: 'Field is require!'
        });
    } else {
        await db.lessons.create({
            lecture,
        }).then(() => {
            res.status(201).send({ success: true });
        }).catch((error) => {
            res.status(400).send(error);
        });
    }
}))

module.exports = router;
