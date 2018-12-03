import React, { Component } from 'react';
import { Button } from 'reactstrap';
import fond from './fond.jpg';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      data:"",
      urlrecipe:"http://51.75.249.160:3001/en",
      urlimage:"http://localhost:4000/",
      title:"",
      teaser:"",
      cuisine:"",
      cheff:"",
      photographer:"",
      country:"",
      time:"",
      ingredients:new Array(),
      dropdownOpen: false
    }
    this.getrecipe = this.getrecipe.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  /*const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}); */

  getrecipe(){
    fetch(this.state.urlrecipe)
      .then(response => response.json())
      .then(data =>{
        this.setState({ data:data })
        this.getingredients(data.ingredients)}
      );
  }

  getingredients(ingredients){

    var listItems = ingredients;
    var listIngredients = new Array();
    listItems.forEach(ingredient => {
      console.log(this.state.urlimage + ingredient);
      fetch(this.state.urlimage + ingredient)
        .then(response => response.json())
        .then(data =>{
          listIngredients.push({name:ingredient,image:data.url})
          this.setState({ ingredients:listIngredients })
          console.log(data.url)
        });
    })
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  renderRecipe(){
    let ingredient =  this.state.ingredients.map(x=>
      <DropdownItem>{x}</DropdownItem>
    )
   return(
     <div className="recipe">
       <Button color="success" onClick={() => this.getrecipe()}>
         Charger une recette
       </Button><br/ ><br/>
       <p>Pays: {this.state.data.cuisine}</p>
       <h2>{this.state.cuisine}</h2>
       <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
       <DropdownToggle caret>Ingrédients</DropdownToggle>
         <DropdownMenu>
         {ingredient}
         </DropdownMenu>
       </Dropdown>
     </div>
   )
 }

 renderIngredients(){
   if(typeof this.state.ingredients != 'undefined')
    {
      let ingredient = this.state.ingredients.map(x=>
        <div>
          <p>{x.image}</p>
          <p>{x.name}</p>
          <img src={x.image}/>
        </div>
      )
      return ingredient;
    }
 }

  render() {
    return (
      <div className="App">
          <Button onClick={() => this.getrecipe()}>
            Fetch recipe
          </Button>
          <p>{this.state.data.title}</p>
          {this.renderRecipe()}
      </div>
    );
  }

}

export default App;
