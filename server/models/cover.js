var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var coverSchema = new Schema({
    item: {
      alias: {type: String, required: true},
      name: {type: String, required: true}
    },
    city: {
      alias: {type: String, required: true},
      name: {type: String, required: true}
    },
    img: {type: String, required: true}
  }, {collection: 'covers'}
);

module.exports = mongoose.model('Cover', coverSchema);