/* jshint node:true, unused:strict */
/* global describe:true, it:true */
"use strict";

var assert = require('assert');
var fs = require('fs');
var badger = require('../..');

describe('reStructuredText', function() {

  var imageUrl = 'https://badges.gitter.im/badge.svg';
  var linkUrl = 'https://gitter.im';
  var altText = 'Badgers are great!';

  it('inserts below double hash header', function() {
    var before = fs.readFileSync(__dirname + '/before.rst', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/after.rst', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'rst', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

});
