// Just run `npm test`

var expect = require('chai').expect,
    buildCSS = require('../index');

// Force current directory
process.chdir(__dirname);

describe('build-css', function() {
    it ('should concatenate and minify CSS', function(done) {
        buildCSS([
            'file1.css',
            'file2.css'
        ], function(e, css) {
            expect(e).to.equal(null);
            expect(css).to.equal('h1{color:#BDF17E}h2{color:#83B1FC}');
            done();
        });
    });

    it('should just concatenate CSS', function(done) {
        var opts = { minify: false };
        buildCSS([
            'file1.css',
            'file2.css'
        ], opts, function(e, css) {
            expect(e).to.equal(null);

            // Normalize line endings
            css = css.replace('\r\n', '\n');

            expect(css).to.equal(
                'h1 {\n' +
                '    color: #BDF17E;\n' +
                '}\n' +
                '\n' +
                'h2 {\n' +
                '    color: #83B1FC;\n' +
                '}\n');
            done();
        });
    });

    it('should compile and minify LESS files', function(done) {
        buildCSS([
            'test.less'
        ], function(e, css) {
            expect(e).to.equal(null);
            expect(css).to.equal('h3{color:#FC92A2}');
            done();
        });
    });

    it('should use specified LESS import paths', function(done) {
        var opts = { paths: ['imports'] };
        buildCSS([
            'import.less'
        ], opts, function(e, css) {
            expect(e).to.equal(null);
            expect(css).to.equal('.foo{display:awesome}');
            done();
        });
    });
});
