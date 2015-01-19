PlayerList = new Meteor.Collection("player");

if (Meteor.isClient) {
  
  Template.leaderboard.player = function(){
    return PlayerList.find();
  };

  Template.newplayer.events({
    'click #create' : function(e,t){
      var name = t.find("#Pname").value;
      var score = t.find("#Pscore").value;
      PlayerList.insert({name: name, score: score });
      name = "";
      score = "";
    }
  });

}
