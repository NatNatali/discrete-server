const express = require('express');
const router = express.Router();
const db = require('../models');
const asyncWrap = require('../middleware/asyncWrap');

router.post('/create-comment', asyncWrap(async (req, res) => {
    const { comment, chapterId, number } = req.body;
        if (!comment) {
        res.status(400).send({
            message: 'Field is required!',
            status: false
        });
    } else {
        let result;
        try {
            result = await db.comments.create({
                content: comment,
                chapterId,
                userId: number,
            })
            res.status(201).send({ success: true });
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }
}));

router.get('/get-comments', asyncWrap(async (req, res, next) => {
    const { chapterId } = req.query;
    const comments = await db.comments.findAll({
        where: {
            chapterId,
        },
        attributes: [
            'content',
        ],
        include: [
            {
                model: db.users,
                attributes: [
                    'id',
                    'first_name',
                    'last_name',
                ],
            }
        ]
    });
    if (!comments)
        return res.status(404).json({ success: false, message: 'No comment found' });
    else {
        res.status(200).send({ success: true, comments });
    }
}));

module.exports = router;