const express = require('express');
const router = express.Router();
const db = require('../models');
const asyncWrap = require('../middleware/asyncWrap');

router.get('/lesson', asyncWrap(async (req, res, next) => {
    const { lectureId } = req.query;
    const lecture = await db.lessons.findOne({ where: {
        id: lectureId,
        }
    });
    if (!lecture)
        return res.status(404).json({success: false, message: 'No lesson found'});
    else {
        res.status(200).send({success: true, lecture: lecture.lecture});
    }
}));

router.post('/lesson', asyncWrap(async (req, res) => {
    const { lecture, section_id } = req.body;
    if (!lecture) {
        res.status(400).send({
            status: false,
            message: 'Field is require!'
        });
    } else {
        let result;
        try {
            result = await db.lessons.create({
                lecture,
                sectionId: section_id,
            })

            res.status(201).send({success: true});
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }
}));

router.get('/get-all-lessons', asyncWrap(async (req, res) => {
    const allLessons = await db.chapters.findAll({
        attributes: [
            'id',
            'title',
        ],
        include: [
            {
                model: db.sections,
                attributes: [
                    'id',
                    'title',
                ],
                include: [
                    {
                        model: db.lessons,
                        attributes: [
                            'id',
                            'lecture',
                        ]
                    }
                ]
            }
        ]
    });
    if (!allLessons)
        return res.status(404).json({success: false, message: 'No lesson found'});
    else {
        res.status(200).send({ success: true, allLessons });
    }
}));


module.exports = router;
