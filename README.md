build-css
=========

Utility for building/minifying LESS and CSS files

This utility will build all `.less` files, concatenate all the files together,
and the minify the source with
[clean-css](https://github.com/GoalSmashers/clean-css).

## Example

```js
var buildCSS = require('build-css');

buildCSS([
    'file1.css',
    'file2.css',
    'less1.less'
], function(e, css) {
    // Do awesome stuff with the css
});

// Now with more knobs and switches!!!
var opts = {
    // Minify the output with clean-css
    // Default: true
    minify: true,

    // Directories to look for LESS @imports, source file directory is
    // included by default.
    paths: ['.']
};

buildCSS([
    'file.css',
    'file.less'
], opts, function(e, css) {
    if (e) {
        throw e;
    }

    fs.writeFile('file.min.css', css, function(e) {
        // Continue building
    });
});
```

