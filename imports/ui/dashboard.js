import { Template } from 'meteor/templating';
import { Song, Artist } from '../api/collection.js';

import './dashboard.html';

Template.dashboard.onCreated(function () {
    this.subscribe('artistProfile')
    this.subscribe('song_list');
    this.subscribe('all_user');
})
Template.dashboard.helpers({
    artistImage: function () {
        return Artist.find({}, { limit: 6 });
    },
    top_Song: function () {
        return Song.find({}, { limit: 6 });
    },
    recently_played_song: function () {
        let user = Meteor.user();
        if (user && user.recently_played) {
            let lenght = Song.find({ '_id': { $in: user.recently_played } }).count();
            if (lenght <= 0) {
                return false
            }
            return Song.find({ '_id': { $in: user.recently_played } }, { limit: 6 });
        }
    },
})
Template.dashboard.events({
})