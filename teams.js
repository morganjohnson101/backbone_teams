var TeamModel = Backbone.Model.extend({
    defaults: {
        name: null,
        nickname: null,
        founded: null
    }
});

var team1 = new TeamModel({
    name: "Leicester City",
    nickname: "The Foxes",
    founded: 1884
});

var team2 = new TeamModel({
    name: "Arsenal",
    nickname: "The Gunners",
    founded: 1886
});

var team3 = new TeamModel({
    name: "Manchester United",
    nickname: "The Red Devils",
    founded: 1878
});

var team4 = new TeamModel({
    name: "Everton",
    nickname: "The Toffees",
    founded: 1878
});

var team5 = new TeamModel({
    name: "Tottenham Hotspur",
    nickname: "Spurs",
    founded: 1882
});

var TeamCollection = Backbone.Collection.extend({
    model: TeamModel
});


var TeamItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'team',
    template: _.template($('#team-name-template').html()),
    initialize: function () {
        console.log('team item view initialized');
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        console.log(this);
        return this;
    },
    events: {
        'click': 'showTeamInfo'
    },
    showTeamInfo: function () {
        var teamHistory = new TeamHistoryView({ model: this.model });
        teamHistory.render();
    }
});

var TeamCollectionView = Backbone.View.extend({
    el: '#teams',
    initialize: function () {
        this.listenTo(this.collection, 'add', this.render);
    },
    render: function () {
        this.$el.empty();
        this.collection.each(function (team) {
            var teamItem = new TeamItemView({ model: team });
            this.$el.append(teamItem.render().$el);
        }, this);

        return this;
    }
});

var TeamHistoryView = Backbone.View.extend({
    el: '#output',
    template: _.template($('#team-history-template').html()),
    initialize: function () {
        this.listenTo(this.model, 'add', this.render);
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
    }
});

var teams = new TeamCollection();
var allTeamsView = new TeamCollectionView({ collection: teams });
teams.add([team1, team2, team3, team4, team5]);