const { spawn } = require('child_process');

async function runTCM(options) {
  return new Promise(function(reject, resolve) {
    let messages = [];
    const tcm = spawn('tcm', ['./src', '-c']);

    console.log('\x1b[36m%s\x1b[0m', 'TCMPlugin:');

    tcm.stdout.on('data', function(data) {
      messages.push(data.toString());
    });

    tcm.stderr.on('data', function(data) {
      reject(data.toString());
    });

    tcm.on('close', function(code) {
      console.log('%s\x1b[32m%s\x1b[0m%s', 'Wrote ', messages.length, ' *.css.d.ts files');
      console.log('---\n');

      resolve(code);
    });
  });
}

class TCMPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.beforeRun.tapPromise('TCMPlugin', async (_) => {
      return await runTCM(this.options);
    });
  }
}

module.exports = TCMPlugin;