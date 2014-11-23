/**
 * Created by webs on 18.11.14.
 */


var Status = Backbone.View.extend({
    template:{
        status_photo : _.template(require('../templates/status_photo.html'))
        ,status_user : _.template(require('../templates/status_user.html'))
    },
    el:'#album_status',
    events: {
        'click  #back': 'back'
    }
    ,initialize: function (){
        myApp.modelUser.on('change',this.setStatusUserName,this);
    }
    ,setStatusPhoto: function(title_photo){
        this.$el.html(this.template.status_photo({"title_photo":title_photo}));
    }
    ,setStatusAlbum: function(){
        this.$el.html(myApp.statusCurrAlbumHtml);
    }
    ,setStatusUserName: function(){
        this.$el.html(this.template.status_user({name: myApp.modelUser.toJSON().name}));
    }
    ,back: function(){

        if(myApp.page === "album"){

            $('#photosAlbum').empty();
            myApp.Albums.showAlbums();
            this.setStatusUserName();
        }

        if(myApp.page === "photo"){

            $('#selectedPhoto').empty();
            myApp.Photos.showPhotos();
            this.setStatusAlbum()
        }
    }


});

exports.viewStatus  = window.myApp.Status =  new Status;


