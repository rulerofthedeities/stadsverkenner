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
    flags: flagsSchema
  }, {collection: 'cities'}
);

module.exports = mongoose.model('City', citySchema);
