import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './header.html';
Template.header.events({
    'click .logout': function (event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    },
})
