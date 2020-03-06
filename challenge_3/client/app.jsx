import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ScoreCard from './ScoreCard.jsx';
import PinsSelection from './PinsSelection.jsx';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

  // var game = {
  //   1: [],
  //   2: [],
  //   3: [],
  //   4: [],
  //   5: [],
  //   6: [],
  //   7: [],
  //   8: [],
  //   9: [],
  //   10: []
  // }
  var frameNum = 1;

const App = () => {

  const [pinLimit, setPinLimit] = React.useState(0);

  const [score, setScore] = React.useState([]);

  const [frameScore, setFrameScore] = React.useState({});

  const [change, setChange] = React.useState(false);

  const [game, setGame] = React.useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: []
  })

  const [gameOver, setGameOver] = React.useState(false);

  const pinsHit = (e) => {
    console.log('frame num',frameNum);


    var showScore = e.target.value
    // game[frameNum.toString()].push(parseInt(e.target.value));
    var g = game;
    g[frameNum.toString()].push(parseInt(e.target.value));
    setGame(g);

    console.log(JSON.stringify(game));

    if(e.target.value === '10') {
      showScore = 'X';
      if(frameNum < 10) {
        frameNum += 1;
      }
      console.log('frame num',frameNum);
    }

    if(frameNum === 10) {
      if((game[frameNum.toString()].length === 2 &&
        game[frameNum.toString()][0] + game[frameNum.toString()][1] < 10) ||
        game[frameNum.toString()].length === 3) {
          console.log('game over');
          setGameOver(true);
        }
    }

    if(game[frameNum.toString()].length === 2) {
      if(game[frameNum.toString()][0] + game[frameNum.toString()][1] === 10) {
        showScore = '/';
      } else {
        var temp = frameScore;
        console.log('temp1',temp);
        temp[frameNum.toString()] = (() => {
          var sum = game[frameNum.toString()][0] + game[frameNum.toString()][1]; return ()=>sum;
        })();
        console.log('temp2',temp);
        setFrameScore(temp);
      }
      setPinLimit(10);
      if(frameNum < 10) {
        frameNum += 1;
      }
      console.log('frame num',frameNum);
    } else {
      setPinLimit(10 - e.target.value || 0);
    }

    var temp = score;
    temp.push(showScore);
    setScore(temp);
    setChange(!change);
  }

  if(gameOver) {
    return (
      <div>game over</div>
    )
  }

  return (
    <div>
      <Title>
        Bowling fun!
      </Title>
        <ScoreCard score={score} frameScore={frameScore} />
      <div>Start</div>
        <PinsSelection pinsHit={pinsHit} pinLimit={pinLimit}/>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));

