import { Template } from 'meteor/templating';
import { Song, Artist } from '../api/collection.js';
import { ReactiveVar } from 'meteor/reactive-var';
import './artistSongList.html';
Template.artistSongList.onCreated(function () {
    this.subscribe('song_list');
    this.subscribe('artistProfile')
    this.currentAudio = new ReactiveVar(false);
})
Template.artistSongList.helpers({
    artist_songList: function () {
        var currentArtistProfile = Router.current().params._id;
        let songListId = [];
        var artistlist = Artist.findOne({ _id: currentArtistProfile })
        if (artistlist && artistlist.song) {
            artistlist.song.map((s) => {
                songListId.push(s.id)
                songListId.push(s.id)
            });
        }
        return Song.find({ '_id': { $in: songListId } });
    },
    artistProfile: function () {
        var currentArtistProfile = Router.current().params._id;
        return Artist.findOne({ _id: currentArtistProfile });
    }, currentAudio: function () {
        return Template.instance().currentAudio.get();
    },
    song_data: function () {
        var currentSong = Router.current().params._id;
        return Song.findOne({ _id: currentSong });
    },
});
Template.artistSongList.events({
    'click #playPause'(e, template) {
        template.currentAudio.set(this.audioUrl);
        var audio = document.getElementById(this._id)
        if (audio.paused) {
            audio.play();
        }
        else {
            audio.pause();
        }
    },
    'click .my-music'(e) {
        e.stopImmediatePropagation();
        var currentList = this._id;
        var currentUser = Meteor.userId();
        Meteor.call('my-song.update', currentList, currentUser);
    },
    'click .recentlyPlayed'(e) {
        e.stopImmediatePropagation();
        var currentList = this._id;
        var currentUser = Meteor.userId();
        Meteor.call('recently-played.update', currentList, currentUser);
    }
})