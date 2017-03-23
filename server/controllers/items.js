var response = require('../response'),
    mongoose = require('mongoose'),
    Item = require('../models/item');

module.exports = {
  getArticles: function(req, res) {
    cityAlias = req.params.city;
    const pipeline = [
      {$match:{'city.alias': cityAlias, 'isPublished.nl':true}},
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
  getArticle: function(req, res) {
    cityAlias = req.params.city;
    itemAlias = req.params.item;
    const pipeline = [
      {$match:{'city.alias': cityAlias, 'alias.nl': itemAlias, 'isPublished.nl':true}},
      {$project:{
        _id:0, 
        title:'$title.nl',
        alias:'$alias.nl',
        preview:'$preview.nl'
      }}
    ];
    Item.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error fetching articles', function(){
        response.handleSuccess(res, docs, 200, 'Fetched articles');
      });
    });
  }
}
