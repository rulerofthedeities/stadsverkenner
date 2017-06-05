var response = require('../response'),
    mongoose = require('mongoose'),
    Activity = require('../models/activity');

module.exports = {
  getActivities: function(req, res) {
    const cityAlias = req.params.city;
    const pipeline = [
      {$match:{
        city: cityAlias,
        tpe: {$ne: ''},
        provider: 'viator',
        'nl':{$exists:true},
        'nl.isActive': true
      }},
      {$project:{
        _id:0,
        code: '$code',
        tpe:'$tpe',
        tourtpes:'$tourtpes',
        showOnArticle:'$showOnArticle',
        pricingEuro: '$pricing.EUR',
        name: '$nl.name',
        description: '$nl.description',
        duration: '$nl.duration',
        productUrl: '$nl.productUrl',
        imgUrl: '$nl.imgUrl',
        thumbUrl: '$nl.thumbUrl',
        rank: '$nl.rank',
        ratingAvg: '$nl.ratingAvg'
      }},
      {$sort:{tpe:1, rank:1}}
    ];
    Activity.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error fetching activities', function(){
        response.handleSuccess(res, docs, 200, 'Fetched activities');
      });
    });
  },
  getActivityTpes: function(req, res) {
    const cityAlias = req.params.city;
    const pipeline = [
      {$match:{
        city: cityAlias,
        tpe: {$ne: ''},
        provider: 'viator',
        'nl':{$exists:true},
        'nl.isActive': true
      }},
      {$group: {
        _id: '$tpe'
      }},
      {$project: {
        tpe: '$_id', _id:0
      }}
    ];
    Activity.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error fetching activity types', function(){
        response.handleSuccess(res, docs, 200, 'Fetched activity types');
      });
    });
  }
}
