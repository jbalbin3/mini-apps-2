import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useSelector, useDispatch } from 'react-redux';
import Board from './Board';

function App({increment, decrement}) {
  // const gameBoard = useSelector(state => state);
  // const dispatch = useDispatch();

  const [cell, setCell] = React.useState('‏‏‎ ');

  var bombCount = 10; 
  var grid = 10; 
  var bombList = [];
  var board = [[],[],[],[],[],[],[],[],[],[]];

  // function createBombs (input: num bombs, grid size; modifies: board w bombs)
  // select randomly coordinates where n number of bombs will be
  const createBombs = (num, board, sz) => {
    var count = 0;
    while(count < num) {
      var x = Math.floor(Math.random()*sz);
      var y = Math.floor(Math.random()*sz);
      board[x][y] = 'B';
      bombList.push([x,y]);
      count += 1;
    }
  }

  // function check bomb count
  // input (cell coordinate)
  // at the cell, count how many bombs are around it
  // output the bombcount and update cell with bomb count
  const addBombCount = (board, i, j) => {
    var count = 0;
    if(board[i][j] === 'B') { return 'B'; }
    // check up
    if(i-1 > -1) { if(board[i-1][j] === 'B') { count += 1; }} 
    // check diagonal ru
    if(i-1 > -1 && j+1 < board.length) { if(board[i-1][j+1] === 'B') { count += 1; }} 
    // check right
    if(j+1 < board.length) { if(board[i][j+1] === 'B') { count += 1; }} 
    // check diagonal rd
    if(i+1 < board.length && j+1 < board.length) { if(board[i+1][j+1] === 'B') { count += 1; }} 
    // check down
    if(i+1 < board.length) { if(board[i+1][j] === 'B') { count += 1; }} 
    // check diagonal ld
    if(i+1 < board.length && j-1 > -1) { if(board[i+1][j-1] === 'B') { count += 1; }} 
    // check left
    if(j-1 > -1) { if(board[i][j-1] === 'B') { count += 1; }} 
    // check diagonal lu
    if(i-1 > -1 && j-1 > -1) { if(board[i-1][j-1] === 'B') { count += 1; }} 
    return count;
  }

  // function buildGrid (input: bombs array, grid size;  output: matrix)
  const buildGrid = (size)=> {
    // iterate through the matrix to add the bombs
    for(let i = 0; i < size; i++) {
      for(let j = 0; j < size; j++) {
        board[i].push(0);
      }
    }
    createBombs(bombCount, board, size);

    // iterate board to add bomb counts to cells
    // each cell that’s not a bomb (B)
    // update bomb count
    for(let i = 0; i < size; i++) {
      for(let j = 0; j < size; j++) {
        board[i][j] = addBombCount(board,i,j) || 0;
      }
    }
  }

  function revealGrid(i,j) {
    reveal(i,j, 'zero'); // show component
    // check up
    if(i-1 > -1) { if(board[i-1][j] === 0) { revealGrid(i-1,j); }} 
    // check diagonal ru
    if(i-1 > -1 && j+1 < board.length) { if(board[i-1][j+1] === 0) { revealGrid(i-1,j+1); }} 
    // check right
    if(j+1 < board.length) { if(board[i][j+1] === 0) { revealGrid(i,j+1); }} 
    // check diagonal rd
    if(i+1 < board.length && j+1 < board.length) { if(board[i+1][j+1] === 0) { revealGrid(i+1,j+1); }} 
    // check down
    if(i+1 < board.length) { if(board[i+1][j] === 0) { revealGrid(i+1,j); }} 
    // check diagonal ld
    if(i+1 < board.length && j-1 > -1) { if(board[i+1][j-1] === 0) { revealGrid(i+1,j-1); }} 
    // check left
    if(j-1 > -1) { if(board[i][j-1] === 0) { revealGrid(i,j-1); }} 
    // check diagonal lu
    if(i-1 > -1 && j-1 > -1) { if(board[i-1][j-1] === 0) { revealGrid(i-1,j-1); }} 
  }

  const clickCell = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    var loc = JSON.parse(e.target.value);
    var i = loc[0];
    var j = loc[1];
    console.log(i, typeof(i));
    // console.log(j, typeof(j));
    // mark clicked coordinates clicked (have a clicked array? Or just disable button)
    if(board[i][j] === 'B') {
      // reveal all the bomb locations only
      console.log('Bomb clicked');
      gameOver();
      return;
    }        
    if(board[i][j] === 0) {
      // reveal all the 0’s that are connecting the coordinates
      console.log('Zero clicked');
      revealGrid(i,j);
      return;
    } 
    if(board[i][j] !== 0 || board[i][j] !== 'B') {
      console.log('Number clicked');
      reveal(i,j, 'number');
      return;
    }
  }

  const reveal = (i,j, type) => {
    // for show, change to a redux/react state change
    if(type === 'number') {
      setCell(board[i][j]);
      board[i][j] = board[i][j].toString();
    }
    if(type === 'zero') {
      setCell('.');
      board[i][j] = 'X';
    }
    if(type === 'bomb') {
      setCell('💣');
      board[i][j] = '@';
    }
    return;
    // console.log(board);
  }

  const gameOver = () => {
    for(let i=0; i < bombList.length; i++) {
      reveal(bombList[i][0], bombList[i][1], 'bomb'); 
    }
  }

  buildGrid(grid);
  console.log(board);

  /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more than React!
        </a>
        <h1>{counter}</h1>
        <button onClick={() => dispatch(increment(5))}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </header>
    </div>*/

  return (
    <div>
    <Board board={board} size={grid} clickCell={clickCell} cell={cell}/>
    </div>
    
  );
}

export default App;
