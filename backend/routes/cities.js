var express = require('express');
var router = express.Router();
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');

// för formulär
var urlencodedParser = bodyParser.urlencoded({extended: true}); // för stringify - skapar key value pair på det vi skapat

// hämtar och läser ut cisties
// get cities
router.get('/', function(req, res) {
   fs.readFile('stad.json', (err, data) => {
     if (err) throw err;
     let cities = JSON.parse(data);
     res.send(cities);
   });
});


// plockar fram högsta id 
function getNextId(arr){
  var max = 0;

  for (var i=0; i<arr.length; i++){
      var current = parseInt(arr[i].id);
      if(current > max) {max = current; }
  }
  return max + 1;
}

// lägger till en ny stad
// post cities
router.post('/add', urlencodedParser, (req, res) => { 
  fs.readFile('stad.json', (err, data) => {

    if (err) throw err;
    let cities = JSON.parse(data);
    console.log(cities);
  
  // Hämta nästa id
  let newId = getNextId(cities);

  //skapa nytt objekt
  let newCity = {
      id: newId,
      stadname: req.body.stad,
      countryid: Number.parseInt(req.body.countryid),
      population: Number.parseInt(req.body.population)
  };

  cities.push(newCity); 
  
  let saveCity = JSON.stringify(cities, null, 2);

  fs.writeFile('stad.json', saveCity, (err, data) => { 
      if (err) throw err; 
  })
      res.render('about',{data:Object.entries(newCity).join(' ') + ' - har nu sparats.'});
  })
});

module.exports = router;
