
var owner = process.argv[2]
var repo = process.argv[3]

console.log(`Welcome to the GitHub Avatar Downloader!`)

// Test input to ensure valid
function testInput(owner, repo){
  if(owner && repo && !process.argv[4]){
    getRepoContributors(owner, repo, downloadImageByURL)
  } else {
    console.log(`Please enter an owner and repo name`)
    console.log(`USAGE:`)
    console.log(`\tnode download_avatars.js <owner> <repo>`)
  }
}

//get list of contributors
function getRepoContributors(repoOwner, repoName, callback) {
  const request = require('request')
  const dotenv = require('dotenv').config('./vars.env')
  const config = {
    GITHUB_USER: process.env.GITHUB_USER,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  }

  let options = {
    url: `https://${config.GITHUB_USER}:${config.GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': `Student Project`
    }
  }
  var data = request.get(options, function(error, result, body) {
    if (result && result.statusCode === 200) {
      var json = JSON.parse(body)
      console.log(`Successfully read ${json.length} items`)
      json.forEach(callback)
    } else if (result.statusCode === 401) {
      console.log("ERROR: Unauthorized.  Please check username and password in .env file")
    }
  })
}

// download images
function downloadImageByURL (id) {
  var request = require('request')
  var fs = require('fs')
  var mkdirp = require('mkdirp')
  let url = id.avatar_url
  let user = id.login
  mkdirp('./avatars')
  request.get(url)
        .on('error', function(err) {
          console.log(error)
        })
        .pipe(fs.createWriteStream(`./avatars/${user}.png`))
}
      
module.exports = {
  download: testInput
}
testInput(owner, repo)