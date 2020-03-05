import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ScoreCard from './ScoreCard.jsx';
import PinsSelection from './PinsSelection.jsx';

const App = () => {



  return (
    <div>
      <ScoreCard />
      <div>Start</div>
      <PinsSelection />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));

