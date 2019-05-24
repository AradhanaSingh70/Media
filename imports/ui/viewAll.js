import { Template } from 'meteor/templating';
import { Song, Artist } from '../api/collection.js';
import './viewAll.html';
Template.viewAll.onCreated(function () {
  this.subscribe('artistProfile')
  this.subscribe('song_list');
  this.subscribe('all_user');
})
Template.viewAll.helpers({
  top_Song: function () {
    if (Router.current().route.getName() == "top_song") {
      return Song.find({});
    }
  },
  recently_played_song: function () {
    if (Router.current().route.getName() == "recently_played_song") {
      let user = Meteor.user();
      if (user && user.recently_played) {
        return Song.find({ '_id': { $in: user.recently_played } });
      }
    }
  },
  artistImage: function () {
    if (Router.current().route.getName() == "song_by_artist") {
      return Artist.find();
    }
  },
})
