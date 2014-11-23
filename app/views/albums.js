/**
 * Created by webs on 18.11.14.
 */
var Albums = Backbone.View.extend({
    template:{
        album : _.template(require('../templates/album.html'))
        ,status_album : _.template(require('../templates/status_album.html'))
    },
    el:'#listAlbum',
    events: {
        'click  li': 'getPhotosAlbum'
    }
    ,initialize: function (){

        this.modelUser          = require('../models/user').modelUser;
        this.collectionAlbums   = require('../collections/albums').collectionAlbums;
        this.collectionPhotos   = require('../collections/photos').collectionPhotos;

        this.modelUser.on('change',this.getAlbums,this);
        this.collectionAlbums.on('reset',this.showAlbums,this);

    }
    ,getAlbums: function(){

        if(_.isEmpty(this.modelUser.toJSON().id))
            return false;

        var url = this.collectionAlbums.url;
        this.collectionAlbums.url+=this.modelUser.toJSON().id;
        this.collectionAlbums.read({},this.collectionAlbums);
        this.collectionAlbums.url = url;

    }
    ,showAlbums: function(){

        var self = this;
        this.$el.empty();
        window.myApp.page ="albums";
        this.collectionAlbums.each(function(model){

            var agoDate = moment(model.toJSON().published.$t).fromNow();

            var item_template = self.template.album({
                "album":model.toJSON()
                ,"agoDate":agoDate
            });

            $(item_template).appendTo("#listAlbum");
        });

    }
    ,getPhotosAlbum: function(e){
        this.$el.empty();
        window.myApp.page ="album";

        var album_id = $(e.currentTarget).attr('data-album_id');
        //Backbone.history.navigate('/album/'+album_id, {trigger: true});
        var url = this.collectionPhotos.url;
        this.collectionPhotos.url+=this.modelUser.toJSON().id;
        this.collectionPhotos.url+="/albumid/"+album_id;
        this.collectionPhotos.read({},this.collectionPhotos);
        this.collectionPhotos.url = url;

        var modelAttr = _.find(this.collectionAlbums.toJSON(), function(obj){
            if (obj.gphoto$id.$t === album_id)
                return obj
        });

        var item_template = window.myApp.statusCurrAlbumHtml =  this.template.status_album({"title_album":modelAttr['title'].$t});
        $("#album_status").html(item_template);
    }
});

//Routers
myApp.routers.routes.album="albums";
myApp.routers.albums = function() {
    new Albums();
};

exports.viewAlbums    =  Albums;

