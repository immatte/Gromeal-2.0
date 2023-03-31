var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");

// GET recipes by plan_id (ANA MARI)
router.get("/:planId", async function(req, res, next) {
  let planId = req.params.planId
 //  let programId = req.params.programId;
 
   try {
     let results = await db(`SELECT * FROM recipes WHERE plan_id = ${planId}`);
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

 //POST A NEW RECIPE (ISA)
 router.post("/:planId", async (req, res, next) => {
  let { API_id, recipe_title, recipe_image, servings, meal_type, week_day} = req.body;
  let planId = req.params.planId;
  let sql = `
      INSERT INTO recipes (API_id, recipe_title, recipe_image, servings, meal_type, plan_id, week_day)
      VALUES (${API_id},"${recipe_title}", '${recipe_image}', ${servings}, '${meal_type}', ${planId}, '${week_day}')
  `;

  try {
      await db(sql);
      let result = await db(`SELECT * FROM recipes WHERE plan_id = ${planId}`);
      let exercises = result.data;
      res.status(201).send(exercises);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

//DELETE a Recipe (ANA MARI)
router.delete("/:planId/:id", async (req, res, next) => {
  let index = req.params.id;
  let planId = req.params.planId;

  try {
      let result = await db(`SELECT * FROM recipes WHERE id = ${index}`);
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Recipe not found' });
      } else {
          await db(`DELETE FROM recipes WHERE id = ${index}`);
          let result = await db(`SELECT * FROM recipes WHERE plan_id = ${planId}`);
          let recipes = result.data;
          res.send(recipes);
      } 
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

// PUT a Recipe (ANA MARI)
router.put("/:planId/:id", async (req, res) => {
  let index = req.params.id;
  try {
    let results = await db(`SELECT * FROM recipes WHERE id = ${index}`);
    if (results.data.length === 0) {
      // Recipe not found
      res.status(404).send({ error: "Recipe not found" });
    } else {
      // Recipe found!
      let { API_id, recipe_title, recipe_image, meal_type, week_day, servings } = req.body;
      let sql = `
        UPDATE recipes
        SET API_id = ${API_id}, recipe_title = "${recipe_title}", recipe_image = "${recipe_image}", meal_type = "${meal_type}", week_day = "${week_day}", servings = ${servings} 
        WHERE id = ${index}
      `;
      // Do the UPDATE
      await db(sql);
      let results = await db("SELECT * FROM recipes");
      res.send(results.data);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


   
module.exports = router;