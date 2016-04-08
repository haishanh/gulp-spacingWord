'use strict';

const through = require('through2');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-spacingWord';

/*
 * \u4e00-\u9fff is CJK unified ideographs block
 * see http://kourge.net/projects/regexp-unicode-block
 */
const pat = /([\u4e00-\u9fff])?([a-zA-Z-]+)([\u4e00-\u9fff])?/g;

/**
 * @data {String}
 */
function spacing(data) {
  function replacer(match, p1, p2, p3, off, str) {
    let ret = '';
    if (p1) { ret += p1 + ' '; }
    ret += p2;
    if (p3) { ret += ' ' + p3; }

    return ret;
  }
  return data.replace(pat, replacer);
}

function gulpSpacingWord() {

  function transform(file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streams not supported'));
    }

    if (file.isBuffer()) {

      let data = file.contents.toString();
      let ret = spacing(data);

      file.contents = new Buffer(ret);
    }

    this.push(file);

    cb();
  };

  return through.obj(transform);
};

module.exports = gulpSpacingWord;