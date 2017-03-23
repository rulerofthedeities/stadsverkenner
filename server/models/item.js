var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var languageSchema = new Schema({
  "en": String,
  "nl": String,
  "fr": String,
  "de": String
}, {_id: false});

var languageBoolSchema = new Schema({
  "en": Boolean,
  "nl": Boolean,
  "fr": Boolean,
  "de": Boolean
}, {_id: false});


var itemSchema = new Schema({
    alias: String,
    title: String,
    subTitle: String,
    description: languageSchema,
    preview: languageSchema,
    content: languageSchema,
    thumb: String,
    isPublished: Boolean,
    isTopAttraction: Boolean,
    isQuality: Boolean
  }, {collection: 'items'}
);

module.exports = mongoose.model('Item', itemSchema);