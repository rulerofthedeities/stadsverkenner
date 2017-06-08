var response = require('../response'),
    mongoose = require('mongoose'),
    Activity = require('../models/activity');

let fetchActivities= function(res, cityAlias, itemId) {

  const q = {
    city: cityAlias,
    tpe: {$ne: ''},
    provider: 'viator',
    'nl':{$exists:true},
    'nl.isActive': true,
    'nl.translationLevel': {$gte: 90}
  };

  if (itemId) {
    q.itemIds = itemId;
  }
        
  const pipeline = [
    {$match: q},
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
}

module.exports = {
  getActivitiesItem: function(req, res) {
    const cityAlias = req.params.city,
          itemId = req.params.itemId;
    console.log(cityAlias, itemId);
    if (itemId) {
      fetchActivities(res, cityAlias, itemId);
    } else {
      fetchActivities(res, cityAlias, null);
    }
  },
  getActivities: function(req, res) {
    console.log('getting activities');
    const cityAlias = req.params.city;
    fetchActivities(res, cityAlias, null);
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
