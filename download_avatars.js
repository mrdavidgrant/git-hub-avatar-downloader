var request = require('request')
let output = ""
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  let options = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`
  request.get(options, cb)
  cb = function(response) {
    response.on('data', function(chunk) {
      result += chunk
    })
    response.on('end', function(result) {
      console.log(result)
    })
  }
  
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});