var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/gamelist', function(req, res, next) {
    console.log(req.user)
 res.json({
    x:1,y:1
 })
});

module.exports = router;
