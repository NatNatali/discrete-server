const express = require('express');
const router = express.Router();
const db = require('../models');
const asyncWrap = require('../middleware/asyncWrap');

router.get('/get-sections', asyncWrap(async (req, res, next) => {
    const { chapter_id } = req.query;
    const sections = await db.sections.findAll({
        where: {
            chapterId: chapter_id,
        }
    });
    if (!sections)
        return res.status(404).json({ success: false, message: 'No Section found' });
    else {
        const sectionsResponse = sections?.map((section) => {
            return {
                id: section.id,
                title: section.title,
            };
        })
        res.status(200).send({ success: true, sections: sectionsResponse });
    }
}));

router.post('/create-section', asyncWrap(async (req, res) => {
    const { section, id } = req.body;
    if (!section) {
        res.status(400).send({
            status: false,
            message: 'Field is required!'
        });
    } else {
        let result;
        try {
            result = await db.sections.create({
                title: section,
                chapterId: id,
            })
            res.status(201).send({success: true});
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }
}));

module.exports = router;