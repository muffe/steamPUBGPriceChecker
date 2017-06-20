const market = require('steam-market-pricing');
const http = require('http')
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 60, checkperiod: 60 } );
const port = 7331

const requestHandler = (request, response) => {
  if(request.url == "/") {
    getAPIData(request, response);
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log("server is running");
});

function getAPIData(request, response) {
  var names = [
      'Grey Shirt',
      'Red Hi-top Trainers',
      'PLAYERUNKNOWN\'S Trenchcoat',
      'Jeans (Tan)',
      'PLAYERUNKNOWN\'s Bandana'
  ];

  var ausgangsPreis = [
    109.25,
    234.80,
    359.50,
    133.88,
    360
  ];
  market.getItemsPrice(578080, names, function(data) {
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    var cacheValue = myCache.get("STEAM_API");
    if(cacheValue != undefined) {
      console.log("CACHE HIT");
      response.end(cacheValue);
      return;
    }

    var ausgangsSumme = 0;
    var currentSumme = 0;
    var responseString = "";

    for(var i in names) {
        responseString = responseString + names[i] + ' lowest price: ' + data[names[i]]['lowest_price'] + ", ausgangsPreis: " + ausgangsPreis[i] + "€<br/>";
        ausgangsSumme = ausgangsSumme + ausgangsPreis[i];
        currentSumme = currentSumme + parseFloat(data[names[i]]['lowest_price']);
    }
    responseString = responseString + "<br/>";
    responseString = responseString + "<br/>";
    responseString = responseString + "Ausgang: " + parseFloat(ausgangsSumme).toFixed(2)+ "€<br/>";
    responseString = responseString + "Aktuell: " + parseFloat(currentSumme).toFixed(2)+ "€<br/>";
    responseString = responseString + "<br/>";
    responseString = responseString + "<br/>";

    myCache.set("STEAM_API", responseString, 60);
    console.log("CACHE MISS");

    response.end(responseString);
  }, 3);
}
