/**
 * Created by webs on 19.11.14.
 */
var uploadPhoto =   Backbone.Model.extend({
    idAttribute: "_id"
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
    ,upload: function(data,model){
        data = {alt: 'json-in-script'};
        var dataType = "jsonp";

        Backbone.sync('create', this, {
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
exports.modelPhotos = window.myApp.uploadPhoto = uploadPhoto;