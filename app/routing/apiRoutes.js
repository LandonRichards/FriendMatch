

var guys = require("../data/friends");
//this links over the data from the rest of friends.

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(guys);
  });
//This is building the API for us to reference., 
  app.post("/api/friends", function (req, res) {

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };
//this allows us to get the best match linked over. 
    var userData = req.body;
    var userScores = userData.scores;

    var totalDifference;

    for (var i = 0; i < guys.length; i++) {
      var currentFriend = guys[i];
      totalDifference = 0;
      //thi sis goig nto run a for loop through the list of guys, and try to check for the friend difference.

      console.log(currentFriend.name);


      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        //In most coding, we need to use I, then J, and so on. The Initial value is I, and the one it is being compared to is J
        //In this case, we use operators that are built into Javascript. We dont really need to set these
        //top things to variables, but it helps out immenselvy with making the code look better.

        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      if (totalDifference <= bestMatch.friendDifference) {

        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    //its important to push the data backthrough on the other end, or it wont do anything!


    guys.push(userData);

    res.json(bestMatch);
  });
};
