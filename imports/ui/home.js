import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Images } from '../api/collection.js';
import './home.html';
Template.home.helpers({
    admin: function () {
        return Roles.addUsersToRoles(Meteor.userId(), 'admin')
    }
})