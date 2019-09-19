var friends = require("../data/friends");
var path = require('path');

module.exports = function(app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);
    
    // Receive user details (name, photo, scores)
    var user = req.body.scores;

    var bestFriendIndex=0;
    var totalScores=[];
    
    // parseInt for scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // default friend match is the first friend but result will be whoever has the minimum difference in scores

    // var minimumDifference = 40;

    // in this for-loop, start off with a zero difference and compare the user and the ith friend scores, one set at a time
    //  whatever the difference is, add to the total difference
    for(var i = 0; i < friends.length-1; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += Math.abs(parseInt(user[j]-parseInt(friends[i].scores[j])));
      }
      totalScores.push(totalDifference);
      console.log(totalDifference);

      // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
      for(var i=0;i<totalScores.length; i++){
        if(totalScores[i] <= totalScores[bestFriendIndex]) {
          bestFriendIndex = i;
          console.log(bestFriendIndex);
        }
      }
    };

    // after finding match, add user to friend array
    friends.push(req.body);

    // send back to browser the best friend match
    res.json(friends[bestFriendIndex]);
  });
};