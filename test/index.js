/* jshint node:true, unused:strict */
/* global describe:true, it:true */
"use strict";

var assert = require('assert');
var fs = require('fs');
var badger = require('..');

describe('readme-badger', function() {
  it('inserts into markdown', function() {
    var before = fs.readFileSync(__dirname + '/examples/markdown-before.md', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/markdown-after.md', { encoding: 'utf8' });

    var result = badger.addBadge('myorg/myrepo', 'md', before);

    assert.equal(result, after);
  });

  it('inserts into rdoc', function() {
    var before = fs.readFileSync(__dirname + '/examples/rdoc-before.rdoc', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/rdoc-after.rdoc', { encoding: 'utf8' });

    var result = badger.addBadge('myorg/myrepo', 'rdoc', before);

    assert.equal(result, after);
  });

  it('inserts into unsupported filetypes', function() {
    var before = fs.readFileSync(__dirname + '/examples/plaintext-before.txt', { encoding: 'utf8' });
    var after = fs.readFileSync(__dirname + '/examples/plaintext-after.txt', { encoding: 'utf8' });

    var result = badger.addBadge('myorg/myrepo', 'txt', before);

    assert.equal(result, after);
  });

});
