/**
 * Created by flshrmb on 01.02.15.
 */
//Use YOUR Firebase URL (not the one below)
var fb = new Firebase("https://hacker-news.firebaseio.com/v0/");

var topstories = fb.child('topstories');
updateDiv = function(snapshot, id){
    elemDiv = document.getElementById(id);
    //elemDiv.innerHTML = '<a href="' + snapshot.val().url + '">' + snapshot.val().score + ' ' + snapshot.val().title + '</a>';
}
topstories.on("child_added", function(snapshot) {
    var newPost = snapshot.val();
    //console.log("Post: " + newPost);

    var postFb = fb.child('item').child(newPost);

    postFb.on('value', function(snapshot) {
        var elemDiv = document.createElement('div');
        elemDiv.id = newPost;
        document.body.appendChild(elemDiv);
        updateDiv(snapshot, newPost)
    });
    //console.log("Title: " + newPost.title);
});

topstories.on("child_changed", function(snapshot) {
    var changedPost = snapshot.val();
    var postFb = fb.child('item').child(changedPost);

    postFb.on('value', function(snapshot) {
        updateDiv(snapshot, snapshot.key());
    });
});

var App = Ember.Application.create();
App.ApplicationAdapter = DS.FirebaseAdapter.extend({
    firebase: new Firebase('https://hacker-news.firebaseio.com/v0/topstories')
});


App.Stor = DS.Model.extend({
    by: DS.attr('string'),
    id: DS.attr('string'),
    score: DS.attr('string'),
    time: DS.attr('string'),
    title: DS.attr('string'),
    type: DS.attr('string'),
    url: DS.attr('string')
});

App.StorsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.findAll();
    }
});

App.Router.map(function() {
    this.resource('stors', { path: '/' });
});