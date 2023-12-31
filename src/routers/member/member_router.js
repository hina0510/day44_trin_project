const router = require("express").Router();
const pCtrl = require("../../cotroller/project_ctrl");

router.get("/loginForm", pCtrl.view.loginForm);
router.post("/login", pCtrl.process.login);

router.get("/registerForm", pCtrl.view.registerForm);
router.post("/register", pCtrl.process.register);

router.get("/logout", pCtrl.process.logout);

router.get("/infoChk/:username", pCtrl.view.infoChk);
router.post("/memberInfo", pCtrl.process.information);

router.post("/modifyM", pCtrl.process.modifyM);

router.get("/delete/:id", pCtrl.process.delete);

router.get("/find", pCtrl.view.find);
router.post("/findId", pCtrl.process.findId);

router.get("/chgPwdForm/:id", pCtrl.process.chgPassword);
router.post("/chgPwd/:id", pCtrl.process.chgPwd);

module.exports = router;