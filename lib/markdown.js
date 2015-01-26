/* jshint node:true */
"use strict";

function markdownBadger(content, imgUrl, linkUrl) {
  var badgeContent = getBadgeMarkdown(imgUrl, linkUrl);

  var lines = content.split(/\n/);
  var idealLine = findIdealLineForInsert(lines) || 0;

  lines.splice(idealLine, 0, badgeContent);

  return lines.join('\n');
}

function findIdealLineForInsert(lines) {
  if(lines.length === 0) return 0;
  var i = 0;
  var seenHeader = false;

  for(;i < lines.length;i++) {
    if(/^\s*(\#+|={3,}|-{3,})/.test(lines[i])) {
      seenHeader = true;
    } else {
      if(seenHeader) break;
    }
  }

  return i;
}

function getBadgeMarkdown(imgUrl, linkUrl) {
  return '\n[![Gitter](' + imgUrl + ')](' + linkUrl + ')';
}

module.exports = markdownBadger;
