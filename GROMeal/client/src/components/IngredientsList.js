import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpoonApi from "../helpers/SpoonApi";

function ShoppingListView() {


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
            {
            recipes.map(recipe => (
                <div className="row card bg-light" key={recipe.id}>
                    
                   
                    
                    <h6>Ready in: {recipe.readyInMinutes}</h6>
                    <h6>Servings: {recipe.servings} </h6>
                    <h6>Notes: {recipe.cuisines} </h6>
                    <img src={recipe.image} alt="recipe"></img>
                  
                        {/* <button onClick={(e) => props.modifyEx(ex.id)} title="modify" type="button">
                            <input type="text">...</input>
                            MODIFY
                        </button> */}

                    {/* <div id="divButton" className="col-6 content-right">
                    <button className="col-6" onClick={(e) => props.deleteEx(ex.id)} title="delete" type="button">DELETE</button>
                    </div> */}
                </div>
            ))
        }


            </div>
    );
}
export default ShoppingListView;