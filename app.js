#!/usr/bin/env node

const commander = require('commander')

//dps-tool version
let fs = require('fs');
let version = JSON.parse(fs.readFileSync(__dirname + '/package.json')).version;

commander
  .version(version)
  .description('installing packages and showing info tool')

let cutVersion = (str) => {
  let result = str;
  if (str.indexOf('^')!==-1) result = str.slice(1);
  if (str.indexOf('~')!==-1) result = str.slice(1);
  return result
}

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
        console.log('    ', d, '@', cutVersion(projectDps[d]));
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

/* TODO: JSFIX could not patch the breaking change:
TypeScript declaration for .addHelpText() callback no longer allows result of undefined, now just string 
Suggested fix: Only breaking if the 2nd argument 'text' of addHelpText() might return undefined: The type of addHelpText() has been changed. To accommodate this return an appropriate string instead. */
commander
  .addHelpText('before', `dps-tool@` + version)

commander.parse(process.argv)

