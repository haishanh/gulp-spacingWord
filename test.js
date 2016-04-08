'use strict';

var vin = require('vinyl');
var spacing = require('./');
var should = require('chai').should();

describe('gulp-spacingWord', () => {

  describe('Basic', () => {

    function testIt(input, output, done) {

      let inVin = new vin({
        contents: new Buffer(input)
      });
      let retStream = spacing();

      retStream.write(inVin);

      retStream.once('data', (file) => {

        file.isBuffer().should.be.true;

        file.contents.toString().should.equal(output);
        done();

      });
    };

    it('Spacing a word if there are Chinese chars around it', (done) => {
      let i = '中Chinese文';
      let o = '中 Chinese 文';

      testIt(i, o, done)
    });

    it('should spacing all words which have Chinese chars around theme', (done) => {
      let i = '中Chinese文\n世world界';
      let o = '中 Chinese 文\n世 world 界';

      testIt(i, o, done)
    });

    it('Spacing a word if there is a Chinese chars before or after it', (done) => {
      let i = 'Chinese文\n英English';
      let o = 'Chinese 文\n英 English';

      testIt(i, o, done)
    });

    it('NOT Spacing a word if there is a Chinese punctuation around it', (done) => {
      let i = 'Chinese，\n《hello》';
      let o = 'Chinese，\n《hello》';

      testIt(i, o, done)
    });

  });
});

