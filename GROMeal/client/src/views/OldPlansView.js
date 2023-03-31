import React, { useEffect, useState, useContext } from 'react';
//import { useParams } from 'react-router-dom';
//import { Link, Outlet } from "react-router-dom";
import Api from '../helpers/Api';
import ShowOldPlans from '../components/ShowOldPlans';
import RecipesContext from "../components/RecipesContext";

function OldPlansView(props) {
   
    const { userPlans } = useContext(RecipesContext);

    return (
        
        
        <div className='banner1 pt-5' style={{minHeight: '600px', backgroundColor: '#FFCC00'}}>
      <div className='container-fluid col-10'>
      <h1 className="col-10 pt-5" id="title" style={{marginBottom: '15px'}}>My Plans</h1>
                <ShowOldPlans plans={userPlans} /> 
      </div>
     </div>
        
    );
}


export default OldPlansView;