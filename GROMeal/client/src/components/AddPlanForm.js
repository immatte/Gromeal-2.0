import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RecipesContext from "./RecipesContext";
import Local from "../helpers/Local";

const EMPTY_PLAN = {
  plan_title: ''
};

function AddPlanForm(props) {

  //const [newPlan, setNewPlan] = useState(EMPTY_PLAN);
  const navigate = useNavigate();

 const {newPlan, setNewPlan, editingPlan, setEditingPlan } = useContext(RecipesContext);
  
 async function handleSubmit(event) {
    event.preventDefault();
    
    if (props.user) {
    let plan1 = await props.addPlanUser(newPlan);
    setNewPlan(EMPTY_PLAN);
    navigate(`/recipes/${plan1[0].id}`);
    
    } else {
    let plan = await props.addPlanCb(newPlan);
    Local.savePlan(plan[0].id);
    //Local.savePlan(userPlans[0].id);
    setNewPlan(EMPTY_PLAN);
    navigate(`/recipes/${plan[0].id}`);
    //navigate(`/recipes/${userPlans[0].id}`);
    // console.log(newPlan);
    }
    // console.log(plan);
  }
  

  function handleChange(event) {
    let { name, value } = event.target;
        setNewPlan(data => ({
            ...data, 
            [name]: value
        }));
    }

  
return (
  <div>
    
    <form onSubmit={handleSubmit} className="col-7">
                
         <div className="row justify-content-between text-left">
            <div className="form-group col-12 flex-column d-flex">
                {/* <h5 style={{ color: 'white', fontWeight: 'initial'}} className="mb-2">Start by giving a title to your plan</h5> */}
                <label className="form-control-label px-1"></label>
                <input required className="form-control form-control-lg" style={{ fontSize: 'large'}} type="text" id="ans" name="plan_title" placeholder="My plan title..."
                value={newPlan.plan_title}
                onChange={handleChange}
            />  
          </div>
          </div>
          {/* <div class="row justify-content-between text-left">
            <div class="form-group col-12 flex-column d-flex">
                <label className="form-control-label px-1"></label>
                <input type="date" id="ans" name="creationDate" placeholder="Toda's Date"
                value={newProgram.creationDate}
                onChange={handleChange}
            />  
          </div>
          </div> */}

        <div className="row mt-3">
           {editingPlan ?
            <div> 
            <button id="buttonA" className="btn btn-warning px-5 btn-lg" type="submit">SAVE</button> 
            </div> :
            <div> 
            <button id="buttonA" className="btn btn-warning px-5 btn-lg" type="submit">START</button> 
            </div>
            }
        </div>
    </form>
    </div>
);

} 

  export default AddPlanForm;