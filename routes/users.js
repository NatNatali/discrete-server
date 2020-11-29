const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign-up', (req, res, next) => {
  console.log('erq.body', req.body)
})

module.exports = router;
