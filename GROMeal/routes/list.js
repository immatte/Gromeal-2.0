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
//  router.post("/:planId", async (req, res, next) => {
//   let list = req.body;
//   console.log(list);
//   let planId = req.params.planId;
//   // let sql = `INSERT INTO list (item_name, amount, unit, plan_id) VALUES ("${list.item_name}", ${list.amount}, "${list.unit}", ${planId});`
//   let sql = `INSERT INTO list (item_name, amount, unit, plan_id) VALUES`
//   for (let i = 0; i < list.length; i++) {
//       // sql += `("${list[i].item_name}", ${list[i].amount}, "${list[i].unit}", ${planId});`;
//       if (i === list.length-1) {
//       sql += `("${list[i].item_name}", ${list[i].amount}, "${list[i].unit}", ${planId});`;
//       } else {
//       sql += `("${list[i].item_name}", ${list[i].amount}, "${list[i].unit}", ${planId}), `;
//       }
//   }
//   console.log(sql);
  
//   try {
//       await db(sql);
//       let result = await db(`SELECT * FROM list WHERE plan_id = ${planId}`);
//       let exercises = result.data;
//       res.status(201).send(exercises);
//   } catch (err) {
//       res.status(500).send({ error: err.message });
//   }
// });

router.post("/:planId", async (req, res, next) => {
  let list = req.body;
  let planId = req.params.planId;
  let sql = `INSERT INTO list (item_name, amount, unit, plan_id) VALUES`;
  for (let i = 0; i < list.length; i++) {
    if (i === list.length - 1) {
      sql += `("${list[i].item_name}", ${list[i].amount}, "${list[i].unit}", ${planId});`;
    } else {
      sql += `("${list[i].item_name}", ${list[i].amount}, "${list[i].unit}", ${planId}), `;
    }
  }
  try {
    await db(sql);
    let result = await db(`SELECT * FROM list WHERE plan_id = ${planId}`);
    let items = result.data;
    res.status(201).send(items);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


//DELETE all items from a plan
router.delete("/:planId", async (req, res, next) => {
  let planId = req.params.planId;

  try {
      let result = await db(`SELECT * FROM list`);
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Item not found' });
      } else {
          await db(`DELETE FROM list WHERE plan_id = ${planId}`);
          let result = await db(`SELECT * FROM list WHERE plan_id = ${planId}`);
          let items = result.data;
          res.send(items);
      } 
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

//DELETE an item
router.delete("/:planId/:item_name", async (req, res, next) => {
  let name = req.params.item_name;
  let planId = req.params.planId;

  try {
      let result = await db(`SELECT * FROM list WHERE item_name = '${name}'`);
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Item not found' });
      } else {
          await db(`DELETE FROM list WHERE item_name = '${name}'`);
          let result = await db(`SELECT * FROM list WHERE plan_id = ${planId}`);
          let recipes = result.data;
          res.send(recipes);
      } 
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

// New endpoint to find shop IDs with the same products as the shopping list
// router.get("/:planId/find-shops", async (req, res, next) => {
//   try {
//     const planId = req.params.planId;

    
//     let results = await db(`
//       SELECT DISTINCT sp.product_name, sp.shop_id
//       FROM shops_products sp
//       INNER JOIN list l ON sp.product_name = l.item_name
//       WHERE l.plan_id = ${planId}
//     `);
    
//     let matchingProductsAndShops = results.data;
//     res.send(matchingProductsAndShops);
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

router.get("/:planId/find-shops", async (req, res, next) => {
  try {
    const planId = req.params.planId;

    let results = await db(`
      SELECT sp.product_name, GROUP_CONCAT(sp.shop_id) AS shop_ids
      FROM shops_products sp
      INNER JOIN list l ON sp.product_name = l.item_name
      WHERE l.plan_id = ${planId}
      GROUP BY sp.product_name
    `);

    let matchingProductsAndShops = results.data;
    res.send(matchingProductsAndShops);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
