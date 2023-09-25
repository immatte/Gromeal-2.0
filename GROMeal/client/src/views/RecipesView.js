import React, { useState, useEffect, useContext} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useParams, Route, Routes, useNavigate } from 'react-router-dom';
import SpoonApi from "../helpers/SpoonApi";
import "./RecipesView.css";
import Api from '../helpers/Api';
import RecipesContext from "../components/RecipesContext";
import ProgressBar from '../components/ProgressBar';
import 'react-toastify/dist/ReactToastify.css';

/* EMPTY SEARCH WHEN PAGE IS LOAD OR WHEN BUTTON CLEAR ALL IS CLICKED*/
const EMPTY_SEARCH = {
    dishType: '',
    cuisines: '',
    diets: ''
};

function RecipesView(props){
    
    //User plan Id from old plans
    const { planId } = useParams();
    //Used when for search feature
    const [search, setSearch] = useState(EMPTY_SEARCH);
    //Used for filtered recipes once Search button is pressed
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    //From RecipesContext - variables set on '..\App.js'
    const {recipes, setRecipes, setPlanRecipes, editingRecipeId, setEditingRecipeId, featVisible, setfeatVisible, showFeatRecipe, setAddedRecipe, featRecipe, addedRecipe, setFeatRecipe } = useContext(RecipesContext);

    //WHEN LOADING THE PAGE
    /* Effet 1. Populating 'recipes' with array of 100 objects */
    useEffect(() => {
        getRandomRecipes();
    }, []);
    /* Effet 2. Setting recipes = filteredRecipes, as to avoid errors
       before pressing on search button*/
    useEffect(() => {
        setFilteredRecipes(recipes);
    }, [recipes]);

    async function getRandomRecipes() {
        let uresponse = await SpoonApi.getRandomRecipes();
        console.log(uresponse);
        if (uresponse.ok) {
            setRecipes(uresponse.data.recipes);
            
        } else {
            console.log('Error:', uresponse.error);
        }

    }

    //FETCH POST NEW RECIPE FROM USER
    const addRecipe = async () => {
        try {
            let response = await Api._doFetch(`/api/recipes/${planId}`, 'POST', addedRecipe);
            console.log(response);
            if (response.ok) {  
                console.log('Recipe added!')
            } else {
                console.log(`Server error: ${response.status}:
                ${response.statusText}`);
            }
            
        } catch (err) {
            console.log(`Network error: ${err.message}`);
        }
        console.log(addedRecipe)
      };

    //PUT function to modify a recipe
    async function modifyRecipe() {
        let options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addedRecipe)
        };

        try {
            let response = await fetch(`/api/recipes/${planId}/${editingRecipeId}`, options);
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

    //MAKE VISIBLE RECIPE DETAILS WHEN CLICKING ON A RECIPE FROM THE GRID
    //showFeatRecipe is called from '../App.js'
    const handleChangeView = (featVisible) => {
        setfeatVisible(featVisible);
      };

    //FORM INPUT
    const handleChange = event => {
        let  value  = event.target.value;
        let name = event.target.name;
        setAddedRecipe((addedRecipe) => ({...addedRecipe, [name]: value}));
    };

    //WHEN SUBMITTING FORM -> ADD RECIPE
    const handleSubmit = event => {
        event.preventDefault();
        //if modification coming from '.\WeekPlanView.js' edit the recipe with previous PUT function
        if (editingRecipeId) {
            modifyRecipe();
            setEditingRecipeId(null);
            let message = `Successfully modified! : ${addedRecipe.servings} portions on ${addedRecipe.week_day} at ${addedRecipe.meal_type}`
            toast(message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                })
        //else adding a recipe to addedRecipe
        } else {        
        addRecipe(addedRecipe);
        let message = `Successfully added! : ${addedRecipe.servings} portions on ${addedRecipe.week_day} at ${addedRecipe.meal_type}`
        toast(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
        setAddedRecipe((addedRecipe) => ({...addedRecipe, meal_type: "", week_day: "", servings: 1}));
        };

    };
    
    //SEARCH INPUT
    const handleSearchChange = event => {
        let  value  = event.target.value;
        let name = event.target.name;
        setSearch((search) => ({...search, [name]: value}));     
    };
    
    // WHEN SUBMITTING ON SEARCH BAR (SEARCH BUTTON)
    const handleSearchSubmit = event => {
        event.preventDefault(); 
        let newGrid = recipes;
        if(search.dishType){
            newGrid = newGrid.filter(recipe => recipe.dishTypes.includes(search.dishType));
        }
        if(search.cuisines){
            newGrid = newGrid.filter(recipe => recipe.cuisines.includes(search.cuisines));
        }
        if(search.diets){
            newGrid = newGrid.filter(recipe => recipe.diets.includes(search.diets));
        }

        setFilteredRecipes(newGrid);
    };

    // WHEN CLICKING ON 'CLEAR ALL' BUTTON
    const clearSearch = event => {
        event.preventDefault(); 
        setFilteredRecipes(recipes)
        setSearch((search) => ({...search, dishType: "", cuisines: "", diets: ""}));
    }
    
    //ARRAYS NEEDED FOR DROPDOWNS
    let weekDayArray = ['monday', 'tuesday', 'wednesday', 'thursday', "friday", "saturday", "sunday"];
    let mealType = ['breakfast', "lunch", "dinner"];
    let dishType = ["soup","main dish","dessert","side dish","starter","snack","dinner","lunch","breakfast"];
    let cuisines = ["Italian","Mediterranean","European","Mexican","French","Greek"];
    let diets = ["vegan","vegetarian","gluten free","dairy free","lacto ovo vegetarian"];

    //VARIABLES CREATED TO USE IN HTML PART VISIBILITY
    let recipeSteps = featRecipe && featRecipe.analyzedInstructions[0].steps;
    let recipeIngredients = featRecipe && featRecipe.extendedIngredients;  

    return (
    
    <div className="row p-0 m-0">
        <div className="card pt-5 pb-5 align-items-center" id="searchBar"> 
            <div className="container justify-content-between">
                <div className="row col-12 mx-auto">
                    <div className="col-2 mx-auto">
                        <NavLink id="backNext" className='col' to="/">
                            BACK 
                        </NavLink>
                    </div>
                    <div className="col-8 mx-auto align-items-center"><ProgressBar activeStep={0}/></div>
                    <div className="col-2 mx-auto text-end">
                        <NavLink id="backNext" className='col'to={`/weekPlan/${planId}`}>
                            NEXT
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className='col-9 align-items-left'>
                <h1 className="pb-3 pt-5" id="title">Select your favorite meals</h1>           
                <form className="row form-group d-flex justify-content-left" onSubmit={ handleSearchSubmit }>
                    <label className="col-4">
                        Dish type
                        <select className = "form-select form-select-md" name='dishType' id="selected" value={search.dishType}
                            onChange = { handleSearchChange }
                            >
                            <option selected id="editOptions" value={""}></option> 
                            { dishType.map(dish => (
                                <option id="editOptions" value={dish}>{dish}</option>
                            )) }

                        </select>
                    </label>
                    <label className="col-4">
                        Cuisine (Italian, French, etc)
                        <select className = "form-select form-select-md" name='cuisines' id="selected" value={search.cuisines}
                            onChange = { handleSearchChange }
                            >
                            <option selected id="editOptions" value={""}></option> 
                            { cuisines.map(food => (
                                <option id="editOptions" value={food}>{food}</option>
                            )) }

                        </select>
                    </label>
                    <label className="col-4">
                        Diet type
                        <select className = "form-select form-select-md" name='diets' id="selected"  value={search.diets}
                            onChange = { handleSearchChange }
                            >
                            <option selected id="editOptions" value={""}></option> 
                            { diets.map(diets => (
                                <option id="editOptions" value={diets}>{diets}</option>
                            )) }
                        </select>
                    </label>
                    <div className="mt-2 mb-5">
                        <button className='col-2 btn btn-lg' id="buttonA">SEARCH</button>
                        <button className='col-2 btn btn-lg mx-2' id="buttonA" onClick={ clearSearch }>CLEAR ALL</button>
                    </div>
                </form>
            </div>
        </div>  
        <div className="gridFeat">
            {featRecipe && <div id={featRecipe.id} className= { featVisible ? "invisible" : 'visible' }> 
            <div className="featBlock px-4">
                <img src={featRecipe.image} alt="recipe" className="featImage"></img>
                <div>
                    <div className="featLegend">
                        <h3 className="featLegendText">{featRecipe.title}</h3>
                        <h4 className="featLegendText">Ready in: {featRecipe.readyInMinutes} min</h4>
                        
                        <ol className="featText">
                            {
                                recipeSteps.map(steps =>
                                <li>{steps.step}</li>
                                    )
                            }
                        </ol>
                        <h5 className="featLegend">Ingredients</h5>
                        <ol className="featIngredients">
                            {
                                recipeIngredients.map(ingredient =>
                                <li>{ingredient.name}</li>
                                    )
                            }
                        </ol>
                    </div>
                    <div>
                        <form className="col-11 pb-5 mt-3 align-items-center" onSubmit = {handleSubmit}>
                            <h5 className="featLegend">I want to eat this meal on :</h5>
                            <div className="featLegendform">
                                <label className="col">
                                    Select a day
                                    <select required className ="form-select form-select-md" name='week_day' id="selected" value={addedRecipe.week_day}
                                        onChange = { handleChange }
                                        >
                                        <option selected id="editOptions" value={""}></option> 
                                        { weekDayArray.map(day => (
                                            <option id="editOptions" value={day}>{day}</option>
                                        )) }
                                    </select>
                                </label>
                                    {addedRecipe.week_day && <label className="col">
                                    Select a meal
                                    <select required className = "form-select form-select-md" name='meal_type' id="selected" value={addedRecipe.meal_type}
                                        onChange = { handleChange }
                                        >
                                        <option selected id="editOptions" value={""}></option> 
                                        { mealType.map(meal => (
                                            <option id="editOptions" value={meal}>{meal}</option>
                                        )) }
                                    </select>
                                </label>}
                                    {addedRecipe.meal_type &&<label className="col">
                                    Serving
                                    <input className = "form-control form-control-md" type="number" id="serving" name="servings" value={addedRecipe.servings}
                                    min="1"
                                    onChange = { handleChange }
                                    ></input>
                                </label>}
                            </div>
                            <div className="d-flex justify-content-right">
                                <label className="col">
                                    <button id="buttonA" className="col btn btn-md mt-1">
                                        ADD RECIPE
                                    </button>
                                </label>
                                <ToastContainer
                                    position="//#region"
                                    autoClose={10}
                                    hideProgressBar
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="dark"
                                />   
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
        }                               
        <div className="gridContainer">            
            <div id="recipesGrid"className="m-0 px-4 mt-4">
                {
                filteredRecipes.map(recipe => (
                    <div  onClick={() => handleChangeView(false)}>
                        <div className="recipeBlock" id={recipe.id} key={recipe.id} onClick={() => showFeatRecipe(recipe.id)}>
                            <img src={recipe.image} alt="recipe"></img>
                            <h5 className="imageLeg" id='recipeTitle'>{recipe.title}</h5>
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

export default RecipesView;