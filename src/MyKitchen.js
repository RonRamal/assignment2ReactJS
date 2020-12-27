import React from 'react';
import Recipes from './Recipes.js';
import ModalIngs from './Modal.js';
import IngredientCard from './IngredientCard.js'
import { Row } from 'react-bootstrap';

 class MyKitchen extends React.Component{
    constructor(props){
        super(props);
        this.ingredients = [];
        this.state={
            recipes:[],
            show:false,
            ingredientsToRender:[]
        }
    }
    componentDidMount(){
        this.getIngredients();
        this.getRecipes();
    }
    getRecipes=()=>{
        fetch("http://localhost:51468/api/Recipes")
        .then(res =>{
            console.log('res=', res);
            console.log('res.status', res.status);
            console.log('res.ok', res.ok);
            return res.json();
        })
        .then((result) => {
            result.forEach((item)=>{
                this.setState({recipes:[...this.state.recipes,item]})
           })
           
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
     }
    getIngredients=()=>{
      
        fetch("http://localhost:51468/api/ingredient")
        .then(res =>{
            console.log('res=', res);
            console.log('res.status', res.status);
            console.log('res.ok', res.ok);
            return res.json();
        })       
        .then((result) => {
            result.forEach((item) => {
                this.ingredients.push({data:item,id:item.Id});
            })
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }   
    showIngredients=(recipe)=>{
        const ingsRender = [];

        recipe.Ingredients.forEach((ing)=>{
            this.ingredients.forEach((item)=>{
                if(item.data.Id===ing.Id){
                    ingsRender.push(item);
                }
            })
        })
        this.setState({
            show:true,
            ingredientsToRender:[...ingsRender]
        })
    }
    
    render(){
        const {ingredientsToRender} = this.state;
        return(
            <>
            <ModalIngs 
                    title="Ingredients"
                    btnText="Close" 
                    handleClose={()=>this.setState({show:false})}
                    show={this.state.show}
                    body={
                        ingredientsToRender.length>0&&
                        <Row className="justify-content-center">   
                         {ingredientsToRender.map((item,key)=><IngredientCard ingredient={item.data} key={key}/>)}
                        </Row>
                    }
                />
                 <Recipes title="My Kitchen" recipes={this.state.recipes} btnText='Show Ingredients' show={this.showIngredients}            />  
            </>
        )
    }
}
export default MyKitchen