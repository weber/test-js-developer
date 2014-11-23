/**
 * Created by webs on 19.11.14.
 */
"use strict";
var modelAlbums = require('../models/albums').modelAlbums;

var Albums  =   Backbone.Collection.extend({
    model : modelAlbums

    ,url: 'http://picasaweb.google.com/data/feed/api/user/'
    ,sync : function(method, collection, options) {
        options.dataType = "jsonp";
        options.data = {alt: 'json-in-script'};
        return Backbone.sync(method, this, options);
    },
    parse : function(response) {
        console.info(this);
        return response.data;
    }
    ,read: function(data,model){
        data = {alt: 'json-in-script'};
        var dataType = "jsonp";

        Backbone.sync('read', this, {
            data:data
            ,dataType:dataType
            ,success: function(data) {
                model.reset(data.feed.entry);
                model.trigger('change');
            }
            ,error: function() {
                console.log('Error!');
            }
        });
    }
});

exports.collectionAlbums = new Albums();
