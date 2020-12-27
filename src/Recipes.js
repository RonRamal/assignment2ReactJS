import React from 'react';
import Recipe from './Recipe';
import { Row } from 'react-bootstrap';

import './Recipe.css';

const Recipes =(props) =>{
    
    const recipes = props.recipes;
    const {btnText, show,title} = props;
    
    return(
    <div>
        {recipes.length>0&&<h1>{title}</h1>}
        <Row className="justify-content-center">
            {recipes.map((dish,key)=>
                <Recipe key={key} btnText={btnText} clickEvent={()=>show(dish)} recipe={dish}/>     
            )}
        </Row>
    </div>
    );
    
}
export default Recipes;