import '../imports/ui/header.js';
import '../imports/ui/home.js';
import '../imports/ui/login.js';
import '../imports/ui/signup.js';
import '../imports/ui/admin_song_list.js'
import '../imports/ui/dashboard.js';
import '../imports/ui/artistSongList.js';
import '../imports/ui/artist_profile_list.js';
import '../imports/ui/myPlaylist.js';
import '../imports/ui/viewAll.js';
Router.configure({
    layoutTemplate: 'header'
});


Router.route('/', {
    template: 'dashboard'
});
Router.route('/admin', {
    template: 'home'
});

Router.route('/admin/artist_profile', {
    name: 'artist_profile',
    template: 'artist_profile_list'
});

Router.route('/songlist/:_id', {
    name: 'arijit',
    template: 'artistSongList',
});
Router.route('/playlist', {
    name: 'myPlaylist',
    template: 'myPlaylist',
});

Router.route('/top_song', {
    name: 'top_song',
    template: 'viewAll',
});
Router.route('/recently_played_song', {
    name: 'recently_played_song',
    template: 'viewAll',
});
Router.route('/song_by_artist', {
    name: 'song_by_artist',
    template: 'viewAll',
});