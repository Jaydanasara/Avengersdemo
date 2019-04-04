import React, { Component } from "react";
import CharacterCard from "../../components/CharacterCard";
import Wrapper from "../../components/wrapper";
import Wr from "../../components/wr";
import Characters from "./Characters.json";
import TopScore from "../../components/TopScore"
import firebase from "firebase";
import API from "../../utils/API";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';



let themeSong = new Audio("./avengsong.mp3");

class Game extends Component {
    state = {
        Characters,
        
        score: 0,
        topScore: "",
        clicked: [],
        message: "Click on an image to earn points, but don't click on any more than once!",
        isbasic: true,
        isadvanced1: false,
        isadvanced2: false,
        deal: Characters.Characters.round1,
        user: firebase.auth().currentUser.displayName,
        isPlaying: false,
    };

    componentDidMount() {

        this.musicToggle();
        this.setState({ deal: this.arrayShuffle() });
        API.getTop()

            .then(res => {
            
                console.log(res.data[0].score);

                this.setState({ topScore:res.data[0].score })
            })

            .catch(err => console.log(err));





        API.saveName({
            username: firebase.auth().currentUser.displayName,
            score: 0

        })
            .then(res => this.scores())
            .catch(err => console.log(err));

    }

    arrayShuffle = () => {
        let newPos,
            temp;
        const _characters = this.state.deal;
        for (let i = _characters.length - 1; i > 0; i--) {
            newPos = Math.floor(Math.random() * (i + 1));
            temp = _characters[i];
            _characters[i] = _characters[newPos];
            _characters[newPos] = temp;
        }
        return _characters;

    };

    handleClick = (id) => {
        let endgame = new Audio("./gameover.mp3");
        let clickgame = new Audio("./gameclick.mp3");
        let levels = new Audio("./levelup.mp3");
        let level2 = new Audio("./levelups.mp3")
        let clicked = this.state.clicked;
        let score = this.state.score + 1;
        let topScore = this.state.topScore;
        let message = "";
        let isbasic = this.state.isbasic;
        let isadvanced1 = this.state.isadvanced1;
        let isadvanced2 = this.state.isadvanced2;
        let deal = this.arrayShuffle();

        clickgame.play();
        if (clicked.includes(id)) {
            score = 0;

            endgame.play();
            message = "😟 Incorrect!! Click an image to start again!";
            clicked = [];
            isbasic = true;
            isadvanced1 = false;
            isadvanced2 = false;
            deal= Characters.Characters.round1
           

        }
        else {

            message = "😎 You are correct";
            clicked = [...this.state.clicked, id];
            this.scoreSave(score);
        }

        if (score > topScore) {
            topScore = score;
            message = "😎 You are correct";
            clicked = [...this.state.clicked, id];
        }

        if (score === 12) {
            score = 12;
            message = "YAY!!! You have beat the first level would you like to try the next level 👍";
            levels.play();
            level2.play();
            clicked = [];
            isbasic = false;
            isadvanced1 = true;
            deal = Characters.Characters.round2;
        }

        if (score === 67) {
            score = 67;
            message = "You Win Game Over";
            levels.play();
            level2.play();
            clicked = [];
            isbasic = false;
            isadvanced1 = false;
            isadvanced2 = true;
            deal = Characters.Characters.round3;
        }



        this.setState({ deal, score, topScore, clicked, message, isbasic, isadvanced1, isadvanced2 })

    };

    musicToggle = () => {
        let isPlaying = this.state.isPlaying;


        if (isPlaying === true) {
            themeSong.pause();
            isPlaying = false;
        }
        else {
            themeSong.play();
            isPlaying = true;
        }


        this.setState({ isPlaying })
    };

    scoreSave = (_score) => {

        API.saveScore(

            {
                username: this.state.user,

                score: _score
            }

        )

            .then(res => this.scores())
            .catch(err => console.log(err));
    };

    render() {
        let deal
        let isbasic = this.state.isbasic;
        let isadvanced1 = this.state.isadvanced1;
        let isadvanced2 = this.state.isadvanced2;
        if (isbasic === true) {
            deal = this.state.Characters.Characters.round1.map(character => (


                <CharacterCard
                    handleClick={this.handleClick}
                    id={character.id}
                    name={character.name}
                    image={character.image}

                />

            ))
        } else if (isadvanced1 === true) {
            deal = this.state.Characters.Characters.round2.map(character => (

                <CharacterCard
                    handleClick={this.handleClick}
                    id={character.id}
                    name={character.name}
                    image={character.image}

                />

            ))
        }
        if (isadvanced2 === true) {
            deal = this.state.Characters.Characters.round3.map(character => (

                <CharacterCard
                    handleClick={this.handleClick}
                    id={character.id}
                    name={character.name}
                    image={character.image}

                />

            ))
        }

        return (
            <Wrapper>

                <div className="nav">
                    <AppBar style={{ background: '#2E3B55' }} position="static">
                        <Toolbar>

                            <Typography variant="h6" color="inherit" >
                                <Button onClick={this.musicToggle}><img className="music" src="./music-player.png" /></Button>
                                <a href="/">
                                    Memory Game
     </a>
                            </Typography>

                            <TopScore> Score: {this.state.score} | | Top Score: {this.state.topScore}<p>View <a href="/Scores"   >Top Scores </a> </p></TopScore>
                            <div className="signOut">
                                <Grid container justify="center" alignItems="center">
                                    <Button className="back"><a href="/">◀◀◀</a> </Button>
                                    <Avatar alt="" src={firebase.auth().currentUser.photoURL} />



                                    <Button onClick={() => firebase.auth().signOut()} className="signOut" color="inherit">Log Out</Button>
                                </Grid> </div>
                        </Toolbar>
                    </AppBar>
                </div>
                <Wr>
                    <div>
                        <Paper className="paper">

                            <Typography component="p">
                                <h4>{this.state.message}</h4>
                            </Typography>
                        </Paper>
                    </div>
                    {deal}
                </Wr>
            </Wrapper>
        );
    }
}

export default Game;