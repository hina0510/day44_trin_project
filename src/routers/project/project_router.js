const router = require("express").Router();
const pCtrl = require("../../cotroller/project_ctrl");

router.get("/", (req, res) => {
    res.render("main");
});

router.post("/login", pCtrl.process.loginChk)

router.get("/memberinfo", (req, res)=>{
    res.render("memberinfo");
});

module.exports = router;