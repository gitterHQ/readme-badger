/* jshint node:true */
"use strict";

function badger(content, imgUrl, linkUrl, altText) {
  var lines = content.split('\n');
  var idealLine = findIdealLineForInsert(lines);
  var badgeContent = '\n.. image:: ' + imgUrl + '\n' +
                       '   :alt: ' + altText + '\n' +
                       '   :target: ' + linkUrl;
  lines.splice(idealLine, 0, badgeContent);

  return lines.join('\n');
}

function findIdealLineForInsert(lines) {
  var i = 0;
  var seenHeader = false;

  for(; i < lines.length; i++) {
    // the top line is *never* the header
    if(/^\s*(={3,}|-{3,})/.test(lines[i]) && i > 0) {
      seenHeader = true;
    } else {
      if(seenHeader) break;
    }
  }

  return i;
}

module.exports = badger;
