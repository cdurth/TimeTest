const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Start HTTP or HTTPS server?', (answer) => {
    switch(answer.toUpperCase()){
        case 'HTTP':
            let http = require('./serverHTTP')
            break;
        case 'HTTPS':
            let https = require('./serverHTTPS')
            break;
        default:
            console.log('invalid option entered, please start again')
    }
    rl.close();
});
