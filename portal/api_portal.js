const express = require("express");
const router = express.Router();
const sql_command = require("../utils/sql_command");
//const Authenticate = require("../verify-token");
//const moment = require("moment");
const fs = require("fs");
const constants = require("../utils/constants");
const {
  jsonFormatSuccess,
  jsonFormatError,
} = require("../utils/format_json");



// router.get("/test-get", Authenticate, async (req, res, next) => {
//   try {
//     let results = await sql_command.query(`SELECT * FROM TEST_DATA`);
//     res.json(jsonFormatSuccess(results));
//   } catch (error) {
//     next(error);
//   }
// }); //

// router.post("/test-post", Authenticate, async (req, res, next) => {
//   try {
//     let results = await sql_command.query(`SELECT * FROM ANSWER_OPTION`);
//     res.json(jsonFormatSuccess(results));
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/test-put", Authenticate, async (req, res, next) => {
//   try {
//     let results = await sql_command.query(`SELECT * FROM ANSWER_OPTION`);
//     res.json(jsonFormatSuccess(results));
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/test-delete", Authenticate, async (req, res, next) => {
//   try {
//     let results = await sql_command.query(`SELECT * FROM ANSWER_OPTION`);
//     res.json(jsonFormatSuccess(results));
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/saveomma", async (req, res, next) => {
//    console.log(req.body);
    let body = req.body;
  try {
    let results = await sql_command.query(`SELECT * FROM WOMAN WHERE CID ='${body.CID}'`);
//    WHERE CID ='${body.CID}'
    //console.log(results);
    res.json(results);
  } catch (error) {
    next(error);
  }
});//login

router.post("/display-information", async (req, res, next) => {
//    console.log(req.body);
    let body = req.body;
  try {
    //let results = await sql_command.query(`SELECT a.CID,a.PRENAME,a.FNAME,a.LNAME,a.BIRTH,a.MENSE,a.PREGNANCY,c.SCORE FROM WOMAN a INNER JOIN SOCIALECODOMIC c ON a.CID = c.CID INNER JOIN ( SELECT CID, MAX(TIMESTEMP) maxDate FROM SOCIALECODOMIC GROUP BY CID ) b ON c.CID = b.CID AND c.TIMESTEMP = b.maxDate WHERE CID ='${body.CID}'`);
    let results = await sql_command.query(`SELECT
                                           	a.CID,
                                           	a.PRENAME,
                                           	a.FNAME,
                                           	a.LNAME,
                                           	a.BIRTH,
                                           	a.MENSE,
                                           	a.PREGNANCY,
                                           	c.SCORE,
                                           	c.AUTO_ID
                                           FROM
                                           	WOMAN a
                                           	INNER JOIN SOCIALECODOMIC c ON a.CID = c.CID
                                           	INNER JOIN ( SELECT CID, MAX( TIMESTEMP ) maxDate FROM SOCIALECODOMIC GROUP BY CID ) b ON c.CID = b.CID
                                           	AND c.TIMESTEMP = b.maxDate
                                           WHERE
                                           	a.CID = ${body.CID}`)
    //console.log(results);
    res.json(results);
  } catch (error) {
    next(error);
  }
});//login

router.post("/insert-register", async (req, res, next) => {
    let body = req.body;
  try {
    let results = await sql_command.query(`INSERT INTO WOMAN (CID,PRENAME,FNAME,LNAME,BIRTH,PHONE,LINEID,ADDRESS,PROVINCE,DISTRICT,SUBDISTRICT,BYROAD,INSTYPE,ISTHAI,MENSE,PREGNANCY,ROAD,VILLAGE) VALUES ('${body.CID}','${body.PRENAME}','${body.FNAME}','${body.LNAME}','${body.BIRTH}','${body.PHONE}','${body.LINEID}','${body.ADDRESS}','${body.PROVINCE}','${body.DISTRICT}','${body.SUBDISTRICT}','${body.BYROAD}','${body.INSTYPE}','${body.ISTHAI}','${body.MENSE}','${body.PREGNANCY}','${body.ROAD}','${body.VILLAGE}')`);
//    WHERE CID ='${body.CID}'
    console.log(results);
    res.json(results);
  } catch (error) {
    next(error);
  }
});//register

router.post("/insert-ecodomic", async (req, res, next) => {
    let body = req.body;
  try {
    let results = await sql_command.query(`INSERT INTO SOCIALECODOMIC (AUTO_ID,CID,USE_PINKBOOK,CURRENT,PRENATAL,PRENATAL_PROVINCE,PRENATAL_DISTRICT,PRENATAL_SUBDISTRICT,PRENATAL_SERVICE,DISTRICTFAR,HEALTHRICK,HEALTHBITRICK,HEALTHCHEACK,CHEACKHEALTH,HEARTDISEASE,HIGHBLOODPRESSURE,DIAVETES,CHRONICKIDNEY,CANCER,TOXICGOITER,SEIZURES,DEPRESSED,RICKOTHER,SCORE) VALUES ('${body.AUTO_ID}','${body.CID}','${body.USE_PINKBOOK}','${body.CURRENT}','${body.PRENATAL}','${body.PRENATAL_PROVINCE}','${body.PRENATAL_DISTRICT}','${body.PRENATAL_SUBDISTRICT}','${body.PRENATAL_SERVICE}','${body.DISTRICTFAR}','${body.HEALTHRICK}','${body.HEALTHBITRICK}','${body.HEALTHCHEACK}','${body.CHEACKHEALTH}','${body.HEARTDISEASE}','${body.HIGHBLOODPRESSURE}','${body.DIAVETES}','${body.CHRONICKIDNEY}','${body.CANCER}','${body.TOXICGOITER}','${body.SEIZURES}','${body.DEPRESSED}','${body.RICKOTHER}','${body.SCORE}')`);
//    WHERE CID ='${body.CID}'
    //console.log(results);
    res.json(results);
  } catch (error) {
    next(error);
  }
});//inserteco

router.get("/select_todo/:CID", async (req, res, next) => {
let pa = req.params;
console.log(pa)
  try {
    let results = await sql_command.query(`SELECT * FROM WOMAN WHERE CID = '${pa.CID}'`);
    res.json(jsonFormatSuccess(results));
  } catch (error) {
    next(error);
  }
}); //1api
//
//router.post("/test-insert-todo", async (req, res, next) => {
//  const body = req.body; //
//  // Console.log('---------------------------')
//  // Console.log(body)
//  // Console.log('---------------------------')
//  try {
//    let results = await sql_command.query
//    (`INSERT INTO TODO(todo_name,todo_detail,todo_done,
//      todo_priority,todo_date) value('${body.topic}',
//      '${body.detail}','${body.done}','${body.priority}',
//      '${body.date}') `);
//    res.json(jsonFormatSuccess(results));
//  } catch (error) {
//    next(error);
//  }
//});
//
//router.put("/test-put", async (req, res, next) => {
//  try {
//    let results = await sql_command.query(`SELECT * FROM ANSWER_OPTION`);
//    res.json(jsonFormatSuccess(results));
//  } catch (error) {
//    next(error);
//  }
//});
//
//router.delete("/test-delete", async (req, res, next) => {
//  try {
//    let results = await sql_command.query(`SELECT * FROM ANSWER_OPTION`);
//    res.json(jsonFormatSuccess(results));
//  } catch (error) {
//    next(error);
//  }
//});

module.exports = router;
