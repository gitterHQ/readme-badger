/* jshint node:true */
"use strict";

function markdownBadger(content, imgUrl, linkUrl, altText) {
  var badgeContent = getBadgeMarkdown(imgUrl, linkUrl, altText);

  var lines = content.split(/\n/);
  var idealLine = findIdealLineForInsert(lines) || 0;

  lines.splice(idealLine, 0, badgeContent);

  return lines.join('\n');
}

function findIdealLineForInsert(lines) {
  if(lines.length === 0) return 0;
  var i,
    headerAt = 0,
    badgesAt = 0;

  for(i = 0; i < lines.length; i++) {
    // look for header syntax like #, ===, ---
    // and badge images starting with [![
    if(/^\s*(\#+|={3,}|-{3,})/.test(lines[i])) {
      headerAt = i;
    } else if (/^\s*(\[!\[)/.test(lines[i])) {
      badgesAt = i;
    }
    // if there are multiple badges, add to beginning
    if (badgesAt) return badgesAt;
  }
  
  // in case of header, add after header
  if (headerAt) return headerAt + 2;
  return i;
}

function getBadgeMarkdown(imgUrl, linkUrl, altText) {
  return '[![' + altText + '](' + imgUrl + ')](' + linkUrl + ')';
}

module.exports = markdownBadger;
