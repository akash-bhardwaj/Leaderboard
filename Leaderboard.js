PlayerList = new Meteor.Collection("player");

if (Meteor.isClient) {
  Template.leaderboard.player = function(){
    return PlayerList.find();
  };
}
