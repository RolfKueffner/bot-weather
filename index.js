var package = require('./package.json');
var _ = require('lodash');
var weather = require('openweather-apis');
weather.setLang('de');
weather.setAPPID('a286cd16ae3253ebe856840465ad7272');


var Module = function (bot) {
  this.bot = bot;
  this.name = package.name;
  this.version = package.version;
  // add channel names as trings to only allow certain channels
  this.allowedChannels = [];
  this.help = function () {
    return {
      "weather": "Show weather in city"

    };
  };
  this.commands = {};

  this.commands.weather = function(channel, args, user) {
    var city = args;
    weather.setCity(city);
    weather.getAllWeather(function (err, result) {
      if (err){
        console.log("ERROR" ,err);
      }
      if (result.cod === 200) {
        var weather = [result.weather[0].description, result.main.temp];
        bot.postMessage(channel, weather[0] + " in " + result.name + " bei " + weather[1] + "°C");
      }
      else{
        bot.postMessage(channel, "Stadt nicht gefunden");
      }
    });
  };

};

Module.prototype.toString = function() {
  return this.name;
};


var exports = module.exports = Module;