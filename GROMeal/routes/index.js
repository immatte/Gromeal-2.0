const express = require('express');
const router = express.Router();
const { ensureUserLoggedIn } = require('../middleware/guards');
const db = require("../model/helper");


/**
 * GET /
 **/

router.get('/', function(req, res) {
    res.send({ message: 'Welcome to the GROMeal homepage! Try /users' });
});


// GET all plans (NO USER)
router.get("/allplans", async function(req, res, next) {
    // let userId = req.params.userId
   //  let programId = req.params.programId;
   
     try {
       let results = await db(`SELECT * FROM plans`);
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
   

  //POST A NEW PLAN (NO USER)
 router.post("/allplans", async (req, res, next) => {
  let { plan_title } = req.body;
//   let userId = req.params.userId;
  let sql = `
      INSERT INTO plans (plan_title)
      VALUES ('${plan_title}')
  `;

  try {
      await db(sql);
      let result = await db(`SELECT * FROM plans ORDER BY id DESC LIMIT 1`);
      let plans = result.data;
      res.status(201).send(plans);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

// GET one plan by id
router.get("/allplans/:id", async function(req, res, next) {
  let planId = req.params.id;

  try {
    let results = await db(`SELECT * FROM plans WHERE id = ${planId}`);
    let plans = results.data;
    if (plans.length === 0) {
      //patients array is empty so no patients found
      res.status(404).send({ error: "Plan not found" });
    } else {
      res.send(plans[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;

//Modify only de userId of the plan
router.put("/allplans/:planId", async (req, res, next) => {
  let planId = req.params.planId;
  let { user_id } = req.body;

  try {
      let result = await db(`SELECT * FROM plans WHERE id = ${planId}`);
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Plan not found' });
      } else {
          let sql = `
              UPDATE plans
              SET user_id=${user_id}
              WHERE id=${planId}
          `;

          await db(sql);
          let result = await db(`SELECT * FROM plans WHERE id = ${planId}`);
          let plans = result.data;
          res.send(plans);
      }
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});