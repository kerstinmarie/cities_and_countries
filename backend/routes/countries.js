var express = require('express');
var router = express.Router();
//var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');

// för formulär
var urlencodedParser = bodyParser.urlencoded({extended: true}); // för stringify - skapar key value pair på det vi skapat

// hämtar och läser ut countries
// get countries
router.get('/', function(req, res) {
  fs.readFile('land.json', (err, data) => {
    if (err) throw err;
    let countries = JSON.parse(data);
    res.send(countries);
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
// lägger till ett land 
// post countries
router.post('/add', urlencodedParser, (req, res) => { 
  fs.readFile('land.json', (err, data) => {

    if (err) throw err;
    let countries = JSON.parse(data);
    console.log(countries);
  
  // Hämta nästa id
  let newId = getNextId(countries);

  //skapa nytt objekt
  let newCountry = {
      id: newId,
      countryname:req.body.land
  };

  countries.push(newCountry); 
  
  let saveCountry = JSON.stringify(countries, null, 2);

  fs.writeFile('land.json', saveCountry, (err, data) => { 
      if (err) throw err; 
  })
    res.render('about',{data:Object.entries(newCountry).join(' ') + ' - har nu sparats.'});
  })
});
 
module.exports = router;
