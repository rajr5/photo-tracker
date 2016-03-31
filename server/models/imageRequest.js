(function(){
  'use strict';

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var imageRequestSchema = new Schema({
    request: { type: Schema.Types.Mixed },
    created: { type: Date, default: Date.now }
  });

  imageRequestSchema.pre('save', function(next) {
    var currentDate = new Date();
    if (!this.created) {
      this.created = currentDate;
    }
    next();
  });

  module.exports = mongoose.model('ImageRequest', imageRequestSchema);

})();
