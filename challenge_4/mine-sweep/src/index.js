import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// let store = createStore(reducer)

// STORE - globalized state

// ACTION - describe what to do, function that returns obj  (increment)
// const increment = (num) => {
//   return {
//     type: 'INCREMENT',
//     payload: num
//   }
// }
// const decrement = () => {
//   return {
//     type: 'DECREMENT'
//   }
// }

// REDUCER check which action was dispatched and based on action it will modify the STORE or the state
// const counter =(state = 0, action) => {    // state is counter
//   switch(action.type){
//     case "INCREMENT":
//       return state + action.payload;
//     case "DECREMENT":
//       return state - 1;
//     default: 
//       return state;
//   }
// }

// let store = createStore(counter, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// display it in counter
// store.subscribe(()=> console.log(store.getState()));

// DISPLATCH - dispatch action to reducer
// store.dispatch(increment(1));
// store.dispatch(decrement());
// store.dispatch(decrement());
// <App increment={increment} decrement={decrement}/>

// let store = createStore(counter, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

{/* <Provider store={store}>
    <App />
  </Provider>,  */}

ReactDOM.render(
    <App />,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
