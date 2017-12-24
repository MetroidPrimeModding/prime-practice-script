const webpackSources = require('webpack-sources');

class PadWithNullPlugin {
  constructor(options) {
    this.len = options.len;
  }

  apply(compiler) {
    const len = this.len;
    compiler.plugin("compilation", function (compilation) {

      compilation.plugin('optimize-chunk-assets', function (chunks, callback) {
        for (const chunk of chunks) {
          for (const file of chunk.files) {
            const currentSrc = this.assets[file].source();
            const toRepeat = len - currentSrc.length;
            const paddedSrc = currentSrc + '\0'.repeat(toRepeat);
            const newSrc = new webpackSources.RawSource(paddedSrc);
            this.assets[file] = newSrc;
          }
        }
        callback();
      })
    });
  }
}

module.exports = PadWithNullPlugin;
