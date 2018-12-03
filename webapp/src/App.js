import React, { Component } from 'react';
import { Button } from 'reactstrap';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      data:"",
      urlrecipe:"http://51.75.249.160:3001/en",
      title:"",
      teaser:"",
      type:"",
      cheff:"",
      photographer:"",
      country:"",
      time:"",
      ingredients:new Array()
    }
    this.getrecipe = this.getrecipe.bind(this);
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
    //var myArrStr = JSON.parse(listItems);
    this.setState({ ingredients:listItems })
  }

  renderRecipe(){
   return(
     <div className="recipe">
       <h2>{this.state.data.title}</h2>
       <h3>{this.state.data.teaser}</h3>
       <p>Pays d''origine: {this.state.data.cuisine}</p>
       {this.renderIngredients()}
       <p> {this.state.data.country}</p>
       <p>Temps de préparation: {this.state.data.time}</p>
     </div>
   )
 }

 renderIngredients(){
   if(typeof this.state.ingredients != 'undefined')
    {
      let ingredient =  this.state.ingredients.map(x=>
        <p>{x}</p>
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
/*<p>cuisine:{this.state.data.cuisine}</p>
          <p>ingrédients:{this.state.data.ingredients}</p>
          {typeof this.state.data.ingredients == 'undefined'?
          <p></p>:<p>{this.state.data.ingredients.length}</p>}*/
export default App;
