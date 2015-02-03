/* jshint node:true, unused:strict */
/* global describe:true, it:true */
"use strict";

var assert = require('assert');
var fs = require('fs');
var badger = require('../..');

describe('reStructuredText', function() {

  var imageUrl = 'https://badges.gitter.im/Join%20Chat.svg';
  var linkUrl = 'https://gitter.im/myorg/myrepo?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge';
  var altText = 'Join the chat at https://gitter.im/myorg/myrepo';

  it('inserts below double hash header', function() {
    var before = fs.readFileSync(__dirname + '/before.rst', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/after.rst', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'rst', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

});
