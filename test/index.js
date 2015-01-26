/* jshint node:true, unused:strict */
/* global describe:true, it:true */
"use strict";

var assert = require('assert');
var fs = require('fs');
var badger = require('..');

describe('readme-badger', function() {

  var imageUrl = 'https://badges.gitter.im/Join%20Chat.svg';
  var linkUrl = 'https://gitter.im/myorg/myrepo?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge';
  var altText = 'Join the chat at https://gitter.im/myorg/myrepo';

  it('inserts into markdown', function() {
    var before = fs.readFileSync(__dirname + '/examples/markdown-before.md', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/markdown-after.md', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'md', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into textile', function() {
    var before = fs.readFileSync(__dirname + '/examples/textile-before.textile', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/textile-after.textile', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'textile', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into rdoc', function() {
    var before = fs.readFileSync(__dirname + '/examples/rdoc-before.rdoc', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/rdoc-after.rdoc', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'rdoc', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into orgmode', function() {
    var before = fs.readFileSync(__dirname + '/examples/orgmode-before.org', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/orgmode-after.org', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'org', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into creole', function() {
    var before = fs.readFileSync(__dirname + '/examples/creole-before.creole', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/creole-after.creole', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'creole', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into mediawiki', function() {
    var before = fs.readFileSync(__dirname + '/examples/mediawiki-before.mediawiki', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/mediawiki-after.mediawiki', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'mediawiki', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into rst', function() {
    var before = fs.readFileSync(__dirname + '/examples/rst-before.rst', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/rst-after.rst', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'rst', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

  it('inserts into unsupported filetypes', function() {
    var before = fs.readFileSync(__dirname + '/examples/plaintext-before.txt', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/plaintext-after.txt', { encoding: 'utf8' });

    var result = badger.addBadge(before, 'txt', imageUrl, linkUrl, altText);

    assert.equal(result, after);
  });

});
