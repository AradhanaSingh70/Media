import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
export const Song = new Mongo.Collection('song');

export const Artist = new Mongo.Collection('artist');

const Images = new FilesCollection({

    collectionName: 'Images',
    allowClientCode: true, // Disallow remove files from Client
    onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        }
        return 'Please upload image, with size equal or less than 10MB';
    }

});


export { Images };

export const Audio = new FilesCollection({
    collectionName: 'Audio',
    allowClientCode: true,
})

