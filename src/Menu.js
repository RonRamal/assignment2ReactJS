import React from 'react';
import {Link} from 'react-router-dom';



const Recipes =() =>{
 
    return(
    <div style={{margin:20,fontSize:35}}>
    <Link to="/">My Kitchen</Link> | &nbsp;
    <Link to="./Ingredient">Create New Ingredient</Link> | &nbsp;
    <Link to="./Recipe">Create New Recipe</Link>
    </div>
    )
    
}
export default Recipes;