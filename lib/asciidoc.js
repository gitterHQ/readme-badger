/* jshint node:true */
"use strict";

function badger(content, imgUrl, linkUrl, altText) {
  var lines = content.split('\n');
  var idealLine = findIdealLineForInsert(lines);
  var badgeContent = 'image:' + imgUrl + '[link="' + linkUrl + '"]';

  lines.splice(idealLine, 0, badgeContent);

  return lines.join('\n');
}

function findIdealLineForInsert(lines) {
  var i,
    headerAt = 0,
    badgesAt = 0;

  for(i = 0; i < lines.length; i++) {
    if(/^\s*(\=+|={3,}|-{3,})/.test(lines[i])) {
      headerAt = i;
    } else if (/^image:/.test(lines[i])) {
      badgesAt = i;
    }
    if (badgesAt) return badgesAt;
  }
  
  if (headerAt) return headerAt + 2;
  return i;
}

module.exports = badger;
