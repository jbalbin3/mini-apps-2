import React from 'react';
import ReactDOM from 'react-dom';
import Results from './Results.jsx';
import axios from 'axios';

const PAGELIMIT = 10;

const App = () => {

  const [list, setList] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [query, setQuery] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e.target.search.value);
    setQuery(e.target.search.value);
    loadEvents(e.target.search.value);
  }

  function loadEvents(query, page) {
    if(arguments.length === 1) {
      // get the total number of records first to get length
      axios.get(`/events/?q=${arguments[0]}`)
      .then((res)=>{
        setPageCount(Math.ceil(res.data.length/PAGELIMIT));
      })
      .catch((err)=>{
        console.error('axios error fetching data', err);
      })
      // console.log('initial page 1');
      axios.get(`/events/?q=${query}&_page=1&_limit=${PAGELIMIT}`)
      .then((res)=>{
        // console.log('res', res.headers.link);
        // console.log(res.data);
        setList(res.data);
      })
      .catch((err)=>{
        console.error('axios error fetching data', err);
      })

    } else {
      // http://localhost:3000/events?q=place&_page=1&_limit=30
      axios.get(`/events/?q=${query}&_page=${page}&_limit=${PAGELIMIT}`)
      .then((res)=>{
        // console.log('res', res.headers.link);
        // console.log('page', page);
        console.log(res.data);
        setList(res.data);
      })
      .catch((err)=>{
        console.error('axios error fetching data', err);
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search.." name="search"/>
        <button type="submit">Search</button>
      </form>
      <Results list={list} pageCount={pageCount} loadEvents={loadEvents} PAGELIMIT={PAGELIMIT} query={query}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));

