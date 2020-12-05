const express = require('express');
const router = express.Router();
const db = require('../models');
const asyncWrap = require('../middleware/asyncWrap');
const bcrypt = require('bcrypt');

router.post('/sign-up', asyncWrap(async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const hashedPass = bcrypt.hashSync(password, 13);
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      status: false,
      message: 'Fields are required!'
    });
  } else {
    await db.users.create({
      email,
      password: hashedPass,
      first_name,
      last_name,
    }).then(() => res.status(201)).catch((error) => {
      res.status(400).send(error);
    });
  }
}))

module.exports = router;
