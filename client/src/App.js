import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Home,Game,Scores} from "./pages/Scores";
import Wrap  from "../src/components/wrap";


var config = {
  apiKey: "AIzaSyAvkJ1NZQbL0Y6CKu9Rq94i05NDRAQqGyM",
  authDomain: "avengers-memory-game.firebaseapp.com",
  databaseURL: "https://avengers-memory-game.firebaseio.com",
  projectId: "avengers-memory-game",
  storageBucket: "avengers-memory-game.appspot.com",
  messagingSenderId: "121402415852"
};
firebase.initializeApp(config);

class App extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  render() {
    return (
      <Wrap>
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
         
          <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Game" component={Game} />
              <Route path="/Scores" component={Scores} />
            
            </Switch>
          </div>
        </Router>
        </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
      </Wrap>
    )
  }
}

export default App;
