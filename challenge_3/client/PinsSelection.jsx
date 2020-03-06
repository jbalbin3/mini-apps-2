import React from 'react';

const PinsSelection = ({ pinsHit, pinLimit }) =>{

  console.log('pinLimit', pinLimit);

  var max = pinLimit || 10;
  var list = [...Array(max+1).keys()].map((num)=>
      <button key={num} value={num} onClick={ pinsHit }>{num}</button>
  )

  return (
    <div>
      <h5>click on a pin</h5>
      {list}
    </div>
  )
}

export default PinsSelection;
