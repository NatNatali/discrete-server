const express = require('express');
const router = express.Router();
const db = require('../models');
const asyncWrap = require('../middleware/asyncWrap');

router.get('/get-chapters', asyncWrap(async (req, res, next) => {
    const chapters = await db.chapters.findAll();
    if (!chapters)
        return res.status(404).json({ success: false, message: 'No lesson found' });
    else {
        const chaptersResponse = chapters?.map((chapter) => {
            return {
                id: chapter.id,
                title: chapter.title,
            };
        })
        res.status(200).send({success: true, chapters: chaptersResponse });
    }
}));

router.post('/create-chapter', asyncWrap(async (req, res) => {
    const { chapter } = req.body;
    if (!chapter) {
        res.status(400).send({
            status: false,
            message: 'Field is required!'
        });
    } else {
        let result;
        try {
            result = await db.chapters.create({
                title: chapter,
            })

            res.status(201).send({ success: true });
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }
}));

module.exports = router;