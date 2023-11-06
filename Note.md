# Proyect

## GOALS
### PHASE 1.
- Adding the shops to the app. The user/buyer will be able to :
    1. See available shops near it's location where to buy the needed items
    2. Pay online
    3. Ask for delivery or going to the store
** the shops data will be included in backend

### PHASE 2.
- Adding an interface for a new type of user: "the seller". The app would transform then into a connection plateform between sellers and buyers
**the shops data will be added by sellers themselves

## TO-DO
- correct double amounts on ingredients --> check if can be solved on post in WeeklyPlan view
- Get all ingredients from sample in a veriable --> check recipes[0].extendedIngredients[0].name (use 2 or 3 for loops)

## DOING
- INVESTIGATION - Documentation API google MAPS
- INVESTIGATION - Documentation API paypal
- BACKEND - Shops tables

## DONE
 - recovered list of ingredients in variable "ingredientList" by using a for loop on recipes, in App(lines 85-97).js
 - created a ingredients data file called Ingredients in test folder
 - Added a delete route in list as to delete all the ingredients from a plan_id when a recipe is deleted and the all array is re-posted with the updated recipes list ingredients
 - Backend route shopsRouter created(shops.js). 
  1. GET shops info : "http://localhost:5000/api/shops/"
  2. GET all product list : "http://localhost:5000/api/shops/products"
  3. GET product list by shop id : "http://localhost:5000/api/shops/:shopsId"
  4. GET product by id : "http://localhost:5000/api/shops/products/:product"
  5. POST A NEW ITEM : "http://localhost:5000/api/shops/:shopsId"
  6. DELETE a product : "http://localhost:5000/api/shops/products/:product"

 Add Index  Add Column 