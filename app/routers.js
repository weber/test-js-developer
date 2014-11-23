'use strict';
exports.routers = {

    routes: {
        "": "default"
    },
    default: function() {
        var Albums = require('./views/albums').viewAlbums;
        window.myApp.Albums = new Albums();
    }
    ,page404: function(){
        var p404 = _.template(require('./templates/404.html'));
        $('#content').html(p404());
    }


};

