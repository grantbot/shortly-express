var db = require('../config');
var Click = require('./click');
var crypto = require('crypto');
var Users = require('./user');

var Link = db.Model.extend({
  tableName: 'urls',
  hasTimestamps: true,
  defaults: {
    visits: 0
  },
  clicks: function() {
    return this.hasMany(Click);
  },
  users: function () {
    return this.belongsToMany(Users);
  },
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      var shasum = crypto.createHash('sha1');
      shasum.update(model.get('url'));
      model.set('code', shasum.digest('hex').slice(0, 5));
      console.log('new link made!');
    });
  }
});

module.exports = Link;
