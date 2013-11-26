var less = require('less'),
    CleanCSS = require('clean-css'),
    async = require('async'),
    fs = require('fs'),
    path = require('path');

function buildCSS(files, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    options = options || {};

    async.map(files,
        function process(file, callback) {
            if (path.extname(file).toLowerCase() === '.less') {
                buildLess(file, options, callback);
            } else {
                fs.readFile(file, 'utf8', callback);
            }
        },
        function complete(e, files) {
            if (e) { return callback(e); }

            var src = files.join('\n');
            if (options.minify !== false) {
                src = new CleanCSS().minify(src);
            }
            callback(null, src);
        });
}

function buildLess(file, options, callback) {
    fs.readFile(file, 'utf8', function(e, src) {
        if (e) { return callback(e); }

        var paths = [path.dirname(file)];
        if (options.paths) {
            paths = paths.concat(options.paths);
        }

        var parser = new less.Parser({
            paths: paths,
            filename: file
        });

        parser.parse(src, function(e, tree) {
            if (e) { return callback(e); }

            var css;
            try {
                css = tree.toCSS();
            } catch (e) {
                return callback(e);
            }

            callback(null, css);
        });
    });
}

module.exports = buildCSS;

