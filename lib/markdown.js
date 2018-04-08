/* jshint node:true */
"use strict";

var rHeader = /^\s*(\#+|={3,}|-{3,})/;
var rBadge = /^\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)$/;

function markdownBadger(content, imgUrl, linkUrl, altText) {
  var badgeContent = getBadgeMarkdown(imgUrl, linkUrl, altText);

  var lines = content.split(/\n/);
  var idealLine = findLastBadgeLine(lines);
  if(idealLine >= 0) {
    lines.splice(idealLine + 1, 0, badgeContent);
  }else{
    idealLine = findHeaderLine(lines);
    // if the next is not an empty line, add another empty line
    if(lines[idealLine + 1]) badgeContent += '\n';
    lines.splice(idealLine + 1, 0, '\n' + badgeContent);
  }

  return lines.join('\n');
}

function findHeaderLine(lines) {
  var i = 0;

  for(;i < lines.length;i++) {
    if(rHeader.test(lines[i])) return i;
  }
  return -1;
}
function findLastBadgeLine(lines) {
  var i = lines.length - 1;

  for(;i >= 0;i--) {
    if(rBadge.test(lines[i])) return i;
  }
  return -1;
}

function getBadgeMarkdown(imgUrl, linkUrl, altText) {
  return '[![' + altText + '](' + imgUrl + ')](' + linkUrl + ')';
}

module.exports = markdownBadger;
