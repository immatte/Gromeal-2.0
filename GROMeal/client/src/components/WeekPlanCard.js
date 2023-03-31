//import { useParams, Routes, Route } from "react-router-dom";
import "./WeekPlanCard.css";
import { useNavigate } from "react-router-dom";
import RecipesContext from "./RecipesContext";
import { useContext } from "react";

function WeekPlanCard(props) {
    const {recipe} = props
    //const { planId } = useParams();
    const navigate = useNavigate();
    const {recipes, setRecipes, setEditingRecipeId, showFeatRecipe, featVisible, setfeatVisible, setAddedRecipe, featRecipe, addedRecipe, setFeatRecipe } = useContext(RecipesContext);
    
function handleClick(recipe) {
    const { id, API_id, recipe_title, recipe_image, servings, meal_type, week_day, plan_id} = recipe;
    setAddedRecipe({ API_id, recipe_title, recipe_image, servings, meal_type, week_day});
    showFeatRecipe(API_id);
    setfeatVisible(false);
    setEditingRecipeId(id);
    navigate(`/recipes/${plan_id}`);
}
 
return (
    <div id="WPcard"className="row p-0 m-0" key={recipe.id} title="Click here to modify">
        
        <p className="d-flex flex-row-reverse p-0 m-0"><button id="deleteButtonRecipe" className="col-2 btn btn-danger" onClick={(e) => props.deleteRecipe(recipe.id)} title="delete" type="button"> X </button></p>
        <div className="m-0 p-0 row" id="WPcard" onClick={e => handleClick(recipe)}>
        <p className="col colWP" id="titleRec">{recipe.recipe_title}</p>
        <img className="col " id="recImg" src={recipe.recipe_image} /> 
        </div>       
        <div>
        </div>     
    </div> 
 );   
}



export default WeekPlanCard;