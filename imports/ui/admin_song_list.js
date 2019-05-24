import { Template } from 'meteor/templating';
import { Song } from '../api/collection.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Images } from '../api/collection.js';
import { Audio } from '../api/collection.js';
import './admin_song_list.html';
var audio, audioUrl, audioName, image, imageUrl, imageName, artist_name, currentList, expanded = false;
Template.admin_song_list.onCreated(function () {
    this.currentEdit = new ReactiveVar(false);
    this.currentAudioEdit = new ReactiveVar(false)
    this.currentAudio = new ReactiveVar(false);
    this.currentUpload = new ReactiveVar(false);
    this.currentAudioUpload = new ReactiveVar(false);
    this.currentImageUrl = new ReactiveVar(false);
    this.currentImageName = new ReactiveVar(false);
    this.currentAudioName = new ReactiveVar(false);
    this.subscribe('song_list');
    this.subscribe('files.images.all');

})
Template.admin_song_list.rendered = function (e, template) {
}
Template.admin_song_list.helpers({
    currentAudio: function () {
        return Template.instance().currentAudio.get();
    },
    currentAudio_id: function () {
        return Template.instance().currentAudio_id.get();
    },
    song_data: function () {
        return Song.find({});
    },
    currentUpload: function () {
        return Template.instance().currentUpload.get();
    },
    currentAudioUpload: function () {
        return Template.instance().currentAudioUpload.get();
    },
    getImage: function () {
        return Template.instance().currentImageUrl.get();
    },
    getImageName: function () {
        return Template.instance().currentImageName.get();
    },
    getAudioName: function () {
        return Template.instance().currentAudioName.get();
    },
    data: function () {
        return Template.instance().currentEdit.get()
    },
    checkArtist: function (artist) {
        var h = "";
        var r = Template.instance().currentEdit.get().artist_name
        if (r === undefined) {
            return false;
        }
        else {
            for (let i = 0; i < r.length; i++) {
                h = r[i];
                if (h == artist)
                    return true
            }
        }
    },
    checkLan: function (lan) {
        if (Template.instance().currentEdit.get() && Template.instance().currentEdit.get().language == lan)
            return true;
    },
    checkCat: function (cat) {
        if (Template.instance().currentEdit.get() && Template.instance().currentEdit.get().category == cat)
            return true;
    },
    checkSubCat: function (scat) {
        if (Template.instance().currentEdit.get() && Template.instance().currentEdit.get().subcategory == scat)
            return true;
    },

})
Template.admin_song_list.events({
    'click .delete'(e) {
        e.preventDefault();
        var songId = this._id;
        var confirm = window.confirm("Delete this song?");
        if (confirm) {
            Meteor.call('song.remove', songId);
        }
    },
    'click .playPause'(e, template) {
        /*  var audio = document.getElementById('h');
         template.currentAudio_id.set(this._id);
         template.currentAudio.set(this.audioUrl);
         Meteor.setTimeout(() => {
             //  alert(this.audioUrl)
             console.log(audio)
             if (audio.paused) {
                 audio.play();
                 // template.currentAudio.set(this.audioUrl);
             }
             else {
                 // template.currentAudio.set(this.audioUrl);
                 audio.pause();
             }
         }, 40); */

        var audio = document.getElementById(this._id);
        if (audio.paused) {
            audio.play();
        }
        else {
            audio.pause();
        }
    },
    'click .edit'(e, template) {
        e.stopImmediatePropagation();
        template.currentEdit.set(this);
        currentList = this._id;
        artist_name = this.artist_name;
        audio = this.song_audio;
        audioUrl = this.audioUrl;
        audioName = this.audioName;
        image = this.song_image;
        imageUrl = this.imageUrl;
        imageName = this.imageName;
        var editModal = $("#add_Song")
        editModal.find('.modal-title').text('Edit Song');
        editModal.modal('show');
    },
    'click .addSong'(e, template) {
        template.currentEdit.set(false);
        template.currentImageUrl.set(false);
        template.currentImageName.set(false);
        template.currentAudioName.set(false);
        var addModal = $("#add_Song")
        addModal.find('.modal-title').text('Add Song');
        addModal.modal('show');
    },

    'click #artist_name': function () {
        var checkboxes = document.getElementById("checkboxes");
        if (!expanded) {
            checkboxes.style.display = "block";
            expanded = true;
        } else {
            checkboxes.style.display = "none";
            expanded = false;
        }
    },


    'change #checkboxes': function (event) {
        event.preventDefault();
        artist_name = [];
        $.each($("input[name='artist_name']:checked"), function () {
            artist_name.push($(this).val())
        });
        console.log(artist_name)
    },
    'click .closes': function (e, template) {
        template.currentImageUrl.set(false);
        template.currentImageName.set(false);
        template.currentAudioName.set(false);
        /* if (template.currentEdit.get() == false) {
            $('#add_Song').on('hidden.bs.modal', function () {
                $(this).find('form').trigger('reset');
            })
        } */
    },
    'submit .new-song'(event, template) {
        event.preventDefault();
        const target = event.target;
        const song_name = target.song_name.value;
        const movie_name = target.movie_name.value;
        const language = target.language.value;
        const category = target.category.value;
        const subcategory = target.subcategory.value;
        const song_audio = target.song_audio.value;
        const song_image = target.song_image.value;
        if (template.currentEdit.get() == false) {
            Meteor.call('song.insert', song_name, movie_name, artist_name, language, category, subcategory, audio, audioUrl, audioName, image, imageUrl, imageName);
            template.currentEdit.set(this);
            console.log(template.currentEdit.get())
            template.currentImageUrl.set(false);
            template.currentImageName.set(false);
            template.currentAudioName.set(false);
            target.song_name.value = '';
            target.movie_name.value = '';
            target.artist_name.value = '';
            target.language.value = '';
            target.category.value = '';
            target.subcategory.value = '';
            target.song_audio.value = '';
            target.song_image.value = '';

        }

        else {
            Meteor.call('song.update', song_name, movie_name, artist_name, language, category, subcategory, audio, audioUrl, audioName, image, imageUrl, imageName, currentList)

        }

        $('.bd-example-modal-lg').modal('hide');
        return false;
    },

    /* upload image file */
    'change #imageFile'(e, template) {

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
                }
                template.currentUpload.set(false);
                image = fileImage._id;
                imageUrl = Images.link(fileImage, 'thumbnail')
                template.currentImageUrl.set(imageUrl);
                imageName = fileImage.name;
                template.currentImageName.set(imageName);

            });
            upload.start();
        }
    },
    /* upload audio file */
    'change #audioFile'(e, template) {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            var file = e.currentTarget.files[0];
            const upload = Audio.insert({
                file: file,
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);
            upload.on('start', function () {
                template.currentAudioUpload.set(this);
            });
            upload.on('end', function (error, fileAudio) {
                if (error) {
                    alert('Error during upload: ' + error);
                }
                template.currentAudioUpload.set(false);
                audio = fileAudio._id;
                audioName = fileAudio.name;
                template.currentAudioName.set(audioName);

                audioUrl = Audio.link(fileAudio, 'thumbnail')

            });

            upload.start();
        }
    },



})