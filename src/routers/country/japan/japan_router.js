const router = require("express").Router();
const pCtrl = require("../../../cotroller/project_ctrl");

//router.get("/k", pCtrl);
////router.get("/k", pCtrl);

router.get("/tokyo", pCtrl.jView.tokyo);
router.get("/osaka", pCtrl.jView.osaka);
router.get("/sapporo", pCtrl.jView.sapporo);
router.get("/image/:fileName", pCtrl.jView.image);

module.exports = router