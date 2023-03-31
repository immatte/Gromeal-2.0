import React, { useState, useEffect, useContext} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useParams, Route, Routes, useNavigate } from 'react-router-dom';
import SpoonApi from "../helpers/SpoonApi";
import "./RecipesView.css";
import Api from '../helpers/Api';
import RecipesContext from "../components/RecipesContext";
import LoginView from "./LoginView";
import ProgressBar from '../components/ProgressBar';
import 'react-toastify/dist/ReactToastify.css';


// const EMPTY_FORM = {
//     API_id: 0,
//     recipe_title: '',
//     recipe_image: '',
//     servings: 1,
//     meal_type: '',
//     week_day: '',
// };

const EMPTY_SEARCH = {
    dishType: '',
    cuisines: '',
    diets: ''
};


function RecipesView(props){
    
    const { planId } = useParams();
    //const [featVisible, setfeatVisible] = useState(true);
    const [search, setSearch] = useState(EMPTY_SEARCH);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const {recipes, setRecipes, setPlanRecipes, editingRecipeId, setEditingRecipeId, featVisible, setfeatVisible, showFeatRecipe, setAddedRecipe, featRecipe, addedRecipe, setFeatRecipe } = useContext(RecipesContext);

    useEffect(() => {
        getRandomRecipes();
    }, []);

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
    
    //WORKING
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

   
    
    //WORKING
    const handleChangeView = (featVisible) => {
        setfeatVisible(featVisible);
      };

    //FORM INPUT
    const handleChange = event => {
        // console.log(event.target.id)
        let  value  = event.target.value;
        // console.log(value)
        let name = event.target.name;
        setAddedRecipe((addedRecipe) => ({...addedRecipe, [name]: value}));
        // getRecipes(planRecipes)
        // if(planRecipes.)
    };
    
    // console.log(planRecipes[0].week_day)

    // for(let recipe of planRecipes){
    //     console.log(recipe)

    // }

    console.log(addedRecipe.week_day);

    //WHEN SUBMITTING FORM -> ADD RECIPE
    const handleSubmit = event => {
        event.preventDefault();
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
            
        } else {        
        addRecipe(addedRecipe);
        // console.log('hello')
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
        // console.log(event.target.id)
    
        let  value  = event.target.value;
        console.log(value)
        let name = event.target.name;
        
        setSearch((search) => ({...search, [name]: value}));
            
    };
    
    // WHEN SUBMITTING ON SEARCH BAR
    const handleSearchSubmit = event => {
        event.preventDefault();     
        // console.log("hello")
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

    const clearSearch = event => {
        event.preventDefault(); 
        setFilteredRecipes(recipes)
        setSearch((search) => ({...search, dishType: "", cuisines: "", diets: ""}));
    }

    //DRAGGABLE MENU
    const handleDragEnd = (event) => {
        setX(event.clientX);
        setY(event.clientY);
        };
    
    //ARRAYS NEEDED FOR DROPDOWNS
    let weekDayArray = ['monday', 'tuesday', 'wednesday', 'thursday', "friday", "saturday", "sunday"];
    let mealType = ['breakfast', "lunch", "dinner"];
    let dishType = ["soup","main dish","dessert","side dish","starter","snack","dinner","lunch","breakfast"];
    let cuisines = ["Italian","Mediterranean","European","Mexican","French","Greek"];
    let diets = ["vegan","vegetarian","gluten free","dairy free","lacto ovo vegetarian"];

    
    // console.log(recipes.dishTypes)
    let recipeSteps = featRecipe && featRecipe.analyzedInstructions[0].steps;


    return (
        <div className="row p-0 m-0">

           <div className="card pt-5 pb-5 align-items-center" id="searchBar"> 

           <div className="container justify-content-between">
           <div
                // draggable
                // onDragEnd = {handleDragEnd}
                // style={{
                //         position: "absolute",
                //         left: x,
                //         top: y
                // }}
           >
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
                <div className="featBlock px-4" style={{maxHeight: '400px'}}>
                    <img src={featRecipe.image} alt="recipe" className="featImage"></img>
                    <div className="featLegend">
                        <h3 className="featLegendText">{featRecipe.title}</h3>
                        <h4 className="featLegendText">Ready in: {featRecipe.readyInMinutes} min</h4>
                        
                        <ol className="featText" style={{maxWidth: '550px', maxHeight: '300px'}}>
                            {
                                recipeSteps.map(steps =>
                                <li>{steps.step}</li>
                                    )
                            }
                        </ol>
                        <div>
                    
    <form className="col-11 pb-5 mt-3 align-items-center" onSubmit = {handleSubmit}>
    <h5 className="featLegend" style={{fontWeight: 'bold'}}>I want to eat this meal on :</h5>
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
        </div>
        <div>
            
        </div>

    </form>
</div>
                        
                    </div>
                    

                </div>
            </div>
                }    

<div>
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
                               


            <div className="gridContainer">            
            <div id="recipesGrid"className="m-0 px-4 mt-4">
                {
                filteredRecipes.map(recipe => (
                    <div  onClick={() => handleChangeView(false)}>
                        <div className="recipeBlock" id={recipe.id} key={recipe.id} onClick={() => showFeatRecipe(recipe.id)}>
                            <img src={recipe.image} alt="recipe"></img>
                            <h5 className="imageLeg" id='recipeTitle'>{recipe.title}</h5>
                            {/* <h6 className="imageLeg">Ready in: {recipe.readyInMinutes} min</h6> */}
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