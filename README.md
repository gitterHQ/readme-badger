readme-badger
=============

Whizzy badges in your READMEs.

Install
-------

`npm install readme-badger`

How To Use
----------

### `addBadge(content, fileExt, imageUrl, linkUrl, altText)`

Returns the content but with a new badge inserted.

* `content`: the text content of a README.
* `fileExt`: the file extension of the README (md, textile, rdoc etc).
* `imageUrl`: the image url for the badge.
* `linkUrl`: the url for the badge to link to.
* `altText`: the alternative if images arnt visible. This will be used on its own for plaintext READMEs, so include a url in the text.

### `hasImageSupport(fileExt)`

Returns true/false depending on whether the readme will render a badge image or just the altText.

* `fileExt`: the file extension of the README (md, textile, rdoc etc)

Example
-------
```javascript
var badger = require('readme-badger');

var readme = '# My Lovely Library\n' +
             '\n' +
             '## Features\n';
var imageUrl = 'https://badges.gitter.im/Join%20Chat.svg';
var linkUrl = 'https://gitter.im/gitterHQ/gitter';
var altText = 'Join the chat at https://gitter.im/gitterHQ/gitter';

var readmeWithBadge = badger.addBadge(readme, 'md', imageUrl, linkUrl, altText);

console.log(readmeWithBadge);
// # My Lovely Library
//
// [![Join the chat at https://gitter.im/gitterHQ/gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gitterHQ/gitter)
//
// ## Features
// ...

```

Format (`fileExt`) Support
--------------

Of the [GitHub README markups](https://github.com/github/markup#markups), readme-badger currently supports:
* [markdown, mdown, mkdn, md](http://daringfireball.net/projects/markdown/)
* [textile](http://www.textism.com/tools/textile/)
* [rdoc](http://rdoc.sourceforge.net/)
* [org](http://orgmode.org/)

However it will failover to inserting the `altText` at the bottom of the README for any format it doesn't support.

Building Locally
----------------

1. `git clone git@github.com:gitterHQ/readme-badger.git`
2. `cd readme-badger`
3. `npm install`
4. `npm test`
