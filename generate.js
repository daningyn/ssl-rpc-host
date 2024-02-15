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
if (!vps) {
  console.log('Missing parameter. Please add param --vps dns.com with dns.com is your VPS\'s dns');
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

fs.cpSync('./docker-compose-certbot-template.yml', './docker-compose-certbot.yml');
let dockerComposeYml = fs.readFileSync('./docker-compose-certbot.yml', 'utf-8');
dockerComposeYml = _.replace(dockerComposeYml, new RegExp('{domain}', 'g'), vps);
dockerComposeYml = _.replace(dockerComposeYml, new RegExp('{email}', 'g'), email);
fs.writeFileSync('./docker-compose-certbot.yml', dockerComposeYml, 'utf-8');

