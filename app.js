#!/usr/bin/env node

const commander = require('commander')

//dps-tool version
let fs = require('fs');
let version = JSON.parse(fs.readFileSync(__dirname + '/package.json')).version;

commander
  .version(version)
  .description('installing packages and showing info tool')

commander
  .command('printInfo')
  .alias('p')
  .description('show name, version and dependences of your project')
  .action(() => {
    let fs = require('fs');
    //get info from pacjage.json at current directory
    try {
      let fileName = process.cwd() + '/package.json';
      let data = JSON.parse(fs.readFileSync(fileName));

      let projectName = data.name;
      let projectVersion = data.version;
      let projectDps = data.dependencies;

      console.log(projectName, ' v', projectVersion);
      console.log('The project has dependences:');
      let dps = Object.keys(projectDps);
      for(let d of dps) {
        //Delete symbols from version
        let version = projectDps[d];
        if (version.indexOf('^')!==-1) version = version.slice(1);
        if (version.indexOf('~')!==-1) version = version.slice(1);
        console.log('    ', d, '@', version);
      } 
    }
    catch (e) {
      console.log('File package.json not found')
    }
  })

commander
  .command('install <packageName>')
  .alias('i')
  .description('install package and add dependency to your project')
  .action((packageName) => {
    const { exec } = require('child_process');
    exec('npm install ' + packageName, (error, stdout, stderror) => {
      if(error) {
        console.log(error)
      }
      if (stdout) {
        console.log(stdout)
      }
      if (stderror) {
        console.log(stderror)
      }
    })  

  })

commander
  .addHelpText('before', `dps-tool@` + version)

commander.parse(process.argv)

