var currency = "AUD";

var convertMe = [ 
  { amount: 108, date: "2016-12-12",},
  { amount: 1.91, date: "2016-12-22",},
  { amount: 0.06, date: "2016-12-22",},
  { amount: 1.55, date: "2016-12-22",},
  { amount: 1.97, date: "2016-12-22",},
  { amount: 0.06, date: "2016-12-22",},
  { amount: 172.26, date: "2016-12-23",},
  { amount: 5.17, date: "2016-12-23",},
  { amount: 2.46, date: "2016-12-24"},
  { amount: 0.07, date: "2016-12-24",},
  { amount: 2.90, date: "2016-12-26"},
  { amount: 0.09, date: "2016-12-26",},
  { amount: 664.12, date: "2016-12-28",},
  { amount: 35.21, date: "2017-01-03"},
  { amount: 0.69, date: "2017-01-03"},
  { amount: 0.69, date: "2017-01-11",},
  ]

var converter = function converter(convertMe) {
  fx.base = "EUR";
  convertMe.map(function (inputCurrencyData) {
    getRates(inputCurrencyData, function (data) {
      fx.rates = data.rates;
      var conversion = fx(inputCurrencyData.amount).from(currency).to("EUR");
      console.log(inputCurrencyData.date + ":" + inputCurrencyData.amount + " " + currency + " = " + conversion + " EUR");
    })
  })

}
var getRates = function getRates(input, callback) {
  $.getJSON("https://api.fixer.io/" + input.date + "?symbols=AUD,CAD,USD", callback);
}

converter(convertMe);

// $("form").submit(function(event){
//   event.preventDefault();
//   var input = document.getElementById("inputFile");
//   var parsed = Papa.parse(input.files[0], { complete: function(results, file) {
//     var mapped = results.data.map(function(item) {
//       return {date: item[0], amount: item[1]}
//     })
//     debugger;
//     converter(mapped);
//   }});
// })