// Max
var configs = {
  elena: {
    currency: "CAD", dateFormat: "MM/DD/YY"
  },
  max: {
    currency: "AUD", dateFormat: "DD/MM/YYYY"
  }
}
var rowTemplate = function(data) {
  return '<li> \
  <span class="date">&date</span> \
  <span class="input">&input</span> \
  <span class="currency">&currency</span> \
  <span class="output">&output</span> \
  <span class="outputCurrency">EUR</span> \
  </li>'
    .replace("&date", data.date)
    .replace("&input", data.input)
    .replace("&currency", data.currency)
    .replace("&output", data.output)
      // var output = inputCurrencyData.date + ":" + inputCurrencyData.amount + " " + config.currency + " = " + conversion + " EUR";
}
var converter = function converter(convertMe, config) {
  fx.base = "EUR";
  return convertMe.map(function (inputCurrencyData) {
    getRates(inputCurrencyData, function (data) {
      fx.rates = data.rates;
      var conversion = fx(inputCurrencyData.amount).from(config.currency).to("EUR");
      var output = inputCurrencyData.date + ":" + inputCurrencyData.amount + " " + config.currency + " = " + conversion + " EUR";
      $("#results").append(rowTemplate({
        date: inputCurrencyData.date, 
        input: inputCurrencyData.amount,
        currency: config.currency,
        output: conversion
      }))
    })
  })

}
var getRates = function getRates(input, callback) {
  $.getJSON("https://api.fixer.io/" + input.date + "?symbols=AUD,CAD,USD", callback);
}

var convertDate = function (inputDate, config) {
  var converted = moment(inputDate, config.dateFormat).format("YYYY-MM-DD")
  return converted;
}

var convertNumber = function convertNumber(inputNumber) {
  return Math.abs(parseFloat(inputNumber));
}

var nonEmptyRow = function (item) {
  return item != "";
}
var parseFile = function parseFile(config, callback) {
  var input = $("#inputFile")[0];
  Papa.parse(input.files[0], {
    complete: function (results, file) {
      var mapped = results.data.filter(nonEmptyRow).map(function (item) {
        return { date: convertDate(item[0], config), amount: convertNumber(item[1]) }
      })
      callback(mapped);
    }
  })
};
$("form").submit(function (event) {
  event.preventDefault();
  // clear results
  $("#results").html("");
  var input = $("#inputFile")[0];
  var configInput = $("#configPref").val();
  var config = configs[configInput];
  parseFile(config, function (data) {
    converter(data, config);
  })
});