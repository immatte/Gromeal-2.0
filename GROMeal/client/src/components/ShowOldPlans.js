import React, { useState, useEffect, useContext } from "react";
import { useParams, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RecipesContext from "./RecipesContext";
import AddPlanForm from './AddPlanForm';
import Api from '../helpers/Api';
import './ShowOldPlans.css';


function ShowOldPlans(props) {
 
  //const navigate = useNavigate();

  const { editingPlan, setEditingPlan, userPlans, setUserPlans, getUserPlans, newPlan, setNewPlan } = useContext(RecipesContext);

  function handleClick(planId) {
    setEditingPlan(planId)}
   
    useEffect(() => {
        getUserPlans();        
    }, []);

  //   useEffect(() => {
  //     getUserPlans();
  // }, []);

async function onDeletePlan(planId) {
  await deletePlan(planId);
  getUserPlans();
}

async function onModifyPlan(plan) {
  await modifyPlanTitle(plan);
  setEditingPlan(null);
  getUserPlans();
  
}

//Delete a plan
async function deletePlan(planId) {
  let confirm = window.confirm("Are you sure you want to delete this plan with all the recipes associated to it?")
  
  if (confirm) {
  // Define fetch() options
  
  try {
      let response = await Api._doFetch(`/api/plans/${planId}`, 'DELETE');
      if (response.ok) {
          //let plans = response.data;
          //setUserPlans(plans);         
      } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
      }
  } catch (err) {
      console.log(`Server error: ${err.message}`);
  }
}
}
console.log(editingPlan);
//console.log(plan);
// MODIFY THE TITLE OF A PLAN
  async function modifyPlanTitle(plan) {

    try {
        let response = await Api._doFetch(`/api/plans/${editingPlan}`, 'PUT', plan);
        if (response.ok) {
            let plans = response.data;
            setUserPlans(plans);            
        } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
  }
   

  return (
    <div className="ShowOldPlans">
    
          <div className="pt-1 pb-5">
                     
          {
                userPlans.map(p => (
                  <div className="row d-flex d-flex-inline pb-3" key={p.id}>
                  {editingPlan === p.id ? ( 
                    //<AddPlanForm addPlanCb={addPlan} plans={props.plans} /> 
                    <AddPlanForm addPlanCb={ p => onModifyPlan(p)} setEditingPlan={setEditingPlan}/> 
                    ) : ( 
                      <div className="row">
                  <div className="row col-4">
                  <button id="buttonA" className="btn btn-warning px-1 btn-md col" onClick={(e) => handleClick(p.id)} title="modify" type="button">MODIFY  TITLE</button>  
                  <button id="buttonA" className="btn btn-warning px-1 btn-md col mx-2" onClick={(e) => onDeletePlan(p.id)} title="delete" type="button"> DELETE  PLAN </button>
                  </div>
                  <div className="col-8 card m-0 pt-1 align-items-center"  title="Click here to edit it">
                  <Link id="planTitle" className="h5 m-0 p-0" to={`/weekPlan/${p.id}`} key={p.id}>{p.plan_title} 
                  
                  </Link>
                  </div>         
                  </div>
                  )
                  } </div>
                ))
              }           
    
    </div>
    </div>

    
  );
}

export default ShowOldPlans;