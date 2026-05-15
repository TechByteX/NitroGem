const express = require('express');
const apitestController = require('../controllers/apitestController');

const router = new express.Router();

router.get('/', apitestController.read);

module.exports = router;
