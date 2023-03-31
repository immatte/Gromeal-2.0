import React, { useEffect, useState } from 'react';
import { NavLink, useParams, Route, Routes, useNavigate } from 'react-router-dom';
import SpoonApi from "../helpers/SpoonApi";

import ProgressBar from '../components/ProgressBar';


import Api from '../helpers/Api';
import { jsPDF } from "jspdf";


const API_KEY = "5e24157871f640c684861272be1907c9";
const ISA_KEY = "0fe1d39b2dbf4cb5a8737ca807512217";
const ANAMARI_KEY = "ed26cdd2c2ed48398cc8d8d88a1b8782";
const ANAMARI_KEY2 = "02d7327dca734133ac458e767e8373b3";
const ANAMARI_KEY3 = "44cd6e5f97844750bb59d8bb5f69370d";
const ANAMARI_KEY4 = "2249a308392d4fefb388c16c01db781a";


function ShoppingListView() {

    const [recipes, setRecipes] = useState([]);
    const [planRecipes, setPlanRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    // const [pdf, setPdf] = useState(null);
    const { planId } = useParams();
  
    useEffect(() => {
        getRandomRecipes();
    }, []);

    async function getRandomRecipes() {
        let uresponse = await SpoonApi.getRandomRecipes();
        console.log(uresponse);
        if (uresponse.ok) {
            setRecipes(uresponse.data.recipes);
            
        } else {
            console.log('Error:', uresponse.error);
        }

    }

    useEffect(() => {
      getPlanRecipes();
    }, []);

    // useEffect(() => {
    //     getIngredients();
    //   }, [planRecipes]);

    

  //Get all recipes of the json
  //Find the API_id for each planRecipe
  
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
console.log(planRecipes);
  //planRecipes es un array de objetos


// get original servings of each plan recipe

// function findServings(recipeName) {
//   const recipe = recipes[recipeName];
//   let totalServings = recipe.servings;
//   for (const ingredient in recipe.ingredients) {
//     const amount = recipe.ingredients[ingredient].amount;
//     const servingSize = recipe.ingredients[ingredient].servingSize;
//     totalServings *= amount / servingSize;
//   }
//   return totalServings;
// }

// 


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
console.log(ingredients);
// console.log(ingredients);
// const shoppingList = []
    
//             for (let i = 0; i < ingredients.length; i++) {
//                 let array = ingredients[i].ingredients;
//                 // console.log(ingredients);
//                 for (let j = 0; j < array.length; j++) {
//                     console.log(array);
//                     let newObject = {}
//                     // newObject.id = 0;
//                     console.log(newObject.id);
//                     newObject.item_name = array[j].name;
//                     newObject.amount = array[j].amount.metric.value;
//                     newObject.unit = array[j].amount.metric.unit;
//                     console.log(newObject);
//                     shoppingList.push(newObject);    
//                 }
//             }
//             console.log(shoppingList);



        const shoppingList = [{id: 1, item_name: 'canned corn', amount: 425.243, unit: 'g'},
        {id: 2, item_name: 'canned black beans', amount: 425.243, unit: 'g'},
        {id: 3, item_name: 'sweet diced canned tomatoes', amount: 411.068, unit: 'g'}, 
        {id: 4, item_name: 'canned swanson premium chicken', amount: 170.097, unit: 'g'},
        {id: 5, item_name: 'canned enchilada sauce', amount: 283.495, unit: 'g'},
        {id: 6, item_name: "canned campbell's cream of mushroom soup", amount: 304.757, unit: 'g'},
        {id: 7, item_name: 'milk', amount: 366, unit: 'ml'},
        {id: 8, item_name: 'tortilla chips', amount: 4, unit: 'servings'}, 
        {id: 9, item_name: 'shredded cheese', amount: 4, unit: 'servings'}, 
        {id: 10, item_name: 'canned corn', amount: 425.243, unit: 'g'}, 
        {id: 11, item_name: 'canned black beans', amount: 425.243, unit: 'g'}, 
        {id: 12, item_name: 'sweet diced canned tomatoes', amount: 411.068, unit: 'g'}, 
        {id: 13, item_name: 'canned swanson premium chicken', amount: 170.097, unit: 'g'}, 
        {id: 14, item_name: 'canned enchilada sauce', amount: 283.495, unit: 'g'}, 
        {id: 15, item_name: "canned campbell's cream of mushroom soup", amount: 304.757, unit: 'g'}, 
        {id: 16, item_name: 'milk', amount: 366, unit: 'ml'}, 
        {id: 17, item_name: 'tortilla chips', amount: 4, unit: 'servings'}, 
        {id: 18, item_name: 'shredded cheese', amount: 4, unit: 'servings'}, 
        {id: 19, item_name: 'canned cherry pie filling', amount: 236.588, unit: 'ml'}, 
        {id: 20, item_name: 'cocoa powder', amount: 3, unit: 'Tbsps'}, 
        {id: 21, item_name: 'cream cheese', amount: 1.5, unit: 'pkg'}, 
        {id: 22, item_name: 'eggs', amount: 2, unit: ''}, 
        {id: 23, item_name: 'gelatin', amount: 0.571, unit: 'tsps'}, 
        {id: 24, item_name: 'heavy cream', amount: 238, unit: 'ml'}, 
        {id: 25, item_name: 'oreo cookies', amount: 12, unit: ''}, 
        {id: 26, item_name: 'powdered sugar', amount: 2, unit: 'Tbsps'}, 
        {id: 27, item_name: 'salt', amount: 1, unit: 'tsp'}, 
        {id: 28, item_name: 'semi-sweet chocolate chips', amount: 131.25, unit: 'ml'}, 
        {id: 29, item_name: 'sour cream', amount: 57.5, unit: 'ml'}]
        // {id: 30, item_name: 'sugar', amount: 133.333, unit: 'g'}, 
        // {id: 31, item_name: 'unsalted butter', amount: 1.521, unit: 'Tbsps'}, 
        // {id: 32, item_name: 'vanilla extract', amount: 0.323, unit: 'tsps'}, 
        // {id: 33, item_name: 'water', amount: 0.75, unit: 'cups'}, 
        // {id: 34, item_name: 'canned cherry pie filling', amount: 236.588, unit: 'ml'}, 
        // {id: 35, item_name: 'cocoa powder', amount: 3, unit: 'Tbsps'}, 
        // {id: 36, item_name: 'cream cheese', amount: 1.5, unit: 'pkg'}, 
        // {id: 37, item_name: 'eggs', amount: 2, unit: ''}, 
        // {id: 38, item_name: 'gelatin', amount: 0.571, unit: 'tsps'}, 
        // {id: 39, item_name: 'heavy cream', amount: 238, unit: 'ml'}, 
        // {id: 40, item_name: 'oreo cookies', amount: 12, unit: ''}, 
        // {id: 41, item_name: 'powdered sugar', amount: 2, unit: 'Tbsps'}, 
        // {id: 42, item_name: 'salt', amount: 1, unit: 'tsp'}, 
        // {id: 43, item_name: 'semi-sweet chocolate chips', amount: 131.25, unit: 'ml'}, 
        // {id: 44, item_name: 'sour cream', amount: 57.5, unit: 'ml'}, 
        // {id: 45, item_name: 'sugar', amount: 133.333, unit: 'g'}, 
        // {id: 46, item_name: 'unsalted butter', amount: 1.521, unit: 'Tbsps'}, 
        // {id: 47, item_name: 'vanilla extract', amount: 0.323, unit: 'tsps'}, 
        // {id: 48, item_name: 'water', amount: 0.75, unit: 'cups'}]

        //NEWLIST sum amounts when names match
        
        let newList = Object.values(shoppingList.reduce((value, object) => {
            if (value[object.item_name]) {
              value[object.item_name].amount += object.amount; 
              value[object.item_name].count++;
          
          } else {
              value[object.item_name] = { ...object , count : 1
              };
            }
            return value;
          }, {}));
          
           //add an id to every item in the list
        //   for (let index = 0; index < newList.length; index++) {
        //     newList[index].id = index + 1;
        //   }
        //If units is equal to "" or "servings", then replace with

        
        
    
    //POST SHOPPING ITEMS TO THE LIST (when creating the plan¿?)
    // const addItem = async (newList) => {
    
    //   try {
    //       let response = await Api._doFetch(`/api/recipes/${planId}`, 'POST', newList);
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
    
    // };

    // Add every item (POST)
    // for (let i = 0; i < newList.length; i++) {
    //   addItem(addedItem);
    //   setAddedItem((addedItem) => ({...addedItem, id: newList[i].id, item_name: `${newList[i].item_name}`, amount: newList[i].amount, unit: `${newList[i].unit}`}));
    // }
    // console.log(addedItem);


    //DELETE AN ITEM
// async function deleteItem( id) {
    // Define fetch() options
//     let options = {
//         method: 'DELETE'
//     };
  
//     try {
//         let response = await fetch(`/api/list/${planId}/${id}`, options);
//         if (response.ok) {
//             let items = await response.json();
//             setAddedItem(items);
//         } else {
//             console.log(`Server error: ${response.status} ${response.statusText}`);
//         }
//     } catch (err) {
//         console.log(`Server error: ${err.message}`);
//     }
//   }
          
    // DOWNLOAD FUNCTION
  let weekDayArray = ['monday', 'tuesday', 'wednesday', 'thursday', "friday", "saturday", "sunday"];

  const downloadPdf = event =>{
    var doc = new jsPDF({
      // unit:"mm"
    });
    shoppingList.forEach(function(ingredient,i){
      doc.text(50,10+i*10, ingredient.item_name + " " + ingredient.amount + " " + ingredient.unit +"\n" );
    });
    doc.setFontSize(5);

    doc.save("ShoppingList.pdf");
  }

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
                    <NavLink id="backNext" className='col'>
                        
                        </NavLink>
                    </div>

                </div>
                </div>   
      <div className='container-fluid col-10'>
      
        
        <div>
          <div className="row col-12 p-0 m-0 d-flex justity-content-between mb-2">
          <h1 className="col" id="title">My Shopping List</h1>
            <button id="buttonA" className="btn btn-warning btn-md col-4" onClick={downloadPdf}>DOWNLOAD</button>
            </div>
            
            {
            newList.map(item => (
                <div className="card" key={item.id}>
                    <div className="row p-2">
                         {/* <div className='col-1' >
                            
                            {item.id}
                        </div> */}
                        <div className='col-6 px-5'>
                            
                            {item.item_name}
                        </div>
                        <div className='col-3'>
                            {Math.round(item.amount)}
                        </div>
                    
                        <div className='col-1'>
                            
                            {item.unit}
                        </div>
                        <div className="col-1 content-right">
                          <button id="buttonA" className="btn btn-warning btn-sm" title="delete" type="button">x</button>
                        </div>
                    </div>
                </div>
            ))
        }
        </div>
    </div>
      </div>


        
    );
}
export default ShoppingListView;