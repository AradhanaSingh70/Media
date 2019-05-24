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
Meteor.publish('artistProfile', function (artist) {
    return Artist.find();
});
Meteor.publish('all_user', function () {
    return Meteor.users.find({});
});

