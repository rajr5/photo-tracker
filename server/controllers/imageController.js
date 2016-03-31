(function(){
  'use strict';

  var _ = require("lodash");
  var ImageRequest = require('../models/imageRequest');

  /**
   * 200 - OK success GET
   * 201 - created success POST
   * 203 - created success PUT
   * 204 - no content success DELETE
   * 400 bad request
   * 401 unathorized
   * 403 forbidden
   * 404 not found
   * 405 method not allowed
   */
  /** Helper function to send JSON server response */
  var sendJson = function(res, status, content) {
        // Add default message
        content = content || {};
        if ((status === 200 || status === 201 || status === 203) &&
            !content.hasOwnProperty('message')) {
                content.message = "ok";
        }
        res.status(status);
        res.json(content);
  };

  /** Helper function to save incoming messages to db */
  var saveDbLog = function(req) {
    var irData = {};
    try {
      // Ensure that none of the keys start with "$" as this is not allowed in mongo
      // Turn object into string JSON and replace $ with _$
      irData = {headers: req.headers, url: req.url, method: req.method, ip: req.connection.remoteAddress};
      var ir = new ImageRequest({request: irData});
      ir.save(function(err) {
        if (err) {
          console.log('Error saving db log record', err);
        } else {
          console.log('log record saved to db');
        }
      });
    } catch (e) {
      console.log('Could not save db record', e);
    }
    return irData;
  };


  /** Controllers */

  module.exports.getImage = function(req, res) {
    // recieve input and unwrap message
    // var message = sfdc.unwrapMessage(req.body);
    // save message receipt to db
    var irData = saveDbLog(req);
    var options = {
      root: __dirname,
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };

    // Send response
    res.sendFile('square.jpg', options, function(err) {
      if (err) {
        console.log('error sending file', err);
        res.status(err.status).end();
      } else {
        console.log('sent file');
      }
    });
    // sendJson(res,200, {output: irData});
  };


})();
