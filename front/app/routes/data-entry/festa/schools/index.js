import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "../../../../mixins/infinity-route";


export default Ember.Route.extend(InfinityRoute, AuthenticatedRouteMixin, {
  _listName: 'model',

  model: function() {
      return this.infinityModel("school", { perPage: 10, startingPage: 1});
  },

  proccesLines: function (lines) {
      var schools = [];
      var boards = [];

      lines.forEach(function (line) {

        var school = this.get('store').createRecord('school', {
          name: line.get('descripcion'),
          lat: line.get('lat'),
          lg: line.get('long'),
        });

        for (var i = parseInt(line.get('mesa_desde')); i <= parseInt(line.get('mesa_hasta')); i++) {
          var board = this.get('store').createRecord('board', {
              name: i.toString(),
              festaPoints: 0,
              westPoints: 0
          });

          boards.pushObject(board);
          school.get('boards').pushObject(board);
        };

        schools.pushObject(school);
      }, this);
      var _this = this;

      var promises = Ember.A();
      

      boards.forEach(function(item){
          promises.push(item.save());     
      });

      Ember.RSVP.Promise.all(promises).then(function(resolvedPromises){
        _this.store.find('town', 6079).then(function (town) {
          schools.forEach(function(item){   
              item.set('town', town);     
              promises.push(item.save());
          });
          Ember.RSVP.Promise.all(promises).then(function(resolvedPromises){
             //
          });
        })
      });    
  },

  actions: {
    remove: function(model) {
      if(confirm('Are you sure?')) {
        model.destroyRecord();
      }
    },
    process: function  () {
      var _this = this;

      var fr = new FileReader();
      var fileInputElement = document.getElementById("file");
      fr.readAsText(fileInputElement.files[0]);

      fr.onload = function () {
          var allTextLines = fr.result.split(/\r\n|\n/);
          var headers = allTextLines[0].split(';');
          if (headers.length < 2) {
            headers = allTextLines[0].split(',');
          }
          var lines = [];

          for (var i=1; i<allTextLines.length; i++) {       
              var data = allTextLines[i].split(';');
              if (data.length < 2)
                data = allTextLines[i].split(',');

              if (data.length == headers.length) {
                  var tarr = Ember.Object.create({
                    lineNumber: i
                  });
                  for (var j=0; j<headers.length; j++) {
                      tarr.set(headers[j].toLowerCase().replace(/ /g, '_'), data[j]);
                  }
                  lines.push(tarr);
              }
          }
          _this.proccesLines(lines);
      };
    },      
  
  },  
});
