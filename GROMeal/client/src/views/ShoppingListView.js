import React, { useEffect, useState } from 'react';
import { NavLink, useParams, Route, Routes, useNavigate } from 'react-router-dom';
import SpoonApi from "../helpers/SpoonApi";
import RecipesContext from "../components/RecipesContext";
import { useContext } from "react";
import ProgressBar from '../components/ProgressBar';


import Api from '../helpers/Api';
import { jsPDF } from "jspdf";
import { Visibility } from '@mui/icons-material';

function ShoppingListView() {

    const [recipes, setRecipes] = useState([]);
    const [planRecipes, setPlanRecipes] = useState([]);
    const [listVisible, setlistVisible] = useState(true);
    const [ingredients, setIngredients] = useState([]);
    const [items, setItems] = useState([]);

    // const [pdf, setPdf] = useState(null);
    const { planId } = useParams();
    const { addedItems, setAddedItems} = useContext(RecipesContext);

  
    useEffect(() => {
        getRandomRecipes();
    }, []);

    async function getRandomRecipes() {
        let uresponse = await SpoonApi.getRandomRecipes();
        if (uresponse.ok) {
            setRecipes(uresponse.data.recipes);
            
        } else {
            console.log('Error:', uresponse.error);
        }

    }

    useEffect(() => {
      getPlanRecipes();
    }, []);

    
    function showList(){
      listVisible?
        setlistVisible(false) :
        setlistVisible(true)
      
  };

   

  //Get all recipes of the json
  //Find the API_id for each planRecipe
      //FUNCTION TO CLICK ON RECIPE, VISUALIZE RECIPE ON TOP & ADDS RECIPE'S DATA TO CONST addedRecipe
    //   function showIngredients(id){
    //     let ingredient = recipes.find(r => r.id === id);
    //     setFeatRecipe(selectedRecipe);
    //     setAddedRecipe((addedRecipe) => ({...addedRecipe, API_id: selectedRecipe.id, recipe_title: selectedRecipe.title, recipe_image: selectedRecipe.image}));
    // };
  
  // Get All recipes from a plan
  async function getPlanRecipes() {
  
    try {
      let response = await fetch(`/api/recipes/${planId}`);
      if (response.ok) {
          let recipes = await response.json();
          setPlanRecipes(recipes);
      } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }
  }
  // console.log(recipes)
  // console.log(planRecipes)
  // console.log(planRecipes[0].API_id)
  // console.log(planRecipes[0].servings)
  // console.log(planRecipes.length)

  //planRecipes es un array de objetos

  // let recipeId =  planRecipes.map(recipe => recipe.API_id)
  // console.log(recipeId)
  // let recipesIngredients = [];
  // for(let i=0; i<=recipeId.length; i++){
  //       let foundRecipe = recipes.find(r => r.id === recipeId);
  //       let recipeIngredient = foundRecipe.extendedIngredients
  //       recipeIngredient =  recipeIngredient.map(ingredient => ({...recipeIngredient, name: ingredient.name}))
  //       recipesIngredients+=recipeIngredient;
  //     }
  // console.log(recipesIngredients)

  // get ingredients by the id of each recipe
  
  // getIngredients()
  // console.log(recipesIngredients);

// get original servings of each plan recipe
  
//   function findServings(recipeName) {
//     const recipe = recipes[recipeName];
//     let totalServings = recipe.servings;
//     for (const ingredient in recipe.ingredients) {
//       const amount = recipe.ingredients[ingredient].amount;
//       const servingSize = recipe.ingredients[ingredient].servingSize;
//       totalServings *= amount / servingSize;
//     }
//     console.log(totalServings);
//     return totalServings;
// }

// get ingredients by the id of each recipe
  // const getIngredients = async () => {
   
  //   const api = await Promise.all(planRecipes.map(recipe => {
  //   return fetch(
  //       `https://api.spoonacular.com/recipes/${recipe.API_id}/ingredientWidget.json?apiKey=${ANAMARI_KEY3}`
  //      )}
  //   ) )
  //   const data = await Promise.all(api.map(ingredients => {
  //   return ingredients.json()}));  
  //     setIngredients(data);
  // };
// ingredients también es un array de objetos 
// Cada objeto se llama ingredients y es otro array de objetos
// console.log(recipes);
// console.log(ingredients);

const shoppingList = [] 
    //FETCH POST NEW RECIPE FROM USER
    // const addRecipe = async () => {

    //   try {
    //       let response = await Api._doFetch(`/api/recipes/${planId}`, 'POST', addedRecipe);
    //       console.log(response);
    //       if (response.ok) {  
    //           console.log('Recipe added!')
    //       } else {
    //           console.log(`Server error: ${response.status}:
    //           ${response.statusText}`);
    //       }
          
    //   } catch (err) {
    //       console.log(`Network error: ${err.message}`);
    //   }
    //   console.log(addedRecipe)
    // };     
    
    //POST SHOPPING ITEMS TO THE LIST (when creating the plan¿?)
    // const addItem = async () => {
    
    //   try {
    //       let response = await Api._doFetch(`/api/list/${planId}`, 'POST', newList);
    //       console.log(response);
    //       if (response.ok) {            
    //           console.log('Recipe added!')
    //       } else {
    //           console.log(`Server error: ${response.status}:
    //           ${response.statusText}`);
    //       }
          
    //   } catch (err) {
    //       console.log(`Network error: ${err.message}`);
    //   }
    //   console.log(newList)
    // };
    //   // // Add every item (POST)
    //   for (let i = 0; i < newList.length; i++) {
    //     console.log("Hello")
    //   //   addItem(addedItems);
    //     setAddedItems((addedItems) => ({...addedItems, id: newList[i].id, item_name: `${newList[i].item_name}`, amount: newList[i].amount, unit: `${newList[i].unit}`}));
    //   }
    //   console.log(addedItems);

    async function addItemToDatabase() {
      try {
          const response = await fetch(`/api/list/${planId}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(addedItems)
          });
          if (response.ok) {
              const newList = await response.json();
              console.log('Items added:', newList);
              // Assuming newList contains the updated list after adding the items
              setAddedItems(newList);
          } else {
              console.log('Failed to add items:', response.status, response.statusText);
          }
      } catch (error) {
          console.error('Error:', error);
      }
  }


    //POST function to modify a recipe
  //   async function addItem() {
  //     let options = {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(newList)
  //     };

  //     try {
  //         let response = await fetch(`/api/list/${planId}`, options);
  //         if (response.ok) {
  //             let newList = await response.json();
  //             setAddedItems(newList);
  //         } else {
  //             console.log(`Server error: ${response.status} ${response.statusText}`);
  //         }
  //     } catch (err) {
  //         console.log(`Server error: ${err.message}`);
  //     }
  // }

  

  // useEffect(() => {
  //   addItem();
  // }, []);

  useEffect(() => {
    getItems();
  }, []);


  async function getItems() {

    try {
      let response = await fetch(`/api/list/${planId}`);
      if (response.ok) {
          let newList = await response.json();
          console.log("hello")
          reduceObjects(newList)
      } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }
  }

  function reduceObjects(newList) {
    const reducedList = newList.reduce((accumulator, current) => {
        const existingItem = accumulator.find(item => item.item_name === current.item_name);
        if (existingItem) {
            existingItem.amount += current.amount;
        } else {
          accumulator.push({ ...current });
        }

        return accumulator;
    }, []);
    setAddedItems(reducedList)
  }
  console.log(addedItems)

          
  async function deleteIngredient(item_name) {
    // Define fetch() options
    let options = {
        method: 'DELETE'
    };
  
    try {
        let response = await fetch(`/api/list/${planId}/${item_name}`, options);
        if (response.ok) {
            let exercises = await response.json();
            setAddedItems(exercises);
        } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
  }

 

  const downloadPdf = event => {
    var doc = new jsPDF({
      // unit:"mm"
    });
    addedItems.forEach(function(newList,i){
      doc.text(50,10+i*10, newList.item_name + " " + newList.amount + " " + newList.unit +"\n" );
    });
    doc.setFontSize(5);

    doc.save("ShoppingList.pdf");
  }


  // Function to fetch products with matching shop_ids NOT WORKING
  const [foundShops, setFoundShops] = useState(null); // Initialize foundShops state variable

  // Function to fetch products with matching shop_ids
  async function fetchProductsAndShops() {
    try {
      // Make a GET request to the endpoint with the provided planId
      const response = await fetch(`/api/list/${planId}/find-shops`);
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Return the matching products and shops
      return data;
    } catch (error) {
      // Handle any errors
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  useEffect(() => {
    // Fetch data when component mounts
    fetchProductsAndShops()
      .then((data) => {
        // Set foundShops state variable with the fetched data
        setFoundShops(data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  }, [planId]); // Depend on planId so the effect runs when planId changes




    return (
    
      <div className='banner1 pb-5 m-0' style={{backgroundColor: '#FFCC00'}}>
         <div className="container pt-5 pb-5 align-items-center">
            <div className="row col-12 mx-auto">
              <div className="col-2 mx-auto">
                  <NavLink id="backNext" className='col' to={`/weekPlan/${planId}`}>
                      BACK 
                  </NavLink>
              </div>
              <div className="col-8 mx-auto align-items-center"><ProgressBar activeStep={2}/></div>
              <div className="col-2 mx-auto text-end">
                  <NavLink id="backNext" className='col'to={`/shopsView/${planId}`}>
                      NEXT
                  </NavLink>
              </div>
          </div> 
      </div>  
      <div className='container-fluid col-10'>  
        <div>
          <div className="row col-12 p-0 m-0 d-flex justity-content-between mb-2">
          <h1 className="col" id="title">My Shopping List</h1>
          <button id="buttonA" className="btn btn-warning btn-md col-4" onClick={downloadPdf}>DOWNLOAD</button>
            <div>
              {/* Use foundShops in your component */}
              {foundShops ? (
                <div>
                  {/* Display foundShops data */}
                  {/* Example: */}
                  {foundShops.map((product) => (
                    <div key={product.product_name}>
                      <p>Product: {product.product_name}</p>
                      <p>Shop IDs: {product.shop_ids}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
            <button id="buttonA" className="btn btn-warning btn-md col-4"onClick={showList}>{listVisible? "Show list":"Don't show list"}</button> 
            <p>Total ingredients : {addedItems.length}</p>
            <div style={{display: listVisible?'none':'block'}}>
              {
                addedItems.map(item => (
                    <div className="card" key={item.id}>
                        <div className="row p-2 align-items-end">

                            <div className="col-1 content-right">
                              <button id="buttonA" name={item.item_name} className="btn btn-warning btn-sm" title="delete" type="button" onClick = {(e) => deleteIngredient(item.item_name)} >x</button>
                            </div>

                            <div className='col-5 px-5'>
                                {item.item_name}
                            </div>

                            <div className='col-3'>
                                {Math.round(item.amount)} {item.unit}
                            </div>
                        
                            <div className="col-3">
                              <button id="buttonA" name={item.item_name} className="btn btn-warning btn-sm" title="delete" type="button" onClick = {(e) => deleteIngredient(item.item_name)} >FIND SHOPS</button>
                            </div>

                        </div>
                    </div>
                ))
              }
            </div>
          </div>

      </div>
      </div>
      
      


        
    );
}
export default ShoppingListView;