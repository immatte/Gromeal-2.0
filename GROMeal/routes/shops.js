var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");

// GET shops info
router.get("/", async function(req, res, next) {

   try {
     let results = await db(`SELECT * FROM shops`);
     let plans = results.data;
     res.send(plans);
   } catch (err) {
     res.status(500).send({ error: err.message });
   }
 });

 // GET all product list
router.get("/products", async function(req, res, next) {

  try {
    let results = await db(`SELECT * FROM shops_products`);
    let plans = results.data;
    res.send(plans);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// GET product list by shop id
router.get("/:shopsId", async function(req, res, next) {
  let shopsId = req.params.shopsId 
   try {
     let results = await db(`SELECT * FROM shops_products WHERE shop_id = ${shopsId}`);
     let plans = results.data;
     res.send(plans);
   } catch (err) {
     res.status(500).send({ error: err.message });
   }
 });

// GET product by id
router.get("/products/:product", async function(req, res, next) {
  let product = req.params.product 
   try {
     let results = await db(`SELECT * FROM shops_products WHERE id = ${product}`);
     let plans = results.data;
     res.send(plans);
   } catch (err) {
     res.status(500).send({ error: err.message });
   }
 });

// GET product by name
router.get("/products/search", async function(req, res, next) {
  const {search} = req.query
   try {
     let results = await db(`SELECT * FROM shops_products WHERE product_name LIKE '%${search}%'`);
     let search = results.data;
     res.send(search);
   } catch (err) {
     res.status(500).send({ error: err.message });
   }
 });

 //POST A NEW ITEM
 router.post("/:shopsId", async (req, res, next) => {
  let shopsId = req.params.shopsId 
  let shops_product = req.body;
  let sql = `INSERT INTO shops_products (shop_id, product_name, price) VALUES (${shopsId}, "${shops_product.product_name}", ${shops_product.price});`
  
  try {
      await db(sql);
      let result = await db(`SELECT * FROM shops_products`);
      let shops_products = result.data;
      res.status(201).send(shops_products);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

//DELETE a product
router.delete("/products/:product", async (req, res, next) => {
  let product = req.params.product 

  try {
      let result = await db(`SELECT * FROM shops_products WHERE id = ${product}`);
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Item not found' });
      } else {
          await db(`DELETE FROM shops_products WHERE id = ${product}`);
          let result = await db(`SELECT * FROM shops_products`);
          let products = result.data;
          res.send(products);
      } 
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});
   
module.exports = router;