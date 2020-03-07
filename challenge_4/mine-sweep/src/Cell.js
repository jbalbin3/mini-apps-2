import React from 'react';

const Cell = ({type, i, j, clickCell, cell}) => {

  // cell = type || '‏‏‎ '

  return (
      <button className="cells" value={`[${i},${j}]`} onClick={clickCell}>‏‏‎{cell}</button>
  )
}

export default Cell;