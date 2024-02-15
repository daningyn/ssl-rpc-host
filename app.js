const fs = require('fs');
const cp = require('child_process');

if (!fs.existsSync('./docker-compose.yml') || !fs.existsSync('./nginx/nginx.conf')) {
  console.log('Please run `npm run generate -- --vps {your vps ip} --email {your email}`');
  process.exit(0);
}

cp.exec('docker-compose up -d --build', (err, stdout, stderr) => {
  if (err) {
    console.log(err.message);
    process.exit(0);
    return
  }
  console.log('Running');
});

