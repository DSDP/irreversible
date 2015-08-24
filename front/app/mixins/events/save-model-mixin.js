import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    save: function() {
      var route = this;
      this.currentModel.save().then(function() {
        route.transitionTo(route.routeName.split('.')[0]);
      }, function() {
        console.log('Failed to save the model');
      });
    }
  },
  deactivate: function() {
    if (this.currentModel.get('files.length') > 0) {
      this.currentModel.get('files').forEach(function (file) {
        file.destroyRecord();
      });
    }
    this.currentModel.rollback();
  }
});
