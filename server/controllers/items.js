var response = require('../response'),
    mongoose = require('mongoose'),
    Item = require('../models/item'),
    Activity = require('../models/activity');

module.exports = {
  getArticles: function(req, res) {
    cityAlias = req.params.city;
    const pipeline = [
      {$match:{'city.alias.nl': cityAlias, 'isPublished.nl':true}},
      {$project:{
        _id:0, 
        title:'$title.nl', 
        alias:'$alias.nl', 
        preview:'$preview.nl',
        thumb:'$img.thumb',
        traffic: '$traffic'
      }},
      {$sort:{traffic:-1}}
    ];
    Item.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error fetching articles', function(){
        response.handleSuccess(res, docs, 200, 'Fetched articles');
      });
    });
  },
  getArticlesMap: function(req, res) {
    cityAlias = req.params.city;
    const pipeline = [
      {$match:{'city.alias.nl': cityAlias, 'img.thumb': {$exists: true}}},
      {$project:{
        _id:0, 
        pos:1,
        isTopAttraction:1,
        title:'$title.nl', 
        alias:'$alias.nl', 
        address: '$address',
        thumb:'$img.thumb',
        hasArticle:'$isPublished.nl'
      }},
      {$sort:{title:1}}
    ];
    Item.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error fetching articles', function(){
        response.handleSuccess(res, docs, 200, 'Fetched articles');
      });
    });
  },
  getArticleHeader: function(req, res) {
    cityAlias = req.params.city;
    itemAlias = req.params.item;
    const pipeline = [
      {$match:{'city.alias.nl': cityAlias, 'alias.nl': itemAlias, 'isPublished.nl':true}},
      {$project:{
        _id:0, 
        title:'$title.nl',
        subTitle: '$subTitle.nl',
        alias:'$alias.nl',
        cityAlias:'$city.alias.en',
        preview:'$preview.nl',
        cityName: '$city.name.nl',
        legacyId: '$legacy.id',
        hasPos: {$gt: ["$pos", null]},
        photoCount: {$size: { $ifNull: [ "$photos", [] ] }},
        photoCountRelated: {$size: { $ifNull: [ "$photosRelated", [] ] }}
      }}
    ];
    Item.aggregate(pipeline, function(err, docs) {
      if (docs[0]) {
        const q = {
          city: docs[0].cityAlias,
          tpe: {$ne: ''},
          provider: 'viator',
          'nl':{$exists:true},
          'nl.isActive': true,
          'nl.translationLevel': {$gte: 90}
        }
        if (docs[0].legacy) {
          q.itemIds = docs[0].legacy.id
        }
        Activity.find(q, function(err, activityDocs) {
          docs[0].nrOfActivities = 0;
          if (activityDocs) {
            docs[0].nrOfActivities = activityDocs.length;
          }
          response.handleError(err, res, 500, 'Error fetching articles', function(){
            response.handleSuccess(res, docs[0], 200, 'Fetched articles');
          });
        })
      } else {
        response.handleSuccess(res, null, 200, 'No articles found');
      }
    });
  },
  getArticleInfo: function(req, res) {
    cityAlias = req.params.city;
    itemAlias = req.params.item;
    const pipeline = [
      {$match:{'city.alias.nl': cityAlias, 'alias.nl': itemAlias, 'isPublished.nl':true}},
      {$project:{
        _id:0,
        path: '$city.alias.en',
        content:'$content.nl'
      }}
    ];
    Item.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error fetching article info', function(){
        response.handleSuccess(res, docs[0], 200, 'Fetched article info');
      });
    });
  },
  getArticleLocation: function(req, res) {
    cityAlias = req.params.city;
    itemAlias = req.params.item;
    const pipeline = [
      {$match:{'city.alias.nl': cityAlias, 'alias.nl': itemAlias, 'isPublished.nl':true}},
      {$project:{
        _id: 0,
        path: '$city.alias.en',
        pos: '$pos',
        img: '$img.thumb',
        address: '$address',
        title: '$title.nl'
      }}
    ];
    Item.aggregate(pipeline, function(err, docs) {

      response.handleError(err, res, 500, 'Error fetching article info', function(){
        response.handleSuccess(res, docs[0], 200, 'Fetched article info');
      });
    });
  },
  getArticlePhotos: function(req, res) {
    cityAlias = req.params.city;
    itemAlias = req.params.item;
    const pipeline = [
      {$match:{'city.alias.nl': cityAlias, 'alias.nl': itemAlias, 'isPublished.nl':true}},
      {$project:{
        _id: 0,
        path: '$city.alias.en',
        firstPhoto: '$img.photo',
        items: '$photos',
        related: '$photosRelated'
      }}
    ];
    Item.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error fetching article info', function(){
        response.handleSuccess(res, docs[0], 200, 'Fetched article info');
      });
    });
  },
  getCitySlides: function(req, res) {
    cityAlias = req.params.city;
    const pipeline = [
      {$match:{'city.alias.nl': cityAlias, 'isPublished.nl':true, 'img.slides':{$exists: true}}},
      {$project:{
        _id: 0,
        slides: '$img.slides',
        alias: '$alias.nl',
        title: '$title.nl'
      }}
    ];
    Item.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error fetching city slides', function(){
        response.handleSuccess(res, docs, 200, 'Fetched city slides');
      });
    });
  },
  getCitiesTraffic: function(req, res) {
    const pipeline = [
      {$match:{'isPublished.nl':true}},
      {$group:{
        _id: { alias: "$city.alias.nl", name: "$city.name.nl"},
        total:{$sum:'$traffic'}
      }},
      {$sort:{total:-1}},
      {$limit: 8},
      {$project:{
        _id: 0,
        alias: '$_id.alias',
        name: '$_id.name',
        total: 1
      }}
    ];
    Item.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error fetching city traffic', function(){
        response.handleSuccess(res, docs, 200, 'Fetched city traffic');
      });
    });
  },
  getArticlesTraffic: function(req, res) {
    const pipeline = [
      {$match:{'isPublished.nl':true}},
      {$group:{
        _id: { alias: "$alias.nl", name: "$title.nl", city:"$city.alias.nl"},
        total:{$sum:'$traffic'}
      }},
      {$sort:{total:-1}},
      {$limit: 7},
      {$project:{
        _id: 0,
        alias: '$_id.alias',
        name: '$_id.name',
        city: '$_id.city',
        total: 1
      }}
    ];
    Item.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error fetching articles traffic', function(){
        response.handleSuccess(res, docs, 200, 'Fetched articles traffic');
      });
    });
  }
}
