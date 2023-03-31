var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");

// GET plans by UserId
router.get("/:userId", ensureSameUser, async function(req, res, next) {
    let userId = req.params.userId;
    let sql = `SELECT * FROM plans WHERE user_id = ${userId}`;
   
     try {
       let results = await db(sql);
       let plans = results.data;
       // if (programs.length === 0) {
       
       //   res.status(404).send({ error: "Programs not found" });
       // } else {
       //   res.send(programs);
       // }
       res.send(plans);
     } catch (err) {
       res.status(500).send({ error: err.message });
     }
   });
   

  //POST A NEW PLAN to that user
 router.post("/:userId", ensureSameUser, async (req, res, next) => {
  let { plan_title } = req.body;
  let userId = req.params.userId;
  let sql = `
      INSERT INTO plans (plan_title, user_id)
      VALUES ('${plan_title}', ${userId})
  `;

  try {
      await db(sql);
      let result = await db(`SELECT * FROM plans WHERE user_id = ${userId} ORDER BY id DESC LIMIT 1`);
      let plans = result.data;
      res.status(201).send(plans);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

//DELETE A PLAN from that user
router.delete("/:patientId/:id", async (req, res, next) => {
  let programId = req.params.id;
  let patientId = req.params.patientId;

  try {
      let result = await db(`SELECT * FROM programs WHERE id = ${programId}`);
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Program not found' });
      } else {
          await db(`DELETE FROM programs WHERE id = ${programId}`);
          let result = await db(`SELECT * FROM programs WHERE patientId = ${patientId}`);
          let programs = result.data;
          res.send(programs);
      } 
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});


//ANA MARI's route to try to delete a plan 
router.delete("/:planId", async (req, res, next) => { //I also tried it with plan_id but it didn't work
  let planId = req.params.planId;
  let { user_id } = req.body; 

  try {
      let result = await db(`SELECT * FROM plans WHERE id = ${planId}`);
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Plan not found' });
      } else {
          await db(`DELETE FROM plans WHERE id = ${planId}`);
          let result = await db(`SELECT * FROM plans WHERE user_id = ${user_id}`); //Do I need this?
          //let result = await db(`SELECT * FROM plans WHERE userId = ${userId}`);
          
          let plans = result.data;
          res.send(plans);
      } 
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

// //ANA MARI's route to try to modify the title of a plan. 
router.put("/:planId", async (req, res, next) => {
  let planId = req.params.planId;
   let { plan_title } = req.body; //the name has to match how it's written in the db

  try {
      let result = await db(`SELECT * FROM plans WHERE id = ${planId}`);
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Plan not found' });
      } else {
          let sql = `
              UPDATE plans 
              SET plan_title = '${plan_title}'
              WHERE id = ${planId}
          `;

          await db(sql);   
          result = await db(`SELECT * FROM plans WHERE id = ${planId}`); //to update the title in the client side (browser)       
          let plans = result.data;
          res.send(plans);
      }
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

module.exports = router;