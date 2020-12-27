import React from 'react';
import { Container,Form  } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


class Ingredient extends React.Component{

    constructor(props){
        super(props)
        this.state={
           name:"",
           imageURL:"",
           calories: ""
         };
     }

    

    ClearForms = () =>{
        document.getElementById("Ingredient-form").reset();
        this.setState({
            name:"",
            imageURL:"",
            calories: 0
        });
     }
      
    validateForm=()=>{
        const {IngName,imageUrl,calories} = this.state;
        if (IngName==='' || imageUrl ==='' || calories === '') {
            alert("missing some values, please fill the entire form.");
        }
        else{
            this.CreateIngredient();
        }
    }
    HandleName=(event)=> {
        this.setState({name: event.target.value});
    }
    HandleCalories=(event)=> {
        //const value = event.target.value.replace(/\+|-/ig, '');
        this.setState({calories:parseInt(event.target.value)});
       
    }
    HandleImageURL=(event)=> {
        this.setState({imageURL: event.target.value});

    }
    
    

    CreateIngredient = () =>{
       
        const NewIngredient = { //pay attention case sensitive!!!! should be exactly as the prop in C#!
            name: this.state.name,
            imageURL: this.state.imageURL,
            calories: this.state.calories
        };

        fetch("http://localhost:51468/api/Ingredient",{
        method: 'POST',
        body: JSON.stringify(NewIngredient),
        headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
            })
        })
            .then(res => {
            console.log('res=', res);
            return res.json()
            })
            .then(
        (result) => {
        this.ClearForms();
        console.log("fetch POST= ", result);
        alert("successfully added");
            },
            (error) => {
            console.log("err post=", error);
            });
        
    }

     render() {
        return (    
            <Container>
               <Form id="Ingredient-form">
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={this.state.name} placeholder="Enter ingredient" onChange={this.HandleName}/>
                </Form.Group>

                <Form.Group controlId="formImageURL">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" value={this.state.imageURL} placeholder="Enter Image URL" onChange={this.HandleImageURL}/>
                </Form.Group>

                <Form.Group controlId="formCalories">
                    <Form.Label>Calories</Form.Label>
                    <Form.Control type="number" value={this.state.calories} placeholder="Enter Calories" onChange={this.HandleCalories}/>
                </Form.Group>

               
                <Button variant="outline-primary" onClick={this.validateForm} >Create New Ingredient</Button>{' '}
                <Button variant="outline-secondary" onClick={this.ClearForms}>Clear Form</Button>

                </Form>
            </Container>
        );
    }
}

export default Ingredient;
