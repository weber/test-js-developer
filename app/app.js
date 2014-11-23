/**
 * Created by webs on 15.11.14.
 */
'use strict';
var myApp = window.myApp = {};
var gapi = window.gapi;
myApp.config = require('./config');
myApp.modelUser = require('./models/user').modelUser;
myApp.routers = require('./routers').routers;
require('./views/user');

var template = {
    auth : _.template(require('./templates/auth.html'))
};
$('#auth').html(template.auth(myApp.config.params));


require('./views/albums');
require('./views/photos');
require('./views/status');

myApp.routers.routes['*notFound']='page404';

window.connectUser = function(authResult) {

    var Routers = Backbone.Router.extend(myApp.routers);
    var app_router = new Routers();
    var path = location.pathname;
    var h=path.slice(1);
    app_router.navigate(h, {trigger: true});

    Backbone.emulateJSON = true;

    if (authResult.access_token) {

        document.getElementById("signinButton").style.display = "none";
        document.getElementById("revokeButton").style.display = "block";

        gapi.auth.setToken(authResult);
        gapi.client.load('oauth2', 'v2', function() {
            var request = gapi.client.oauth2.userinfo.get();
            request.execute(function(obj){
                myApp.modelUser.set(obj);
            });
        });

        Backbone.history.start({pushState: true});
    }
    else if (authResult.error) {
        // Возможные коды ошибок:
        //   "access_denied" – пользователь отказался предоставить приложению доступ к данным
        //   "immediate_failed" – не удалось выполнить автоматический вход пользователя
        console.log('There was an error: ' + authResult.error);
        document.getElementById("signinButton").style.display = "inline-block";
    }
};

