#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const fs = require('fs');
const childProcess = require('child_process');
var version = pkg.version;
var path = require('path');

program
    .name('installpkg')
    .version(version, '    --version')
    .description('npm install package.json dependencies global')
    .parse(process.argv);

main();

function main() {
    var destinationPath = program.args.shift() || '.';
    var pkgPath = destinationPath + '/package.json';
    var pkgFullPath = path.resolve(pkgPath);
    console.log(pkgFullPath);
    var exist = fs.existsSync(pkgFullPath);
    if (!exist) return console.error('The project not exist package.json');
    var package = require(pkgFullPath);
    var keys = Object.keys(package.dependencies || {});
    if (keys.length == 0) return console.log('The project is independent');
    var command = `npm i -g ${keys.join(' ')}`
    console.log('--------install dependencies-----');
    console.log(command);
    var result = childProcess.execSync(command);
    console.log(result);
    if (result.error) return console.error(`exec error: ${result.error}`);
    console.log(`stdout:\n ${result.stdout}`);
    console.log(`stderr:\n ${result.stderr}`);
}