var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Link = require('./link');

var User = db.Model.extend({
  tableName: 'user',
  hasTimestamps: true,

  initialize: function(){
    this.on('creating', this.hashPassword);
  },

  links: function() {
    return this.belongsToMany(Link);
  },

  hashPassword: function(model){
    // bookshelf will wait for promise to resolve before
    // completing the create action. The promise resolution
    // results in editing the model's password attribute. Only then
    // do we save the model to the database.
    var cipher = Promise.promisify(bcrypt.hash);

    return cipher(model.get('password'), null, null).then(function (hash) {
      model.set('password',hash);
    });


  }
});

module.exports = User;
