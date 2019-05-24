import { Meteor } from 'meteor/meteor';
import { Song, Artist } from '../imports/api/collection.js';
import { Images } from '../imports/api/collection.js';
import { Roles } from 'meteor/alanning:roles'
Meteor.methods({
    'song.insert': function (song_name, movie_name, artist_name, language, category, subcategory, audio, audioSong, audioName, image, imageUrl, imageName) {
        var currentUser = Meteor.userId();
        let songid = Song.insert({
            song_name, movie_name, language, category, subcategory,
            artist_name: artist_name,
            song_audio: audio,
            audioUrl: audioSong,
            audioName: audioName,
            song_image: image,
            imageUrl: imageUrl,
            imageName: imageName,
            createdAt: new Date(),
            owner: currentUser,
            username: Meteor.user().emails[0].address,
        })
        let songs = {
            'id': songid
        }
        Artist.update({ 'artistName': { $in: artist_name } }, { $push: { 'song': songs } }, { multi: true })
    },
    'song.update': function (song_name, movie_name, artist_name, language, category, subcategory, song_audio, audioUrl, audioName, song_image, imageUrl, imageName, currentList) {
        var currentUser = Meteor.userId();
        var t = []
        if (!currentUser) {
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }
        Artist.find({}).forEach(function (doc) {
            let songArray = doc.song;
            if (songArray === undefined) {
                return false;
            }
            for (var i = 0; i < songArray.length; ++i) {
                var songId = songArray[i].id;
                if (songId === currentList) {
                    let singername = doc.artistName;
                    Artist.update({ 'artistName': singername }, { $pull: { song: { id: currentList } } });
                }
            }
        })
        /*  Artist.find({}).forEach(function (doc) {
 
             let song = doc.song;
             console.log(song)
          return   Artist.update({}, { $unset: { 'song': song } }, { multi: true }); */
        Song.update({ _id: currentList }, { $set: { song_name, movie_name, artist_name, language, category, subcategory, song_audio, audioUrl, audioName, song_image, imageUrl, imageName } });
        let songs = {
            'id': currentList
        }
        Artist.update({ 'artistName': { $in: artist_name } }, { $push: { 'song': songs } }, { multi: true })
    },
    'song.remove'(songId) {
        var currentUser = Meteor.userId();
        if (!currentUser) {
            throw new Meteor.Error('not-authorized user');
        }
        Song.remove({ _id: songId });
    },
    'artist.insert': function (artistName, desc, profilepicId, profilepicUrl, profilepicName) {
        var currentUser = Meteor.userId();
        if (!currentUser) {
            throw new Meteor.Error('not-authorized user');
        }
        Artist.insert({
            artistName, desc, profilepicId, profilepicUrl, profilepicName,
            createdAt: new Date(), // current time
            owner: currentUser,
            username: Meteor.user().emails[0].address,
        })
    },
    'artist.update': function (artistName, desc, profilepicId, profilepicUrl, profilepicName, currentArtist) {
        var currentUser = Meteor.userId();
        if (!currentUser) {
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }
        Artist.update({ _id: currentArtist }, { $set: { artistName, desc, profilepicId, profilepicUrl, profilepicName } });
    },
    'artist.remove'(songId) {
        var currentUser = Meteor.userId();
        if (!currentUser) {
            throw new Meteor.Error('not-authorized user');
        }
        Artist.remove({ _id: songId });
    },
    'my-song.update': function (currentList, currentUser) {
        var currentUser = Meteor.userId();
        if (!currentUser) {
            throw new Meteor.Error('not-authorized user');
        }
        Meteor.users.update({ _id: currentUser }, { $push: { songPlayList: currentList } });
    },
    'recently-played.update': function (currentList, currentUser) {
        var currentUser = Meteor.userId();
        if (!currentUser) {
            throw new Meteor.Error('not-authorized user');
        }
        Meteor.users.update({ _id: currentUser }, { $push: { recently_played: currentList } });
    },
    /* sign up  */
    'userlist.insert': function (email, password, first_name, last_name, full_name) {
        var users = [
            { roles: [] }
        ];
        _.each(users, function (user) {
            var id;
            id = Accounts.createUser({
                email: email,
                password: password,
                profile: {
                    first_name: first_name,
                    last_name: last_name,
                    full_name: full_name,
                },
                createdAt: new Date(),
            });
            Roles.addUsersToRoles(id, 'normal-user')
        });
    }
})