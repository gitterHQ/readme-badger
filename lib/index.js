/* jshint node:true */
"use strict";

var markdownBadger = require('./markdown');
var textileBadger = require('./textile');
var rdocBadger = require('./rdoc');
var orgmodeBadger = require('./orgmode');
var creoleBadger = require('./creole');
var plaintextBadger = require('./plaintext');
var assert = require('assert');

var markupBadgers = {
  markdown: markdownBadger,
  mdown: markdownBadger,
  mkdn: markdownBadger,
  md: markdownBadger,

  textile: textileBadger,

  rdoc: rdocBadger,

  org: orgmodeBadger,

  creole: creoleBadger
};

var addBadge = function(content, fileExt, imageUrl, linkUrl, altText) {
  assert(content, 'readme content required');
  assert(fileExt, 'readme fileExt required');
  assert(imageUrl, 'badge imageUrl required');
  assert(linkUrl, 'badge linkUrl required');
  assert(altText, 'badge altText required');

  var plaintextBadger = function(content) {
    return content + '\n' + altText + '\n';
  };

  // failover to plaintext
  var badger = markupBadgers[fileExt.toLowerCase()] || plaintextBadger;

  return badger(content, imageUrl, linkUrl, altText);
};

var hasImageSupport = function(fileExt) {
  return !!markupBadgers[fileExt.toLowerCase()];
};

module.exports = {
  addBadge: addBadge,
  hasImageSupport: hasImageSupport
};
