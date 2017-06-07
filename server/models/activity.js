var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var languageSchema = new Schema({
  "isActive": Boolean,
  "name": String,
  "description": String,
  "duration": String,
  "productUrl": String,
  "imgUrl": String,
  "thumbUrl": String,
  "rank": String,
  "ratingAvg": Number,
  "translationLevel": Number
}, {_id: false});

var pricingSchema = new Schema({
  "USD": String,
  "EUR": String,
  "GBP": String,
  "AUD": String,
  "NZD": String,
  "CAD": String
}, {_id: false});

var activitySchema = new Schema({
    code: String,
    provider: String,
    city: String,
    tpe: String,
    tourtpes: String,
    showOnArticle: String,
    isChristmas: Boolean,
    pricing: pricingSchema,
    en: languageSchema,
    fr: languageSchema,
    nl: languageSchema,
    de: languageSchema
  }, {collection: 'activities'}
);

activitySchema.index({'city': 1}); 

module.exports = mongoose.model('Activity', activitySchema);