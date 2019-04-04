import React from "react";
import firebase from "firebase";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import HomeWrap  from "../../components/HomeWrap";

// const styles = {
 
//   bigAvatar: {
//     margin: 10,
//     width: 100,
//     height: 100,
//   },

// };
function Home() {
  return (
   <HomeWrap>
         <div>
         <AppBar style={{ background: '#2E3B55' }} position="static">
        <Toolbar>
        
          <Typography variant="h6" color="inherit">
          <a className="navbar-brand" href="/">
        Avengers Memory Game
     </a>
     </Typography>
    
          <div className= "signOut">
          <Grid container justify="center" alignItems="center">
      <Avatar alt="" src={firebase.auth().currentUser.photoURL} 
      // className={styles.bigAvatars}
       />
          <Button onClick={() => firebase.auth().signOut()}  color="inherit">Log Out</Button>
    </Grid>
          </div>
          </Toolbar>
      </AppBar>
    </div>
    <Grid container justify="center" alignItems="center">
  <div className = "homeText">
          {/* <img className = "profile" alt="profile" src={firebase.auth().currentUser.photoURL}/> */}
            <h1 className = "text">Welcome {firebase.auth().currentUser.displayName} 
            </h1>
            <h2 className= "text2">Click on  <a className= "continue" href="/Game">CONTINUE</a> to play the game!!!</h2>
            </div>
            </Grid>
            </HomeWrap>
            
  );
}

export default Home;