import { Template } from "meteor/templating";
import { Meteor } from 'meteor/meteor';
import './login.html';
Template.login.events({
    'submit form': function (event) {
        event.preventDefault();
        const target = event.target;
        var email = event.target.email.value;
        var password = event.target.password.value;
        Meteor.loginWithPassword(email, password, function (error) {
            if (error) {
                alert(error.reason);
            } else {
                Router.go('/');
                target.email.value = '';
                target.password.value = '';
                $('#exampleModal').modal('hide');
                return false;

            }
        });

    },

})
