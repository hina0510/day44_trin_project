const pService = require("../service/project_service");

const view = {
    loginForm : (req, res) => {
        res.render("member/loginForm");
    },

    registerForm : (req, res) => {
        res.render("member/registerForm");
    },

    find : (req, res) => {
        res.render("member/find");
    },

    worldcup1 : async(req, res) => {
        const nlist = await pService.getList();
        //console.log("nlist : ",nlist);
        res.render("worldcup/worldcup1", {nlist});
    },

    worldcup2 : (req, res) => {
        res.redirect("/worldcup/1");

    }
}

var list = {};

const process  = {
    login : async (req, res) => {
        const msgPack = await pService.loginChk(req.body);
        if(msgPack.result === 0) {
            req.session.username = req.body.id;
        }
        res.send(msgPack.msg);
    },

    register : async (req, res) => {
        const msg = await pService.register(req.body);
        console.log(msg);
        res.send(msg);
    },

    logout : (req, res) => {
        const msg = pService.logout(req, res);
        res.send(msg);
    },
    
    infoChk : async (req, res) => {
        console.log("req.parmas : ", req.params);
        const mlist = await pService.infoChk(req.params);
        console.log("서비스에서 받아온 mlist(result) : ",mlist);
        res.render("member/infoChk", {list : mlist})
    },
    
    modifyForm : async (req, res) => {
        console.log("req.params : ", req.params); //id받아옴
        const mlist = await pService.modifyForm(req.params);
        res.render("member/modifyForm", {list : mlist})
    },
    
    modify : async (req, res) => {
        console.log("body확인 : ", req.body);
        const msg = await pService.modify(req.body);
        res.send(msg);
    },

    delete : async (req, res) => {
        console.log("req.params", req.params);
        req.session.destroy();
        res.clearCookie("isLogin");
        const msg = await pService.deleteM(req.params);
        res.send(msg);
    },
    findId : async (req, res) => {
        console.log(req.body);
        const idList = await pService.findId(req.body);
        console.log("서비스에서 받아온 idList", idList);
        res.render("member/idList", {list : idList});
    },
    chgPwdForm : async (req, res) => {
        console.log("req.params : ", req.params); //id받아옴
        const mlist = await pService.chgPassword(req.params);
        res.render("member/chgPwdForm", {list : mlist})
    },
    chgPwd : async (req, res) => {
        console.log("body확인 : ", req.body);
        const msg = await pService.chgPwd(req.body);
        res.send(msg);
    },

    worldcup1 : async(req, res) => {
        //console.log("w1 : ",req.params["id"]);
        list.NUM1 = req.params["id"];
        //console.log("w1 list : ",list);
        const nlist = await pService.getList();
        res.render("worldcup/worldcup2", {nlist});
    },

    worldcup2 : async(req, res) => {
        //console.log("w2 : ",req.params["id"]);
        list.NUM2 = req.params["id"];
        //console.log("w2 list : ",list);
        const nlist = await pService.getList();
        console.log("w2 : ",nlist);
        if(req.params["id"]==="nature"){
            res.render("worldcup/worldcup3", {nlist});
        }else{
            res.render("worldcup/worldcup4", {nlist});
        }
    },

    worldcup3 : async(req, res) => {
        console.log("w3 : ",req.params["id"]);
        list.NUM3 = req.params["id"];
        console.log("w3 list : ",list);
        //pService.worldcupCheck(res.params);
    },

    worldcup4 : async(req, res) => {
        console.log("w3 : ",req.params["id"]);
        list.NUM3 = req.params["id"];
        console.log("w3 list : ",list);
        //pService.worldcupCheck(res.params);
    },

    worldcupCheck : async(req, res) => {
        //console.log("w4 : ",res.params);
        //const msgPack = await pService.worldcupCheck(req.params);
        //res.send(msgPack.msg);
    }
}

module.exports = {view, process}