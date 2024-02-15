const _ = require('lodash');
const argv = require('yargs')
              .string('vps')
              .string('email')
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

const email = argv.email;
if (!email || email == '') {
  console.log('Missing parameter. Please add param --email abc@gmail.com with abc@gmail.com is your email');
  process.exit(0);
}

fs.cpSync('./nginx/nginx-template.conf', './nginx/nginx.conf');
let nginxConf = fs.readFileSync('./nginx/nginx.conf', 'utf-8');
nginxConf = _.replace(nginxConf, new RegExp('{vps}', 'g'), vps);
fs.writeFileSync('./nginx/nginx.conf', nginxConf, 'utf-8');

fs.cpSync('./docker-compose-template.yml', './docker-compose.yml');
let dockerComposeYml = fs.readFileSync('./docker-compose.yml', 'utf-8');
dockerComposeYml = _.replace(dockerComposeYml, new RegExp('{domain}', 'g'), vps);
dockerComposeYml = _.replace(dockerComposeYml, new RegExp('{email}', 'g'), email);
fs.writeFileSync('./docker-compose.yml', dockerComposeYml, 'utf-8');

