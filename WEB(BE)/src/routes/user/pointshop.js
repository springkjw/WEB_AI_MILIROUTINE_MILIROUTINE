const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/user.ctrl");

router.get('/', ctrl.output.goods);
router.post('/', ctrl.goods.buy); // user가 상품을 구매했을 때

module.exports = router;