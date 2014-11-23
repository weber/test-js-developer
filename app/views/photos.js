/**
 * Created by webs on 18.11.14.
 */


var Photos = Backbone.View.extend({
    template:{
        photoAlbum : _.template(require('../templates/photoAlbum.html'))
        ,photo : _.template(require('../templates/photo.html'))
    },
    el:'#photosAlbum',
    events: {
        'click  li .controll a': 'showPhoto'
    }
    ,initialize: function (){

        this.modelUser          = require('../models/user').modelUser;
        this.collectionAlbums   = require('../collections/albums').collectionAlbums;
        this.collectionPhotos   = require('../collections/photos').collectionPhotos;

        this.collectionPhotos.on('change',this.showPhotos,this);
    }

    ,showPhotos: function(){

        var self = this;
        this.$el.empty();
        window.myApp.page ="album";

        this.collectionPhotos.each(function(model){

            $( self.template.photoAlbum(model.toJSON()) ).appendTo("#photosAlbum");

        });
    }
    ,showPhoto: function(e){
        this.$el.empty();
        window.myApp.page ="photo";

        var photo_id = $(e.currentTarget).attr('data-photo_id');
        var modelAttr = _.find(this.collectionPhotos.toJSON(), function(obj){
            if (obj.gphoto$id.$t === photo_id)
                return obj
        })

        myApp.Status.setStatusPhoto(modelAttr['title'].$t);
        $('#selectedPhoto').html(this.template.photo(modelAttr));

    }
});


exports.viewPhotos  = window.myApp.Photos =  new Photos;

