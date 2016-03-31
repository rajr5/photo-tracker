(function () {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var imageController = require('./controllers/imageController');

  /** Routes */
  router.get('/', imageController.getImage);
  // Have another route to generate img code with a random identifier (and then maybe attempt to match the record on the way back)


  module.exports = router;

})();
