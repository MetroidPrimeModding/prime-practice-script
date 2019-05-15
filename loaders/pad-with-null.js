const webpackSources = require('webpack-sources');

class PadWithNullPlugin {
  constructor(options) {
    this.len = options.len;
  }

  apply(compiler) {
    const len = this.len;
    const mod = this.mod;
    compiler.plugin("compilation", function (compilation) {

      compilation.plugin('optimize-chunk-assets', function (chunks, callback) {
        for (const chunk of chunks) {
          for (const file of chunk.files) {
            const currentSrc = this.assets[file].source();
            let toRepeat = 0;
            if (len) {
              toRepeat = len - currentSrc.length;
            } else {
              toRepeat = (len + 31) & ~31;
              if (toRepeat === 0) {
                toRepeat = 32;
              }
            }

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
