/* jshint node:true */
"use strict";

var balanced = require('balanced-match');

var rHeader = /^\s*(\#+|={3,}|-{3,})/;
var rBadgePrefix = /\[!\[[^\]]*\]\([^)]*\)\]\(/g; // ends with the first parenthesis of link

function markdownBadger(content, imgUrl, linkUrl, altText) {
  var badgeContent = getBadgeMarkdown(imgUrl, linkUrl, altText);

  var lines = content.split(/\n/);
  var idealLine = findLastBadgeLine(lines);
  if(idealLine >= 0) {
    var line = lines[idealLine];
    // count badges and find the prefix end index of the last badge in this line
    var count = 0;
    var end;
    line.replace(rBadgePrefix, function(match, offset) {
      count++;
      end = offset + match.length - 1;
      return match;
    });

    var lastPart = line.substring(end);
    var result = balanced('(', ')', lastPart);
    if (!result || count === 1 && result.end === lastPart.length - 1) {
      // only 1 badge in this line and ends with a badge, or exceptions
      lines.splice(idealLine + 1, 0, badgeContent);
    } else {
      // insert into the same line
      lines[idealLine] = line.substring(0, end + result.end + 1) + ' ' + badgeContent
          + lastPart.substring(result.end + 1);
    }
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
    if(rBadgePrefix.test(lines[i])) return i;
  }
  return -1;
}

function getBadgeMarkdown(imgUrl, linkUrl, altText) {
  return '[![' + altText + '](' + imgUrl + ')](' + linkUrl + ')';
}

module.exports = markdownBadger;
