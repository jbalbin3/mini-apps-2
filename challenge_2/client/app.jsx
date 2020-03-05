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
    console.log(e.target.date.value);

    var d = new Date(e.target.date.value);
    const end = d.toLocaleDateString('sv');
    d.setDate(d.getDate() - 30);
    const start = d.toLocaleDateString('sv');

    axios.get('/api/rates/',{
      params: {
        start: start,
        end: end
      }
    })
      .then((res) => {
        console.log('DATA',res.data);

        // fix data for charts
        // [{date: date, close: close},{date: date, close: close}...]
        let list = Object.entries(res.data.bpi);
        const entries = list.map((entry)=>{
          var temp = {};
          temp.date = new Date(entry[0]);
          temp.close = entry[1];
          return temp;
        });

        console.log('Entries', entries);

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
        <h1>Bitcoin Price Index</h1>
        <h3>Enter a date to get data from date selected to 30 days before.</h3>
          <form onSubmit={handleSubmit}>
            <input type="date" name="date"/>
            <button type="submit">Submit</button>
          </form>
      </div>
    )
  }

  return (
    <div>
    <h1>Bitcoin Price Index</h1>
    <h3>Enter a date to get 30 days of data prior to entered date.</h3>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date"/>
        <button type="submit">Submit</button>
      </form>
  <h2>{time}</h2>
  <h3>{disclaimer}</h3>

    <TypeChooser>
      {type => <Chart type={type} data={rates} />}
    </TypeChooser>
    <footer>"Powered by CoinDesk"</footer>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
