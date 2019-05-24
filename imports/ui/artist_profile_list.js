import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Artist, Images } from '../api/collection.js';
import './artist_profile_list.html';
var profilepicId, profilepicUrl, profilepicName, currentArtist
Template.artist_profile_list.onCreated(function () {
    this.currentArtistEdit = new ReactiveVar(false)
    this.currentImageUrl = new ReactiveVar(false);
    this.currentImageName = new ReactiveVar(false);
    this.currentUpload = new ReactiveVar(false);
    this.subscribe('artistProfile');
})

Template.artist_profile_list.rendered = function (e, template) {

}
Template.artist_profile_list.helpers({
    artist_data: function () {
        return Artist.find({});
    },
    artistData: function () {

        return Template.instance().currentArtistEdit.get()
    },
    checkArtist: function (art) {
        if (Template.instance().currentArtistEdit.get() && Template.instance().currentArtistEdit.get().artistName == art)
            return true;
    },
    currentUpload: function () {
        return Template.instance().currentUpload.get();
    },
    getImage: function () {

        return Template.instance().currentImageUrl.get();
    },
    getImageName: function () {
        return Template.instance().currentImageName.get();
    },
})
Template.artist_profile_list.events({
    'click .delete'(e) {
        e.preventDefault();
        var songId = this._id;
        var confirm = window.confirm("Delete this Artist?");
        if (confirm) {
            Meteor.call('artist.remove', songId);
        }
    },
    'click .edit'(e, template) {
        e.stopImmediatePropagation();
        currentArtist = this._id
        profilepicId = this.profilepicId;
        profilepicUrl = this.profilepicUrl;
        profilepicName = this.profilepicName;
        template.currentArtistEdit.set(this);
        var editModal = $("#myModal")
        editModal.find('.modal-title').text('Edit Song');
        editModal.modal('show');
    },
    'click .createArtistProfile'(e, template) {
        template.currentArtistEdit.set(false);
        var addModal = $("#myModal")
        addModal.find('.modal-title').text('Create Artist Profile');
        addModal.modal('show');
    },
    'click .closes': function (e, template) {
        template.currentImageName.set(false);
        template.currentImageUrl.set(false);
        if (template.currentArtistEdit.get() == false) {
            $('#myModal').on('hidden.bs.modal', function () {
                $(this).find('form').trigger('reset');
            })
        }
    },

    'submit .artist-profile'(event, template) {
        event.preventDefault();
        const target = event.target;
        const artistName = target.artistName.value;
        const desc = target.desc.value;
        if (template.currentArtistEdit.get() == false) {
            Meteor.call('artist.insert', artistName, desc, profilepicId, profilepicUrl, profilepicName);
            alert("sucessfully submited")
            //template.currentArtistEdit.set(false);
            template.currentImageName.set(false);
            template.currentImageUrl.set(false);
            target.artistName.value = '';
            target.desc.value = '';
            target.profilePic.value = '';
        }
        else {
            Meteor.call('artist.update', artistName, desc, profilepicId, profilepicUrl, profilepicName, currentArtist)
        }
        $('#myModal').modal('hide');
        return false;
    },
    'change #profilePic'(e, template) {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            var file = e.currentTarget.files[0];
            const upload = Images.insert({
                file: file,
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);
            upload.on('start', function () {
                template.currentUpload.set(this);
            });
            upload.on('end', function (error, fileImage) {
                if (error) {
                    alert('Error during upload: ' + error);
                } else {
                    alert('File "' + fileImage.name + '" successfully uploaded');
                }
                template.currentUpload.set(false);
                profilepicId = fileImage._id;
                profilepicUrl = Images.link(fileImage, 'thumbnail')
                template.currentImageUrl.set(profilepicUrl);
                profilepicName = fileImage.name;
                template.currentImageName.set(profilepicName);
            });
            upload.start();
        }
    },
})
