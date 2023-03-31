import { useEffect, useContext } from "react";
import React, { useState } from "react";
import { useParams, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import "./WeekPlanView.css";
import WeekPlanCard from "../components/WeekPlanCard";
//import planRecipesView from "./planRecipesView";
import Spoonacular from "./Spoonacular";
//import './App.css';
//import { Link } from 'react-router-dom';
import RecipesContext from "../components/RecipesContext";
import ProgressBar from '../components/ProgressBar';

function WeekPlanView(props) {

    const [recipes, setRecipes] = useState([]);
    const { planId } = useParams();
    const navigate = useNavigate();
    // const [editingRec, setEditingRec] = useState(null);
    const {warning, setWarning, user, setUser, userPlans, planRecipes, updatePlanRecipes} = useContext(RecipesContext);

    useEffect(() => {
      getRecipes();      
    }, []);
  
    // function handleClick(rId) {
    //   setEditingRec(rId)
    // }

  // Get All Recipes from a plan
  async function getRecipes() {
  
    try {

      let response = await fetch(`/api/recipes/${planId}`);

      if (response.ok) {
          let planRecipes = await response.json();
          updatePlanRecipes(planRecipes);
      } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }
  }
  
  
// DELETE a recipe
async function deleteRecipe(id) {
  let confirm = window.confirm("Are you sure you want to delete this recipe?")
    
  if (confirm) {
  // Define fetch() options
  let options = {
      method: 'DELETE'
  };

  try { //Do I need the last id?
      let response = await fetch(`/api/recipes/${planId}/${id}`, options);
      if (response.ok) {
          let planRecipes = await response.json();
          updatePlanRecipes(planRecipes);
      } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }
}
}

let mondayBreakfast = planRecipes.filter(r => r.meal_type === "breakfast" && r.week_day === "monday");
let mondayLunch = planRecipes.filter(r => r.meal_type === "lunch" && r.week_day === "monday");
let mondayDinner = planRecipes.filter(r => r.meal_type === "dinner" && r.week_day === "monday");
//console.log(mondayLunch);

let tuesdayBreakfast = planRecipes.filter(r => r.meal_type === "breakfast" && r.week_day === "tuesday");
let tuesdayLunch = planRecipes.filter(r => r.meal_type === "lunch" && r.week_day === "tuesday");
let tuesdayDinner = planRecipes.filter(r => r.meal_type === "dinner" && r.week_day === "tuesday");

let wednesdayBreakfast = planRecipes.filter(r => r.meal_type === "breakfast" && r.week_day === "wednesday");
let wednesdayLunch = planRecipes.filter(r => r.meal_type === "lunch" && r.week_day === "wednesday");
let wednesdayDinner = planRecipes.filter(r => r.meal_type === "dinner" && r.week_day === "wednesday");

let thursdayBreakfast = planRecipes.filter(r => r.meal_type === "breakfast" && r.week_day === "thursday");
let thursdayLunch = planRecipes.filter(r => r.meal_type === "lunch" && r.week_day === "thursday");
let thursdayDinner = planRecipes.filter(r => r.meal_type === "dinner" && r.week_day === "thursday");

let fridayBreakfast = planRecipes.filter(r => r.meal_type === "breakfast" && r.week_day === "friday");
let fridayLunch = planRecipes.filter(r => r.meal_type === "lunch" && r.week_day === "friday");
let fridayDinner = planRecipes.filter(r => r.meal_type === "dinner" && r.week_day === "friday");

let saturdayBreakfast = planRecipes.filter(r => r.meal_type === "breakfast" && r.week_day === "saturday");
let saturdayLunch = planRecipes.filter(r => r.meal_type === "lunch" && r.week_day === "saturday");
let saturdayDinner = planRecipes.filter(r => r.meal_type === "dinner" && r.week_day === "saturday");

let sundayBreakfast = planRecipes.filter(r => r.meal_type === "breakfast" && r.week_day === "sunday");
let sundayLunch = planRecipes.filter(r => r.meal_type === "lunch" && r.week_day === "sunday");
let sundayDinner = planRecipes.filter(r => r.meal_type === "dinner" && r.week_day === "sunday");

//WARNING MESSAGE TO LOGIN

const handleWarning = event => {
  event.preventDefault();
  // console.log(user)
  let warning = "";
  if(user === null){
    warning = `Please login or register to see your shopping list`
    console.log(warning)
    setWarning(warning)
        }
  }
 return (
    
      <div id="weekPlanView" className="justify-content-center container-fluid-md">

      <div className="container pt-3 align-items-center">
                    <div className="row col-12 mx-auto">
                    <div className="col-2 mx-auto">
                        <NavLink id="backNext" className='col' to={`/recipes/${planId}`}>
                            BACK 
                        </NavLink>
                    </div>
                    <div className="col-8 mx-auto align-items-center"><ProgressBar activeStep={1}/></div>
                    <div className="col-2 mx-auto text-end" onClick={handleWarning}>
                        <NavLink id="backNext" className='col'to={`/shoppinglist/${planId}`}>
                            NEXT
                        </NavLink>
                    </div>

                </div>
                </div>         
      <div>
        <h1 className="mb-4 mt-5 mx-5"id="title">My Week Plan</h1>
      </div>
      <div id="weekNamesGrid" class="row col-12">
          <div id="mealTypeEmpty"></div>
          <div id="weekName" class="col colWP">MONDAY</div>
          <div id="weekName" class="col colWP">TUESDAY</div>
          <div id="weekName" class="col colWP">WEDNESDAY</div>
          <div id="weekName" class="col colWP">THURSDAY</div>
          <div id="weekName" class="col colWP">FRIDAY</div>
          <div id="weekName" class="col colWP">SATURDAY</div>
          <div id="weekName" class="col colWP">SUNDAY</div>
          <div></div>
      
          <div id="mealType1"> BREAKFAST   
          </div>

          <div id="mealType"class="m-0 p-0 col colWP">
          {
              mondayBreakfast.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              tuesdayBreakfast.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              wednesdayBreakfast.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              thursdayBreakfast.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe} />
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              fridayBreakfast.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              saturdayBreakfast.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              sundayBreakfast.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div class="w-100"></div>
          
          <div id="mealType1">LUNCH</div>
          <div id="mealType" class="m-0 p-0 col colWP">    
          {
              mondayLunch.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          
          </div>
          
          <div id="mealType" class="m-0 p-0 col colWP">
          {
              tuesdayLunch.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              wednesdayLunch.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              thursdayLunch.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              fridayLunch.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              saturdayLunch.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              sundayLunch.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div class="w-100"></div>

          <div id="mealType1">DINNER</div>
          <div id="mealType" class="m-0 p-0 col colWP">    
          {
              mondayDinner.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}         
          </div>

          <div  id="mealType" class="m-0 p-0 col colWP">
          {
              tuesdayDinner.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              wednesdayDinner.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              thursdayDinner.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              fridayDinner.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              saturdayDinner.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}
          </div>

          <div id="mealType" class="m-0 p-0 col colWP">
          {
              sundayDinner.map(recipe => (
                <WeekPlanCard recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))}          
          </div>

          <div class="w-100"></div> 
        </div> 
        
    </div>
  
  );
}



export default WeekPlanView;