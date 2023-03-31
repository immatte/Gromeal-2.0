var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");

// GET shopping lists by plan_id
router.get("/:planId", async function(req, res, next) {
  let planId = req.params.planId
 //  let programId = req.params.programId;
 
   try {
     let results = await db(`SELECT * FROM list WHERE plan_id = ${planId}`);
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

 //POST A NEW ITEM
 router.post("/:planId", async (req, res, next) => {
  let list = req.body;
  let planId = req.params.planId;
  let sql = `INSERT INTO list (item_name, amount, unit, plan_id)
  VALUES `
    for (let i = 0; i < list.length; i++) {
    if (i === list.length-1) {
    sql += `("${list[i].item_name}", ${list[i].amount}, "${list[i].unit}", ${planId});`;
    } else {
    sql += `("${list[i].item_name}", ${list[i].amount}, "${list[i].unit}", ${planId}), `;
    }
  }
  console.log(sql);
  
  try {
      await db(sql);
      let result = await db(`SELECT * FROM list WHERE plan_id = ${planId}`);
      let exercises = result.data;
      res.status(201).send(exercises);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

//DELETE an item
router.delete("/:planId/:id", async (req, res, next) => {
  let index = req.params.id;
  let planId = req.params.planId;

  try {
      let result = await db(`SELECT * FROM list WHERE id = ${index}`);
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Item not found' });
      } else {
          await db(`DELETE FROM list WHERE id = ${index}`);
          let result = await db(`SELECT * FROM list WHERE plan_id = ${planId}`);
          let recipes = result.data;
          res.send(recipes);
      } 
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

   
module.exports = router;