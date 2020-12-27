import React from 'react'
import { Col  } from 'react-bootstrap';
import './Recipe.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Recipe=(props)=> { 
    
    const {recipe,btnText,clickEvent} = props;
    return ( 
        <Col>
        <div className="Recipe-div">
         <img  src={recipe.ImageURL} alt={ recipe.Name }/>   
            <div>
              <div>
                  <h3>{recipe.Name}</h3>
              </div>  
              <p>{recipe.CookingMethod}</p>
              <button type="button" className="btn btn-primary" onClick={()=>clickEvent(recipe)}> {btnText} </button>
            </div>          
        </div>
        </Col>
        
    );
}
export default Recipe;
