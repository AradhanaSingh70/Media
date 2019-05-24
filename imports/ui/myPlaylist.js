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
    'click .playAll'(e) {
        var current = 0;
        var audio = $('#audio');
        console.log(audio)
        var playlist = $('#playlist');
        console.log(playlist)
        var tracks = playlist.find('li a');
        console.log(tracks)
        var len = tracks.length;
        console.log(len)
        playlist.on('click', 'a', function (e) {
            e.preventDefault();
            link = $(this);
            current = link.parent().index();
            run(link, audio[0]);
        });
        audio[0].addEventListener('ended', function (e) {

            current++;
            if (current == len) {
                current = 0;
                link = playlist.find('a')[0];
            } else {
                link = playlist.find('a')[current];
            }
            run($(link), audio[0]);
        });
        function run(link, player) {
            player.src = link.attr('href');
            par = link.parent();
            par.addClass('active').siblings().removeClass('active');
            player.load();
            player.play();
        }
    }
})
