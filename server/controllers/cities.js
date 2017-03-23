var response = require('../response'),
    mongoose = require('mongoose'),
    City = require('../models/city');

module.exports = {
  getCities: function(req, res) {
    const pipeline = [
      {$match:{icon:{$exists:true}}},
      {$project:{_id:0, name:'$name.en', alias:'$alias.en', icon:'$icon.fileName'}},
      {$sort:{name:1}}
    ];
    City.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error fetching cities', function(){
        response.handleSuccess(res, docs, 200, 'Fetched cities');
      });
    });
  },
  getCity: function(req, res) {
    cityAlias = req.params.city;
    City.findOne({'alias.en':cityAlias}, {alias:'$alias.en', name:'$name.en', flags:1, icon:'$icon.fileName'}, function(err, doc) {
      response.handleError(err, res, 500, 'Error fetching city', function(){
        response.handleSuccess(res, doc, 200, 'Fetched city');
      });
    })
  },
  getCityData: function(req, res) {
    cityAlias = req.params.city;
    City.findOne({'alias.en':cityAlias}, function(err, doc) {
      response.handleError(err, res, 500, 'Error fetching city', function(){
        response.handleSuccess(res, doc, 200, 'Fetched city');
      });
    })
  }
}
