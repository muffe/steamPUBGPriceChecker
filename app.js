var market = require('steam-market-pricing');


getAPIData();
setInterval(getAPIData, 60 * 1000);


function getAPIData() {
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
    var ausgangsSumme = 0;
    var currentSumme = 0;
    for(var i in names) {
        console.log(names[i] + ' lowest price: ' + data[names[i]]['lowest_price'] + ", ausgangsPreis: " + ausgangsPreis[i] + "€");
        ausgangsSumme = ausgangsSumme + ausgangsPreis[i];
        currentSumme = currentSumme + parseFloat(data[names[i]]['lowest_price']);
    }
    console.log("");
    console.log("");
    console.log("Ausgang: " + parseFloat(ausgangsSumme).toFixed(2)+ "€");
    console.log("Aktuell: " + parseFloat(currentSumme).toFixed(2)+ "€");
    console.log("");
    console.log("");
  }, 3);
}
