var fs = require('fs')
var GITHUB_USER = 'mrdavidgrant';
var GITHUB_TOKEN = "fa8f6387375d82ae5fc25e7a1049a92eb896e19a";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {
  var request = require('request')
  let options = {
    url: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'Student Project'
    }
  }
  
  var data = request.get(options, function(err, result, body) {
    console.log("Errors:", err);
    if (result && result.statusCode === 200) {
      var json = JSON.parse(body)
      console.log("read", json.length, "items")
      json.forEach(callback)
    }
  })
}
function downloadImageByURL (id) {
  var request = require('request')
  let url = id.avatar_url
  let user = id.login
  console.log('Getting avatar for: ', user, "from URL:", url)
  request.get(url)
        .on('error', function(err) {
          console.log(error)
        })
        .pipe(fs.createWriteStream(`./avatars/${user}.png`))
}

getRepoContributors("jquery", "jquery", downloadImageByURL)
// console.log (contributors)