var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Link = require('./link');

var User = db.Model.extend({
  tableName: 'user',
  links: function() {
    return this.belongsToMany(Link);
  }
});

module.exports = User;
