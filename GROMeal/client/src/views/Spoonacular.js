import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SpoonApi from "../helpers/SpoonApi";

function Spoonacular() {
//    const [ search, setSearch ] = useState([]);
    
    //Calling Api data
    // useEffect(() => {
    //     searchRecipes();
    // },[]);

    // const searchRecipes = async () => {
    //   const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10`);
    //   const data = await api.json();
    //   console.log(data);
    //   setSearch(data.recipes);
    // }

    
        const [recipes, setRecipes] = useState([]);
    
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
    
        return (
            <div className="App">
                {/* <h1>Random Recipes from Spoonacular</h1>
                {
                recipes.map(recipe => (
                    <div className="row card bg-light" key={recipe.id}>
                        
                        <h5>{recipe.title}</h5>
                       
                        
                        <h6>Ready in: {recipe.readyInMinutes}</h6>
                        <h6>Servings: {recipe.servings} </h6>
                        <h6>Notes: {recipe.cuisines} </h6>
                        <img src={recipe.image} alt="recipe"></img> */}
                      
                            {/* <button onClick={(e) => props.modifyEx(ex.id)} title="modify" type="button">
                                <input type="text">...</input>
                                MODIFY
                            </button> */}

                        {/* <div id="divButton" className="col-6 content-right">
                        <button className="col-6" onClick={(e) => props.deleteEx(ex.id)} title="delete" type="button">DELETE</button>
                        </div> */}
                    {/* </div>
                ))
            } */}


                </div>
        );
    }



export default Spoonacular;