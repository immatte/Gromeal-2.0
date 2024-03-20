import React, { useEffect, useState } from 'react';
import { NavLink, useParams, Route, Routes, useNavigate } from 'react-router-dom';
import SpoonApi from "../helpers/SpoonApi";
import RecipesContext from "../components/RecipesContext";
import { useContext } from "react";
import ProgressBar from '../components/ProgressBar';


import Api from '../helpers/Api';

function ShopsView() {

  const { planId } = useParams();
  const { addedItems, setAddedItems} = useContext(RecipesContext);
  console.log(addedItems);
  //get shops by product name (or id?)

  const [shopIds, setShopIds] = useState([]); // State to store shop IDs

  // Function to extract shop IDs from added items
  function getShopIdsForAddedItems(addedItems) {
    const ids = addedItems.map(item => item.shop_id);
    return [...new Set(ids)]; // Use Set to ensure unique shop IDs
  }

  useEffect(() => {
    const ids = getShopIdsForAddedItems(addedItems);
    setShopIds(ids);
  }, [addedItems]); // Fetch shop IDs whenever addedItems changes
  
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
            {/* <button id="buttonA" className="btn btn-warning btn-md col-4" onClick={downloadPdf}>DOWNLOAD</button> */}
            </div>
            
          {
            addedItems.map(item => (
                <div className="card nav-tabs" key={item.id}>
                    <div className="row p-2">
                        <div className='col-6 px-5'>
                            
                            {item.item_name}
                        </div>
                        <div className='col-3'>
                            {Math.round(item.amount)}
                        </div>
                    
                        <div className='col-1'>
                            
                            {item.unit}
                        </div>
                        {/* <div className="col-1 content-right">
                          <button id="buttonA" name={item.item_name} className="btn btn-warning btn-sm" title="delete" type="button" onClick = {(e) => deleteIngredient(item.item_name)} >x</button>
                        </div> */}
                    </div>
                </div>
            ))
          }
        </div>
    </div>
    </div>
);
}
export default ShopsView;