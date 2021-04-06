#!/usr/bin/env node

const commander = require('commander')

commander
  .version('1.0.0')
  .description('installing packages and showing info tool')

commander
  .command('printInfo')
  .alias('p')
  .description('show name, version and dependences of your project')
  .action(() => {
    let fs = require('fs');
    let fileName = process.cwd() + '/package.json';
    let data = JSON.parse(fs.readFileSync(fileName));

    let projectName = data.name;
    let projectVersion = data.version;
    let projectDps = data.dependencies;

    console.log(projectName, ' v', projectVersion);
    console.log('The project has dependences:');
    let dps = Object.keys(projectDps);
    for(let d of dps) {
      console.log('    ', d, '@', projectDps[d].slice(1))
    } 
  })

commander
  .command('install <packageName>')
  .alias('i')
  .description('install package and add dependency to your project')
  .action((packageName) => {
    const { exec } = require('child_process');
    exec('npm install ' + packageName, (error, stdout) => {
      if(error) {
        console.log(error)
      }
      if (stdout) {
        console.log(stdout)
      }
    })  

  })

commander.parse(process.argv)

