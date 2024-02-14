const _ = require('lodash');
const argv = require('yargs')
              .string('vps')
              .parserConfiguration({
                'parse-numbers': false
              })
              .argv;
const fs = require('fs');

const vps = argv.vps;
if (!vps || _.split(vps, '.').length !== 4) {
  console.log('Missing parameter. Please add param --vps 1.1.1.1 with 1.1.1.1 is your VPS\'s IP');
  process.exit(0);
}

fs.cpSync('./nginx/nginx-template.conf', './nginx/nginx.conf');
let nginxConf = fs.readFileSync('./nginx/nginx.conf', 'utf-8');
nginxConf = _.replace(nginxConf, new RegExp('{vps}', 'g'), vps);
fs.writeFileSync('./nginx/nginx.conf', nginxConf, 'utf-8');
