# build-css

[![NPM](https://nodei.co/npm/build-css.png?compact=true)](https://nodei.co/npm/build-css/)

[![Build Status](https://drone.io/github.com/conradz/build-css/status.png)](https://drone.io/github.com/conradz/build-css/latest)
[![Dependency Status](https://gemnasium.com/conradz/build-css.png)](https://gemnasium.com/conradz/build-css)

Helper for building/minifying LESS and CSS files. It makes it super easy to
compile LESS, concatenate all the CSS, and minify the output.

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

## Reference

### `buildCSS(files, [opts], callback)`

Builds an array of CSS/LESS files, concatenating and minifying them.

`files` is an array of file paths to read. The order of the files is preserved
when concatenating. If a file in `files` is a `.less` file, it will be compiled
and the CSS output will be used.

`opts` is an optional object containing the configuration settings. The
`minify` option will disable minification when it is false. The `paths` option
is an array of paths to look for the files imported by LESS `@import`s. The
source file directory is always added to this when compiling.

`callback` is a function that will be called with the result. It uses the
normal Node callback signature of `(error, result)`.

It uses [clean-css](https://github.com/GoalSmashers/clean-css) when minifying
the CSS.
