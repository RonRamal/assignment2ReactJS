import React from 'react';
import IngredientClass from './IngredientClass';
import CheckBoxForm from './CheckBoxForm';
import { Container,Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


class DishRecipe extends React.Component{

    constructor(props){
        super(props)
        this.state={
           name:"",
           cookingMethod:"",
           Time:"",
           imageURL:"",
           ingredients: []
         };
     }
   
    ClearForms = () =>{
        const ings = [...this.state.ingredients];
        ings.map((item)=>item.checked=false);
        this.setState({
            name:"",
            imageURL:"",
            Time: "",
            cookingMethod:"",
            ingredients: []

        });
        this.getIngredients();

    }
    componentDidMount(){
        this.getIngredients();
    }

    getIngredients = () =>{
    
        const IngsGET = [] //pay attention case sensitive!!!! should be exactly as the prop in C#!       

        fetch("http://localhost:51468/api/Ingredient")
            .then(res => {
            console.log('res=', res);
            console.log('res.status', res.status);
            console.log('res.ok', res.ok);
            return res.json()
            })
            .then((result) => {
            result.forEach((item) => {
                IngsGET.push({ingredient:new IngredientClass(item.Id,item.Name,item.ImageURL,item.Calories),checked:false});
            });
            this.setState({ingredients:[...IngsGET]});
           console.log("fetch GET= ", this.state.ingredients);
            },
            (error) => {
            console.log("err post=", error);
            });
        
    }

    validateForm=()=>{
        const ingredientsToDB = this.state.ingredients.filter(item=>item.checked).map((item)=>item.ingredient);
        const {IngName,imageUrl,Time,cookingMethod} = this.state;
        if (IngName==='' || imageUrl ==='' || Time === '' || cookingMethod === '') {
            alert("missing some values, please fill the entire form.");
        }
        else if(!ingredientsToDB) alert("missing ingredients");
        else{
            this.CreateRecipe(ingredientsToDB);
        }
    }

    CreateRecipe = (ingredientsToDB) =>{

        const NewRecipe = { //pay attention case sensitive!!!! should be exactly as the prop in C#!
            name: this.state.name,
            imageURL: this.state.imageURL,
            time: this.state.Time,
            cookingMethod:this.state.cookingMethod,
            ingredients: ingredientsToDB
        };

        fetch("http://localhost:51468/api/Recipes",{
            method: 'POST',
            body: JSON.stringify(NewRecipe),
            headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
                })
            })
                .then(res => {
                //console.log('res=', res);
                return res.json()
                })
                .then(
            (result) => {
            this.ClearForms();
            //console.log("fetch POST= ", result);
            alert("successfully added Recipe");
                },
                (error) => {
                console.log("err post=", error);
                });
            

    }
    
    changedCheckedValues=(itemId,checked)=>{
       let ings = [...this.state.ingredients];
        for(let i=0; i<ings.length ;i++){
              
            if(ings[i].ingredient.id == itemId){
               ings[i].checked = checked;
                break;
            }
        }
        this.setState({ingredients:[...ings]});
    }

    
     
     render() {
        const {ingredients} = this.state;
        return (    
        <Container>
            <Form id="recipe-form"> 
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={this.state.name} placeholder="Enter Recipe Name" onChange={(e)=>this.setState({name: e.target.value})}/>
            </Form.Group>
            <Form.Group controlId="formCookingMethod">
                <Form.Label>Cooking Method</Form.Label>
                <Form.Control type="text" value={this.state.cookingMethod} placeholder="Enter Cooking Method" onChange={(e)=>this.setState({cookingMethod: e.target.value})}/>
            </Form.Group>

            <Form.Group controlId="formImageURL">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" value={this.state.imageURL} placeholder="Enter Image URL" onChange={(e)=>this.setState({imageURL: e.target.value})}/>
            </Form.Group>

            <Form.Group controlId="formTime">
                <Form.Label>Time</Form.Label>
                <Form.Control type="number" value={this.state.Time} placeholder="Enter Cooking Time(Minutes)" onChange={(e)=>this.setState({Time: parseInt(e.target.value)})}/>
            </Form.Group>

            {
                ingredients?.length>0&&
                ingredients?.map((item,key)=><CheckBoxForm checked={item.checked} changeChecked={this.changedCheckedValues} id={item.ingredient.id} key={key} label={item.ingredient.name}/>)

            }

            <Button variant="outline-primary" onClick={this.validateForm}>Create New Recipe</Button>{' '}
            <Button variant="outline-secondary" onClick={this.ClearForms}>Clear Form</Button>{' '}

            </Form>
        </Container>
        );
    }
}

export default DishRecipe;
