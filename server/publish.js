import { Meteor } from 'meteor/meteor';
import { Images, Artist } from '../imports/api/collection.js';
import { Audio } from '../imports/api/collection.js';
import { Song } from '../imports/api/collection.js';
Images.allowClient();
Audio.allowClient();
Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
});
Meteor.publish('files.audio.all', function () {
    return Audio.find().cursor;
});
Meteor.publish('song_list', function () {
    return Song.find({});
});
Meteor.publish('artistProfilelist', function (artist) {
    return Artist.find({});
});
Meteor.publish('artistProfile', function (artist) {
    return Artist.find({}, {
        fields: {
            artistName: 1,
            profilepicUrl: 1,
            desc: 1,
            song: 1,
        }
    });
});
Meteor.publish('all_user', function () {
    return Meteor.users.find({ _id: this.userId }, { fields: { '_id': 1, 'emails': 1, 'profile': 1, 'roles': 1, 'recently_played': 1, 'songPlayList': 1 } });
});
Meteor.publish('mySong', function () {
    let user = Meteor.user();
    var t = []
    if (user && user.songPlayList) {
        return Song.find({ '_id': { $in: user.songPlayList } }, {
            fields: {
                artist_name: 1,
                song_name: 1,
                imageUrl: 1,
                audioUrl: 1
            }
        });

    }
});
Meteor.publish('allSong', function () {
    return Song.find({}, {
        fields: {
            artist_name: 1,
            song_name: 1,
            imageUrl: 1,
            audioUrl: 1
        }
    })
});

