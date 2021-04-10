const express = require('express');
const router = express.Router();
const db = require('../models');
const asyncWrap = require('../middleware/asyncWrap');


router.get('/get-tests', asyncWrap(async (req, res) => {
    const { sectionId } = req.query;
    const tests = await db.tests.findAll({
        where: {
            sectionId: +sectionId,
        },
        attributes: [
            'id',
        ],
        include: [
            {
                model: db.questions,
                attributes: [
                    'id',
                    'testId',
                    'question',
                ],
                include: [
                    {
                        model: db.answers,
                        attributes: [
                            'id',
                            'questionId',
                            'option',
                        ]
                    }
                ]
            }
        ]
    });
    if (!tests)
        return res.status(404).json({ success: false, message: 'No Test found' });
    else {
        res.status(200).send({ success: true, tests });
    }
}))

router.post('/create-test', asyncWrap(async (req, res) => {
    const { data, sectionId, questionsCount } = req.body;
    if (!data || !sectionId) {
        res.status(400).send({
            status: false,
            message: 'Fields are required!'
        });
    } else {
        let testResult
        let result;
        try {
            for(let i = 0; i < questionsCount; i++) {
                testResult = await db.tests.create({
                    sectionId,
                })
                result = await db.questions.create({
                    testId: testResult.dataValues.id,
                    question: data[`question_${i}`],
                })
                await [1,2,3,4].forEach((_, index) => (
                    db.answers.create({
                        questionId: result.dataValues.id,
                        option: data[`answer_${i}_${index}`],
                        isCorrect: data[`correct_${i}_${index}`],
                    })
                ))
            }
            res.status(201).send({ success: true });
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }
}));

router.post('/submit-test', asyncWrap(async (req, res) => {
    const { answers, sectionId } = req.body;
    const tests = await db.tests.findAll({
        where: {
            sectionId: +sectionId,
        },
        attributes: [
            'id',
        ],
        include: [
            {
                model: db.questions,
                attributes: [
                    'id',
                    'testId',
                    'question',
                ],
                include: [
                    {
                        model: db.answers,
                        attributes: [
                            'id',
                            'questionId',
                            'option',
                            'isCorrect',
                        ]
                    }
                ]
            }
        ]
    });
    const correctAnswers = tests.map(val => val.questions[0].answers.map(answer => answer.dataValues));
    const correctOptions = correctAnswers.map (item => item.find(option => option.isCorrect));
    const rightAnswerIds = Object.values(answers);
    const matchingOptions = correctOptions.map(option => rightAnswerIds.includes(option.id.toString()));
    let correctAnswersCount = matchingOptions.filter(value => !!value).length;
    res.status(200).send({ success: true, data: { correctOptions, correctAnswersCount }});
}));


module.exports = router;