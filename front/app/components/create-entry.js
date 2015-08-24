import Ember from 'ember';
import layout from '../templates/components/create-entry';


export default Ember.Component.extend({
  layout: layout,
  message: '',
  wall: null,
  loading: false,
  files: [],
  type: 'message',
  model: null,
  saved: false,

  clearHandler: function () {
    this.set('files', []);
  }.observes('clear'),

  disablePublish: function () {
    return this.get('message') === '';
  }.property('message'),

  actions: {
    changeType: function (type) {
      this.set('type', type);
    },
    save: function () {
      if (this.get('message') !== '') {
      	var _self = this;
    		var store = this.get('store');
        this.set('loading', true);
        store.find('wall', this.get('wall')).then(function (wall) {
      		var entry;

          if (_self.get('model')) {
            entry = _self.get('model');
          } else {
            entry = store.createRecord('entry');
          }
          entry.set('message',  _self.get('message'));
          entry.set('wall', wall);
          entry.set('type', _self.get('type'));
            

          entry.get('files').pushObjects(_self.get('files'));
          entry.save().then(function (model) {
              _self.set('saved', true);
      	  		_self.sendAction( 'createAction', model );
      	  		_self.set('message', '');
              _self.set('loading', false);
      		});
        });
      }
  	},
  }
});
