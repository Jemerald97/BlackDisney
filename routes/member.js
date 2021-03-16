const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('member', { nick : members[0].nick });
});

module.exports = router;