'use strict';

const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  console.log(req.body);
  res.redirect(303, '/home');
});

module.exports = router;
