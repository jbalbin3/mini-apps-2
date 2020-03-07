import React from 'react';
import Cell from './Cell';

const Board = ({size, clickCell, cell}) => {
  var cells = [];
  var index = 0;
  for(let i = 0; i < size; i++) {
      index++;
      for(let j = 0; j < size; j++) {
        index++;
        cells.push(<Cell key={index} i={i} j={j} clickCell={clickCell} cell={cell}/>)
      }
  }
  return (
    <div className="board">
    {cells}
    </div>
  )
}

export default Board;