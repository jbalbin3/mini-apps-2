const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const redis = require("redis");
const axios = require('axios');
const port_redis = process.env.REDIS_URL || 6379;
const redis_client = redis.createClient(port_redis);
const bodyParser = require("body-parser");


app.use(express.static('public'));
app.listen((PORT),()=>{
  console.log('listening on port',PORT);
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Middleware Function to Check Cache
checkCache = (req, res, next) => {
  const { end } = req.query;
  redis_client.get(end, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    if (data != null && req.query.cache === 'true') {
      console.log('CACHE HIT ON DATE', end);
      res.send(data);
    } else {
      //proceed to next middleware function
      next();
    }
  });
};

app.get('/api/rates', checkCache, (req,res)=>{

  // console.log('params',  req.query);
  // https://api.coindesk.com/v1/bpi/historical/close.json
  //  Sample Request for date range: https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${req.query.start}&end=${req.query.end}`)
    .then((response)=>{
      console.log('NOT CACHED DATA ON DATE', req.query.end);
      redis_client.setex(req.query.end, 3600, JSON.stringify(response.data));
      res.status(200).send(response.data).end();
    })
    .catch((err)=>{
      console.error('error getting json data from coindesk api', err);
    })
});

