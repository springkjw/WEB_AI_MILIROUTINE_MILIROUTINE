const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/user.ctrl");

router.get('/', ctrl.output.setting);
router.post('/', ctrl.user.setInfo);
router.post('/pw', ctrl.user.setPassword);


module.exports = router;