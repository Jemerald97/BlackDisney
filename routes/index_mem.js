const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index_mem', { title: 'Las Vegas' });
});

module.exports = router;