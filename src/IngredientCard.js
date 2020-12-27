import React from 'react';
import {Card} from 'react-bootstrap';

const IngredientCard = ({ingredient}) => {
    return( 
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={ingredient.ImageURL} />
        <Card.Body>
            <Card.Title>{ingredient.Name}</Card.Title>
            <Card.Text>
                {ingredient.Calories}
            </Card.Text>
        </Card.Body>
        </Card>
    );
}
 
export default IngredientCard;
