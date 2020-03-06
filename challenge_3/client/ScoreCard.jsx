import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
`;

const ScoreCard = ({ score, frameScore, game }) => {

  console.log('framescore', JSON.stringify(frameScore));

  var tally = Object.values(frameScore).map((total)=>{
    // console.log('function?', frame);
    // console.log('game?', game);
    // var index = frameNum - 1;
    // console.log('TOTAL', game[index.toString()][0], game[index.toString()][1]);
    return total();
  });

  console.log('tally', tally);

  console.log('score', score);
  return (
    <div>
      <div>{score}</div>
      <div>{tally}</div>
    </div>

  )
}

export default ScoreCard;
