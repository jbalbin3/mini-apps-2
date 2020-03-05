import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Chart from './Chart.jsx';
import { TypeChooser } from 'react-stockcharts/lib/helper';

const App = () => {

  const [rates, setRates] = React.useState({});
  const [disclaimer, setDisclaimer] = React.useState('');
  const [time, setTime] = React.useState('');

  // React.useEffect(() => {
  //   axios.get('/api/rates/')
  //     .then((res) => {
  //       console.log('DATA',res.data);

  //       // fix data for charts
  //       // [{date: date, close: close},{date: date, close: close}...]
  //       let list = Object.entries(res.data.bpi);
  //       const entries = list.map((entry)=>{
  //         var temp = {};
  //         temp.date = new Date(entry[0]);
  //         temp.close = entry[1];
  //         return temp;
  //       });

  //       console.log('Entries', entries);

  //       setDisclaimer(res.data.disclaimer);
  //       setTime(res.data.time.updated);
  //       setRates(entries);

  //     })
  //     .catch((err) => console.log('error fetching rates data', err));
  // }, []);

  function handleSubmit(e) {
    e.preventDefault();
    var d = new Date(e.target.date.value);
    const end = d.toLocaleDateString('sv');
    d.setDate(d.getDate() - 30);
    const start = d.toLocaleDateString('sv');

    axios.get('/api/rates/',{
      params: {
        start: start,
        end: end,
        cache: e.target.cache.checked
      }
    })
      .then((res) => {
        let list = Object.entries(res.data.bpi);
        const entries = list.map((entry)=>{
          var temp = {};
          temp.date = new Date(entry[0]);
          temp.close = entry[1];
          return temp;
        });
        setDisclaimer(res.data.disclaimer);
        setTime(res.data.time.updated);
        setRates(entries);
      })
      .catch((err)=>{
        console.error('error receiving list of entries', err);
      })
  }

  if(!rates.length) {
    return (
      <div>
        <h2>BITCOIN PRICE INDEX</h2>
        <p>Enter a date to get 30 days of previous data.</p>
          <form onSubmit={handleSubmit}>
            <input type="date" name="date"/>
            <input type="checkbox" id="cache" name="cache" />
            <label htmlFor="cache">cached search   </label>
            <button type="submit">Submit</button>
          </form>

      </div>
    )
  }

  return (
    <div>
    <h2>BITCOIN PRICE INDEX</h2>
    <p>Enter a date to get 30 days of previous data.</p>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date"/>
        <input type="checkbox" id="cache" name="cache" />
        <label htmlFor="cache">cached search   </label>
        <button type="submit">Submit</button>
      </form>

    <h3>{time}</h3>
    <p>{disclaimer}</p>
    <TypeChooser>
      {type => <Chart type={type} data={rates} />}
    </TypeChooser>
    <footer>"Powered by CoinDesk"</footer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
