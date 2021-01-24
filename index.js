const express = require('express');
const fetch = require('node-fetch')
const app = express();


app.get('/api/rates', (req, res) => {

    const {base, currency} = req.query;
    const API = `https://api.exchangeratesapi.io/latest?base=${base}`;
    
    
    fetch(API).then(response => response.json()).then(data => {
      let currencyObj = currency.toUpperCase().split(",").reduce((acc, curr) => (acc[curr] = data.rates[curr], acc), {});
   
         res.json(
            {
            "result": {
            "base": `${base}`,
            "dates": `${data.date}`,
            "rates" : currencyObj
              }
           }
        )
    })
    .catch( () => {
          res.status(400).json({msg: "Data not found"}) 
      })
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () =>  console.log(`Server running on localhost:${PORT}`))
