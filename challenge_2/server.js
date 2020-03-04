const express = require('express');
const app = express();
const PORT = 3333;

const axios = require('axios');


app.use(express.static('public'));
app.listen((PORT),()=>{
  console.log('listening on port',PORT);
})

app.get('/api/rates', (req,res)=>{
  // https://api.coindesk.com/v1/bpi/historical/close.json
  //  Sample Request for date range: https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05
  axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
    .then((response)=>{
      console.log(response.data);
      res.status(200).send(response.data).end();
    })
    .catch((err)=>{
      console.error('error getting json data from coindesk api', err);
    })
});

