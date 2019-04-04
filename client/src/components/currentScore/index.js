import React from "react";

const currentScore = () => {
    this.setState({ score: this.state.score + 1 });
    if (this.state.score > this.state.topScore) {
        this.setState({ topScore: this.state.topScore = this.state.score });
    }
};
const   taliscore=()=> {
    let score = this.state.score + 1;
    let topScore = this.state.topScore;
    
    if (score > topScore) {
        topScore = score;
    }
    this.setState({ score,  topScore,});
  };

export default currentScore;