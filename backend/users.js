const express = require('express'),
  router = express.Router();

// get user lists
router.get('/list', function(req, res) {
  let sql = `SELECT * FROM users`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

// create new user
router.post('/users', function(req, res) {
  let sql = `INSERT INTO users(username, email, password) VALUES (?)`;
  let values = [
    req.body.username,
    req.body.email, 
    req.body.password, 
  ];
  db.query(sql, [values], function(err, data, fields) {
    // if (err) throw err;
    if (err){
      console.log(err)
      res.json({
        message: "Duplicate"
      })
    }else{
      res.json({
        status: 200,
        message: "New User Added successfully"
      })
    }
  })
});

module.exports = router;