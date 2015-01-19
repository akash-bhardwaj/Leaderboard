PlayerList = new Meteor.Collection("player");

if (Meteor.isClient) {
  
  Template.leaderboard.player = function(){
    return PlayerList.find({}, {sort: {score: -1, name: 1}});
  };

  Template.leaderboard.selected = function(){
    var selectedPlayer = Session.get('selectedPlayer');
    var playerId = this._id;
    if(selectedPlayer == playerId){
    return 'selected';
    }
  };

  Template.leaderboard.events({
    'click li.player': function(e, t){
      Session.set('selectedPlayer', this._id);
    },
    'click #addScore' : function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayerList.update(
        {_id: selectedPlayer},
        {$inc: {score: 5}}
      );
    },
    'click #takeScore' : function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayerList.update(
        {_id: selectedPlayer},
        {$inc: {score: -5}}
      );
    },
    'click span.delete' : function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayerList.remove(selectedPlayer);
    }
  });

  Template.newplayer.events({
    'click #create' : function(e,t){
      var name = t.find("#Pname");
      var score = t.find("#Pscore");
      PlayerList.insert({name: name.value, score: parseInt(score.value) });
      name.value = "";
      score.value = "";
    }
  });

}
