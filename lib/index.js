/* jshint node:true */
"use strict";

var markdownBadger = require('./markdown');
var textileBadger = require('./textile');
var rdocBadger = require('./rdoc');
var orgmodeBadger = require('./orgmode');
var plaintextBadger = require('./plaintext');
var assert = require('assert');

var markupBadgers = {
  markdown: markdownBadger,
  mdown: markdownBadger,
  mkdn: markdownBadger,
  md: markdownBadger,

  textile: textileBadger,

  rdoc: rdocBadger,

  org: orgmodeBadger
};

var addBadge = function(content, fileExt, imageUrl, linkUrl, altText, plaintextFailover) {
  assert(content, 'readme content required');
  assert(fileExt, 'readme fileExt required');
  assert(imageUrl, 'badge imageUrl required');
  assert(linkUrl, 'badge linkUrl required');
  assert(altText, 'badge altText required');
  assert(plaintextFailover, 'plaintextFailover required');

  var plaintextBadger = function(content) {
    return content + '\n' + plaintextFailover + '\n';
  };

  // failover to plaintext
  var badger = markupBadgers[fileExt.toLowerCase()] || plaintextBadger;

  return badger(content, imageUrl, linkUrl, altText);
};

var willFailover = function(fileExt) {
  return !!markupBadgers[fileExt.toLowerCase()];
};

module.exports = {
  addBadge: addBadge,
  willFailover: willFailover
};
