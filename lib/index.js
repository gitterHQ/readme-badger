/* jshint node:true */
"use strict";

var markdownBadger = require('./markdown');
var textileBadger = require('./textile');
var rdocBadger = require('./rdoc');
var orgmodeBadger = require('./orgmode');
var plaintextBadger = require('./plaintext');

var markupBadgers = {
  markdown: markdownBadger,
  mdown: markdownBadger,
  mkdn: markdownBadger,
  md: markdownBadger,

  textile: textileBadger,

  rdoc: rdocBadger,

  org: orgmodeBadger
};

var addBadge = function(repoName, fileExt, content, options) {
  var imgOrigin = options && options.imgOrigin || 'https://badges.gitter.im';
  var linkOrigin = options && options.linkOrigin || 'https://gitter.im';

  var imgUrl =  imgOrigin + '/Join%20Chat.svg';
  var linkUrl = linkOrigin + '/' + repoName + '?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge';

  // failover to plaintext
  var badger = markupBadgers[fileExt] || plaintextBadger;

  return badger(content, imgUrl, linkUrl);
};

var isSupported = function(fileExt) {
  return !!markupBadgers[fileExt];
};

module.exports = {
  addBadge: addBadge,
  isSupported: isSupported
};
