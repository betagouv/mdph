'use strict';

var _ = require('lodash');
var async = require('async');
var Mdph = require('../mdph/mdph.model');
var User = require('../user/user.model');
var Request = require('../request/request.model');
var moment = require('moment');

function countAgents(data, mdphs, done) {
  async.eachSeries(mdphs, function (mdph, callback) {
    User.find({
      mdph: mdph._id
    }, function (err, list) {
      data[mdph.zipcode].agents = err || !list ? 0 : list.length;
      callback();
    });
  }, function (err) {
    if (err) { throw err; }
    return done();
  });
}

function countRequests(data, mdphs, done) {
  async.eachSeries(mdphs, function (mdph, callback) {
    Request.find({
      mdph: mdph.zipcode
    }, function (err, list) {
      data[mdph.zipcode].requests = {};
      data[mdph.zipcode].requests.total = err || !list ? 0 : list.length;

      var requestByStatus = _.groupBy(list, 'status');
      _.forEach(['en_cours', 'emise', 'evaluation'], function(status) {
        var requestsForStatus = requestByStatus[status] ? requestByStatus[status].length : 0
        data[mdph.zipcode].requests[status] = requestsForStatus;
      })

      callback();
    });
  }, function (err) {
    if (err) { throw err; }
    return done();
  });
}

function countCertificats(data, mdphs, done) {
  async.eachSeries(mdphs, function (mdph, callback) {
    Request.find({
      mdph: mdph.zipcode
    }, function (err, list) {
      data[mdph.zipcode].certificats = {partenaire: 0, direct: 0};

      list.forEach(function(request) {
        if (request.documents && request.documents.length > 0) {
          request.documents.forEach(function(doc) {
            if (doc.type === 'certificatMedical') {
              if (doc.partenaire) {
                data[mdph.zipcode].certificats.partenaire += 1;
              } else {
                data[mdph.zipcode].certificats.direct += 1;
              }
            }
          });
        }
      });

      callback();
    });
  }, function (err) {
    if (err) { throw err; }
    return done();
  });


  return data;
}

exports.mdph = function(req, res) {
  Mdph.find().sort('zipcode').exec(function(err, mdphs) {
    if(err) { return handleError(req, res, err); }

    var data = [];
    mdphs.forEach(function(mdph) {
      data.push({
        name: mdph.name,
        zipcode: mdph.zipcode
      });
    });

    var dataByZipcode = _.indexBy(data, 'zipcode');

    async.parallel([
      function(cb) {
        countAgents(dataByZipcode, mdphs, cb);
      },
      function(cb) {
        countRequests(dataByZipcode, mdphs, cb);
      },
      function(cb) {
        countCertificats(dataByZipcode, mdphs, cb);
      }
    ], function(err) {
      res.json(data);
    });
  });
};

exports.site = function(req, res) {
  User.find().exec(function(err, users) {
    if(err) { return handleError(req, res, err); }

    var data = {
      count: users.length
    };

    res.json(data);
  });
};

function getOneWeekAgo() {
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return oneWeekAgo;
}

exports.history = function(req, res) {
  Request.find({
    createdAt: {'$gte': getOneWeekAgo()}
  }).sort('createdAt').exec(function(err, requests) {
    if (err) { return handleError(req, res, err); }
    if (!requests) {
      return res.json({});
    }

    requests.forEach(function(request) {
      request.createdAtByDay = moment(request.createdAt).format('DD/MM/YYYY');
    });

    var groupByDate = _.groupBy(requests, 'createdAtByDay');
    var data = [];
    _.forEach(groupByDate, function(requests, date) {
      data.push({
        date: date,
        count: requests.length
      })
    });
    res.json(data);
  });
};

exports.certificats = function(req, res) {
  Request.find().exec(function(err, requests) {
    if (err) { return handleError(req, res, err); }
    if (!requests) {
      return res.json({});
    }
    var data = 0;
    requests.forEach(function(request) {
      if (request.documents && request.documents.length > 0) {
        request.documents.forEach(function(doc) {
          if (doc.type === 'certificatMedical') {
            data += 1;
          }
        });
      }
    });
    res.json(data);
  });
};


function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
