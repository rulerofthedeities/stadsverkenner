var response = require('../response'),
    mongoose = require('mongoose'),
    City = require('../models/city');

module.exports = {
  getCities: function(req, res) {
    const pipeline = [
      {$match:{icon:{$exists:true}}},
      {$project:{_id:0, name:'$name.nl', alias:'$alias.nl', icon:'$icon.fileName'}},
      {$sort:{name:1}}
    ];
    City.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error fetching cities', function(){
        response.handleSuccess(res, docs, 200, 'Fetched cities');
      });
    });
  },
  getCity: function(req, res) {
    const cityAlias = req.params.city;
    const pipeline = [
      {$match:{'alias.nl':cityAlias}},
      {$limit: 1},
      {$project:
        {
          alias:1, 
          name:1, 
          zoom:'$map.zoom', 
          pos:'$pos.coordinates',
          icon:'$icon.fileName', 
          flags:1
        }
      }
    ];
    City.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error fetching city', function(){
        response.handleSuccess(res, docs[0], 200, 'Fetched city');
      });
    })
  },
  getCityData: function(req, res) {
    cityAlias = req.params.city;
    City.findOne({'alias.nl':cityAlias}, function(err, doc) {
      response.handleError(err, res, 500, 'Error fetching city data', function(){
        response.handleSuccess(res, doc, 200, 'Fetched city data');
      });
    })
  }
}
