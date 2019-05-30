import { Template } from 'meteor/templating';
import { Song } from '../api/collection.js';
import './myPlaylist.html';
var current, audio, playlist, tracks, len;
Template.myPlaylist.onCreated(function () {
    this.subscribe('mySong');
    this.currentAudio = new ReactiveVar(false);
})
Template.myPlaylist.rendered = function (e, template) {
}
Template.myPlaylist.helpers({
    playlist: function () {
        return Song.find({});
    },
    currentAudio: function () {
        return Template.instance().currentAudio.get();
    },
})
Template.myPlaylist.events({
    /* 'click .playPause'(e, template) {
        var audio = document.getElementById(this._id)
        if (audio.paused) {
            audio.play();
        }
        else {

            audio.pause();
        } */
    /* audio.addEventListener('ended', function () {
        // audio.src = "new url";
        audio.pause();
        audio.load();
        audio.play();
    }); */

    /*  'click .playAll'(e) {
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
             console.log(link)
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
     },
  */
    'click .playAll'() {
        current = 0;
        audio = $('#audio');
        audio[0].play();
        playlist = $('#playlist');
        var next = $('#next');
        tracks = playlist.find('tr a');
        len = tracks.length;
        link = playlist.find('a')[0];
        run($(link), audio[0]);

        playlist.on('click', 'a', function (e) {
            e.preventDefault();
            link = $(this);

            current = link.closest("tr").index();
            run(link, audio[0]);
            // playNext(link, audio[0]);
        });
        /*  next.on('click', function (e, t) {
             e.preventDefault();
             playNext($(link), audio[0]);
         }); */
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
        function run(e, template) {
            template.src = e.attr('href');
            par = e.closest("tr .songlist");
            $("tr .songlist.active").removeClass('active')
            par.addClass('active');
            template.load();
            template.play();
        }
        /* function playNext(e, template) {
            var next = $("tr.songlist.active").attr('href');

            template.src = e.attr('href');
            console.log(next)
        } */

    },
    'click .playPause'(e, template) {

    }

})
