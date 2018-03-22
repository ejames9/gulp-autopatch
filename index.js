/*
gulp-autopatch,  gulp-plugin
v0.1.0

Author: Eric James Foster
License: MIT
*/

const fs = require('fs'),
     log = require('elementsJS').log,
    info = require('elementsJS').info,
     err = require('elementsJS').err


// The plugin's name...
const PLUGIN_NAME = 'gulp-npmAutopatch'
// Get node's child_process spawner....
const exec = require('child_process').exec


//The PLugin
function npmAutopatch(packageRoot) {
  var rePublish,
  splitVersion,
  unSplitVersion,
  patchedArray

// Get patch limit from package.json
  const packJSONString = fs.readFileSync(packageRoot + 'package.json')

  const packageJSON = JSON.parse(packJSONString),
         patchLimit = packageJSON.patchLimit || 0

// Store shell command args...
  const minorArgs = [
    'version',
    'minor'
  ]

  const patchArgs = [
    'version',
    'patch'
  ]

// store root...
  const options = {
    cwd: packageRoot
  }

// Get current version...
  const version = packageJSON.version

// a function for splitting the version number into an array of 3 numbers...
  splitVersion =(version)=>
    version.split('.')

// a boolean property used to determine if update is patch or minor...
  const patch = splitVersion(version)[2] < patchLimit || patchLimit === 0

// a function for splitting the version number into an array of 3 numbers...
  unSplitVersion =(versionArr)=>
    versionArr.join('.')

// Given a string version number array, returns a patch incremented string...
  patchedArray =(versionArr)=>
    versionArr.map((num, ix)=>
      (ix === 2)?
        num++
      :
        num
    )

  rePublish =()=>
// Spawning another child process to re-publish the package, now that the version
// has been incremented...
    exec(
     'npm publish',
      options,
      (error, stdout, stderr)=> {
        if (error) {
          err(`There was an error republishing ${packageJSON.name}`)
          log(`${error}`, 'red')
        } else {
          info(`${packageJSON.name} was republished. \n\n Update Complete.`)
          log(stdout, 'green')
        }
      }
    )

// Narrative user updating...
  info(`\nPackage '${packageJSON.name}' has a current version of ${packageJSON.version}.\n`)
  info(
   `Bumping to ${
      unSplitVersion(
        patchedArray(
          splitVersion(
            packageJSON
                  .version
          )
        )
      )
    }`
  )

/* Begin process of incrementing the version number and replublishing the package.
** Use node's exec function to create a child process and execute unix commands.
** We are diving a bit deeply into callback hell here, may want to re-write this
** in the future with promises or async/await. It just doesn't matter at the
** moment...
**/
  exec(
// The patch bumping command...
   `npm ${(patch ? patchArgs : minorArgs).join(' ')}`,
    options,
    (error, stdout, stderr)=> {
      if (error) {
// Log out error message...
        err(
          `There was an error bumping the version number of ${packageJSON.name}.`
        )
// Log out error...
        log(`Error: ${error}`, 'red')
// Try cleaning the directory...
        info(
          'Attempting to clean the directory.'
        )
        exec('git add .',
          options,
          (error, stdout, stderr)=> {
// If there is an error, log it out...
            if (error) {
               log(`${error}`, 'red')
// If no error, log stdout, and run next command...
            } else {
              log(stdout)
              exec(
               'git commit -m "Autocleaning directory."',
                options,
                (error, stdout, stderr)=> {
// If there is an error, log it out...
                  if (error) {
                    log(`${error}`, 'red')
// If no error, log stdout, and run next command...
                  } else {
                    log(stdout)
// Run the patch bumping command one more time...
                    exec(
                     `npm ${(patch ? patchArgs : minorArgs).join(' ')}`,
                      options,
                      (error, stdout, stderr)=> {
                        if (error) {
// Log out error message...
                          err(
                            `There was an error bumping the version number of ${packageJSON.name}.`
                          )
                        } else {
// Republish................................
                          rePublish()
                        }
                      }
                    )
                  }
                }
              )
            }
          }
        )
      } else {
// Narrative user update...
        if (patch) {
          info(`\n...............\n${packageJSON.name}'s version "patch" parameter was incremented by one.\n ...............`)
        } else {
          info(`\n...............\n${packageJSON.name}'s version "minor" parameter was incremented by one.\n ...............`)
        }
// Republish...
        rePublish()
      }
    }
  )
}




module.exports = npmAutopatch



// vfs.src('./lib/test/IO/TestInput.js', {buffer: false})
// .pipe(gulpAutoPatch())
// .pipe(vfs.dest('./lib/test/'));
