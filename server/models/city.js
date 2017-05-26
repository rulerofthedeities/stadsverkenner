var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var flagsSchema = new Schema({
  "includeInDistance": {type: Boolean}, 
  "hasHomePage": {type: Boolean}, 
  "hasAttractionsPage": {type: Boolean}, 
  "hasAttractionsListPage": {type: Boolean}, 
  "hasBuildingPage": {type: Boolean}, 
  "hasPhotoPage": {type: Boolean}, 
  "hasMapPage": {type: Boolean}, 
  "hasFactsPage": {type: Boolean}, 
  "hasToursPage": {type: Boolean}, 
  "hasPostersPage": {type: Boolean}
}, {_id : false})

var languageSchema = new Schema({
  "en": String,
  "nl": String,
  "de": String,
  "fr": String
}, {_id : false})

var citySchema = new Schema({
    alias: {type: languageSchema, required: true},
    name: languageSchema,
    icon: String,
    zoom: String,
    flags: flagsSchema,
    pos: [Number]
  }, {collection: 'cities'}
);

citySchema.index({'alias.nl': 1, 'publish.nl': 1}); 

module.exports = mongoose.model('City', citySchema);
