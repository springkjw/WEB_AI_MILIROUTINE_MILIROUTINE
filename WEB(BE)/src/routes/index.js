const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/home.ctrl');

const signup = require('./signup');
const login = require('./login');
const routine = require('./routine');
const user = require('./user');
const popular = require('./popular');

router.get('/', ctrl.output.home);

router.use('/auth/login', login);
router.use('/auth/signup', signup);
router.use('/routine', routine);
router.use('/user', user);
router.use('/popular', popular);

module.exports = router;
