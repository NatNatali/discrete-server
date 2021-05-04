const express = require('express');
const router = express.Router();
const db = require('../models');
const asyncWrap = require('../middleware/asyncWrap');

router.post('/add-visit', asyncWrap(async (req, res) => {
    const currentCount = await db.config.findOne({ where: {
            id: 1,
        }
    });

    try {
        const incrementResult = await currentCount.increment('visit_count', { by: 1 })

        res.status(201).send({ success: true, result: incrementResult });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}));

router.get('/get-statistics', asyncWrap(async (req, res, next) => {
    const usersCount = await db.users.findAll();
    const visits = await db.config.findAll();
    const visitCount = visits[0]?.dataValues?.visit_count;
    const lessonsCount = await db.lessons.findAll();
    if (!usersCount || !visitCount || !lessonsCount) {
        return res.status(404).json({ success: false, message: 'Some of statistics are missing' });
    }
    else {
        res.status(200).send({ success: true, statistics: {
                users: usersCount.length,
                visits: visitCount,
                lessons: lessonsCount.length,
            }
        });
    }
}));

module.exports = router;