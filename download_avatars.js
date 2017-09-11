var GITHUB_USER = `mrdavidgrant`
var GITHUB_TOKEN = `fa8f6387375d82ae5fc25e7a1049a92eb896e19a`
var owner = process.argv[2]
var repo = process.argv[3]

console.log(`Welcome to the GitHub Avatar Downloader!`);

// Test input to ensure valid
function testInput(owner, repo){
  if(owner && repo){
    getRepoContributors(owner, repo, downloadImageByURL)
  } else {
    console.log(`Please enter an owner and repo name`)
    console.log(`USAGE:`)
    console.log(`\tnode download_avatars.js <owner> <repo>`)
  }
}

//get list of contributors
function getRepoContributors(repoOwner, repoName, callback) {
  var request = require('request')
  let options = {
    url: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': `Student Project`
    }
  }
  
  var data = request.get(options, function(err, result,body) {
    if (result && result.statusCode === 200) {
      var json = JSON.parse(body)
      console.log(`Successfully read ${json.length} items`)
      json.forEach(callback)
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