AsyncVoterApiClient = require('./client')

var client = new AsyncVoterApiClient();

var response = client.getAllStories(function(err, data, response){
  console.log(data);
  console.log(response);
});