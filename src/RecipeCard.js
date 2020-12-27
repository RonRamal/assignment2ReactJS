import './Recipe.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';

const RecipeCard=(props)=> { 

    const {recipe,btnText,clickEvent} = props;

        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={recipe.ImageURL} />
        <Card.Body>
            <Card.Title>{recipe.Name}</Card.Title>
            <Card.Text>
                {recipe.CookingMethod}
                <button type="button" className="btn btn-primary" onClick={()=>clickEvent(recipe)}> {btnText} </button>

            </Card.Text>
        </Card.Body>
        </Card>
}
export default RecipeCard;
