import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../Home/home'
// import rollHistory from '../paper/paper';
// import {
//   graphql,
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLString,
//   Mutation
// } from 'graphql';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      turnRolls: [],
      hits: 0,
      misses: 0,
      interim: {
        username: "",
        diceNum: 0
      }
    }
  }
componentDidMount(){
  this.setState({username: localStorage.getItem('username')})
}

getKeyPress = (event) => {
  if(event.key === "Enter")
  {
    let completeUsername = this.state.interim.username
    this.setState({username: completeUsername})
  }
}

getNewUsername = (username) => {
  this.setState({interim: {username : username}})

} 
setNewUsername = () => {
  let completeUsername = this.state.interim.username
  this.setState({username: completeUsername})
  localStorage.setItem('username', completeUsername)
} 

getDiceNumber = (diceNum) => {
  this.setState({interim: {diceNum: diceNum}})
}
setDiceNumber = () => {
  let completeDiceNumber = this.state.interim.diceNum
  this.rollDice(completeDiceNumber)
}

rollDice = (completeDiceNumber) => {
  let rollsInterim = []
  let missesToPost = 0
  let hitsToPost = 0
  let username = localStorage.getItem('username')
  for(let i=0; i<completeDiceNumber;i++){
     let  roll = Math.floor(Math.random() * (6 - 1) + 1)
      rollsInterim.push(roll)
      if(roll === 1){
        missesToPost++
      } else if(roll === 5 || roll === 6){
        hitsToPost++
    }
  }
  console.log("Hits: ", hitsToPost, " Misses: ", missesToPost, " Rolls: ", rollsInterim, " username: ", username)
  let mutation = `mutation {
    insert_Turns(objects: {misses: ${missesToPost}, turnRolls: "${rollsInterim}", username: "${username}", hits: ${hitsToPost}}) {
      returning {
        turnID
        username
      }
    }
  }
  `

  fetch('http://graphql-engine:8080/v1alpha1/graphql', {
    method: 'POST',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ query: mutation })
  })
  .then(r => r.json())
  .then(data => console.log('data returned: ', data))
  console.log(JSON.stringify({ query: mutation }))
}

  render() {
    return (
      <div style={styles.appContainer}> 
        <Router>
          <div className="App">
            <div>
            <Route exact path="/" render={(props => <Home getNewUsername={this.getNewUsername} setNewUsername={this.setNewUsername} getDiceNumber={this.getDiceNumber} setDiceNumber={this.setDiceNumber} getKeyPress={this.getKeyPress} state={this.state}/>)}/>
            </div> 
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

const styles = {
  appContainer: {
    // flex: 1,
    height: "100vh"
    // flexDirection: 'column',
    // justifyContent: "space-between",
    // overflowY: 'none',
  }
}