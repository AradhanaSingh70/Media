import { Template } from 'meteor/templating';
import { Song } from '../api/collection.js';
import './myPlaylist.html';
Template.myPlaylist.onCreated(function () {
    this.subscribe('song_list');
    this.subscribe('all_user');
})
Template.myPlaylist.helpers({
    playlist: function () {
        let user = Meteor.user();
        if (user && user.songPlayList) {
            return Song.find({ '_id': { $in: user.songPlayList } });
        }
    },
})
Template.myPlaylist.events({
    'click .playPause'(e, template) {
        var audio = document.getElementById(this._id)
        if (audio.paused) {
            audio.play();
        }
        else {

            audio.pause();
        }
        /* audio.addEventListener('ended', function () {
            // audio.src = "new url";
            audio.pause();
            audio.load();
            audio.play();
        }); */
    },
})
