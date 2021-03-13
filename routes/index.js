const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Las Vegas' });
});

// router.get('/', function(req, res, next) {
//   res.render('index_mem', { title: 'Las Vegas' });
// });

module.exports = router;
