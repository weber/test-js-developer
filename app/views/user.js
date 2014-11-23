/**
 * Created by webs on 18.11.14.
 */
var User = Backbone.View.extend({
    events: {
         'click  #revokeButton': 'revokeButton'
    }
    ,initialize: function (){

        this.modelUser = require('../models/user').modelUser;
    }
    ,revokeButton:  function(){
        gapi.auth.signOut();
        window.location.reload();
    }

});

exports.viewUser   = window.myApp.viewUser = new User;
