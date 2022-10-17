const express = require("express");
const router = express.Router();
const my = require('./user/my');
const routine = require('./user/routine');
const settings = require('./user/settings');
const pointshop = require('./user/pointshop');

router.use('/my', my);
router.use('/routine', routine);
router.use('/settings', settings);
router.use('/pointshop', pointshop);

module.exports = router;

