var response = require('../response'),
    mongoose = require('mongoose'),
    Cover = require('../models/cover');

let getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  getCover: function(req, res) {
    Cover.find({},{_id:0}, function(err, docs) {
      const nr = getRandomInt(0, docs.length - 1);
      response.handleError(err, res, 500, 'Error fetching covers', function(){
        response.handleSuccess(res, docs[nr], 200, 'Fetched cover');
      });
    })
  }
}
