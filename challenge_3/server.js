const express = require('express');
const app = express();
const PORT = 3333;
app.use(express.static('public'));
app.listen(PORT, ()=>{
  console.log('server listening on port', PORT);
})


