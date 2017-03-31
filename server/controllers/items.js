var response = require('../response'),
    mongoose = require('mongoose'),
    Item = require('../models/item');

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
        thumb:'$img.thumb'
      }},
      {$sort:{rank:1}}
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
        preview:'$preview.nl',
        cityName: '$city.name.nl',
        hasPos: {$gt: ["$pos", null]},
        photoCount: {$size: '$photos'}
      }}
    ];
    Item.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error fetching articles', function(){
        response.handleSuccess(res, docs[0], 200, 'Fetched articles');
      });
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
        address: '$address.nl',
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
  getSlides: function(req, res) {
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
      response.handleError(err, res, 500, 'Error fetching slides', function(){
        response.handleSuccess(res, docs, 200, 'Fetched slides');
      });
    });
  }
}
