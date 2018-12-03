import React, { Component } from 'react';
import { Button } from 'reactstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      data:"",
      urlrecipe:"http://51.75.249.160:3001/",
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

  getrecipe(){
    fetch(this.state.urlrecipe)
      .then(response => response.json())
      .then(data =>
        this.setState({ data:data })/*,
        this.setState({ title:this.state.data.title }),
        this.setState({ teaser:this.state.data.teaser }),
        this.setState({ type:this.state.data.type }),
        this.setState({ cheff:this.state.data.cheff }),
        this.setState({ photographer:this.state.data.photographer }),
        this.setState({ country:this.state.data.country }),
        this.setState({ time:this.state.data.time }),
        this.setState({ ingredients:this.state.data.ingredients })*/
      );
  }

  render() {
    return (
      <div className="App">

          <Button onClick={() => this.getrecipe()}>
            Fetch recipe
          </Button>

          <p>{this.state.data.title}</p>

      </div>
    );
  }
}

export default App;
