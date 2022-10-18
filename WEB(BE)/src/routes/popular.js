const express = require("express");
const router = express.Router();
const ctrl = require('../controllers/popular.ctrl');


router.get('/', ctrl.output.popular);

module.exports = router;