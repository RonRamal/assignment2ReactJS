import Ingredient from './Ingredient.js';
import DishRecipe from './DishRecipe.js';
import MyKitchen from './MyKitchen.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Component } from 'react';
import Menu from './Menu.js'



class App extends Component {
  
  render() {
    return (
      <div>
        <Menu />
      <Switch>

      <Route exact path="/" >
      <MyKitchen/>
      </Route>

      <Route path="/Ingredient">
      <Ingredient/>
      </Route>

      <Route path="/Recipe" >
      <DishRecipe/>
      </Route>

      </Switch>
       </div>
      );

  
  }
}
export default withRouter(App);
