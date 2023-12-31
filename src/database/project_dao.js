const oracledb = require("oracledb");
const dbConfig = require("../../config/database/db_config");

oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

loginChk = async (id) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from proMember where id = '${id}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(member);
    return member.rows;
}

register = async ( body ) =>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = "insert into proMember values(:id, :pwd, :name, :addr, :pNumber, :birth)";
    let result;
    
    try{
        result = await con.execute(sql, body);
    }catch(err){
        console.log(err)
    }
    return result;
}  

infoChk = async (params) => {
    const con = await oracledb.getConnection(dbConfig);
    console.log("서비스에서 받아온 params의 id",params.username);
    const sql = `select * from proMember where id = '${params.username}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(member);
    return member.rows[0];
}

modifyM = async (body) => {
    const con = await oracledb.getConnection(dbConfig);
    console.log("서비스에서 받아온 body.id : ",body.id);
    const sql = `update proMember set pwd = '${body.pwd}', name = '${body.name}' , addr = '${body.addr}',
                 p_number= '${body.pNumber}' , birth = '${body.birth}'  where id = '${body.id}'`;
    console.log(sql);
    let result = 0;
    try{
        result = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(result);
    return result;
}

deleteM = async (body) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = ` delete from proMember where id = :id`;
    
    let result = 0;
    try{
        result = await con.execute(sql, body);
    }catch(err) {
        console.log(err);
    }
    return result;
}

findId = async (body) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select id from proMember where name = '${body.name}' and p_number = '${body.pNumber}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log("쿼리로 받아온 내용들",member);
    return member.rows;

}

chgPassword = async (params) => {
    const con = await oracledb.getConnection(dbConfig);
    console.log("서비스에서 받아온 params의 id",params.id);
    const sql = `select id, pwd from proMember where id = '${params.id}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(member);
    return member.rows[0];
}

chgPwd = async (param,body) => {
    const con = await oracledb.getConnection(dbConfig);
    console.log("서비스에서 받아온 param.id : ",param.id);
    console.log("서비스에서 받아온 body.pwd : ",body.pwd);
    const sql = `update proMember set pwd = '${body.pwd}' where id = '${param.id}'`;
    console.log(sql);
    let result = 0;
    try{
        result = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(result);
    return result;
}

information = async (pwd, id) => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from promember where id = '${id}' and pwd = '${pwd}'`;
    console.log(sql);
    try{
        member = await con.execute(sql);
    }catch(err) {
        console.log(err);
    }
    console.log(member);
    return member.rows[0];
}

const getList = async ()=>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from worldcup`;
    console.log((await con.execute(sql)).rows);
    return (await con.execute(sql)).rows;
}

const getHtml = async (num)=>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from cAdd where n_id='${num}'`;
    let result;
    try{
        result =  await con.execute(sql, num);
    }catch(err){
        console.log(err);
    }
    return result;
}

const mainBL = async () => {
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select B.* from (select rownum rn, A.* from (
                select * from proboard order by num desc ) A )B
                where rn between 1 and 5`;
    const result = await con.execute(sql);
    console.log("dao BL", result);
    return result;
}

module.exports = {loginChk, register, infoChk, modifyM, deleteM,information, findId, chgPassword, chgPwd, getList, mainBL};