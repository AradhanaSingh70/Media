import './signup.html';
import { Template } from 'meteor/templating';
Template.signup.events({
    'submit form': function (event) {
        event.preventDefault();
        const target = event.target;
        var first_name = target.first_name.value;
        var last_name = target.last_name.value;
        var email = target.email.value;
        var password = target.password.value;
        var full_name = first_name + ' ' + last_name;
        Meteor.call('userlist.insert', email, password, first_name, last_name, full_name, function (error, result) {
            if (error) {
                alert(error.reason);
            } else {
                Router.go('/');
                target.first_name.value = '';
                target.last_name.value = '';
                target.email.value = '';
                target.password.value = '';
                $('#exampleModal1').modal('hide');
                return false;
            }
        })
    },
})