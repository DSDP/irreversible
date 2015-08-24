import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("login");
  this.route('balancer');
  this.route('festa');

  this.resource('red', function () {
    this.route("profile", function() {
      this.route("edit");

      this.route("show", {
        path: ":profile_id"
      });
    });
    this.route("entries", function() {
      this.route("edit", {
        path: ":entry_id/edit"
      });

      this.route("show", {
        path: ":entry_id"
      });
    });

    this.route("groups", function() {
      this.route("new");

      this.route("edit", {
        path: ":group_id/edit"
      });

      this.route("show", {
        path: ":group_id"
      });
    });
    
    this.route("events", function() {
      this.route("new");

      this.route("edit", {
        path: ":event_id/edit"
      });

      this.route("show", {
        path: ":event_id"
      });
    });

    this.route("friend-requests");
    this.route('favorites');
  });

  this.resource('admin', function () {
    this.route("users", function() {
      this.route("new");

      this.route("edit", {
        path: ":user_id/edit"
      });

      this.route("show", {
        path: ":user_id"
      });
    });
    this.route("roles", function() {
      this.route("new");
      this.route("edit", {
        path: ":role_id/edit"
      });
    });
  });


  this.resource("calendar", function() {
    
  });

  this.resource('municipabilities', function() {
    this.route('people', function() {
      this.route('show', {
        path: ":person_id/show",
      });
    });

    this.route("provinces", function() {
      this.route("show", {
        path: ":province_id/show",
      });
    });
    this.route("towns", function() {
      this.route("show", {
        path: ":town_id/show",
      });
    });

    this.route('electoral-sections', function() {
      this.route('show', {
        path: ":section_id/show",
      });
    });
  });

  this.resource('avales', function() {
    this.route("towns", function() {
      this.route("show", {
        path: ":town_id/show",
      });
    });
    this.route('electoral-sections', function() {
      this.route('show', {
        path: ":section_id/show",
      });
    });
    
  });

  this.route('data-entry', function() {
    this.route('festa', function() {
      this.route('schools', function() {
        this.route('edit', {
          path: ":school_id/edit",
        });      
      });
    });      
    this.route('avales', function() {
      this.route('avals', function() {
        this.route('new');
        this.route('edit', {
          path: ":aval_id/edit",
        });      
      });
      this.route('electoral-lists', function() {
        this.route('new');
        this.route('edit', {
          path: ":electoral-list_id/edit",
        });
        this.route('show', {
          path: ":electoral-list_id/show",
        });
      });
      this.route('electoral-lines', function() {
        this.route('new');
        this.route('edit', {
          path: ":electoral-line_id/edit",
        });
        this.route('show', {
          path: ":electoral-line_id/show",
        });
      });
      this.route('aval-operators', function() {
        this.route('new');
        this.route('edit', {
          path: ":aval-operator_id/edit",
        });
        this.route('show', {
          path: ":aval-operator_id/show",
        });
      });
    });       
    this.route('municipabilities', function() {
      this.route('people', function() {
        this.route('index');
        this.route('new');
        this.route('edit', {
          path: ":person_id/edit",
        });
        this.route('show', {
          path: ":person_id/show",
        });
      });
      this.route("electoral-events", function() {
        this.route("new");

        this.route("edit", {
          path: ":event_id/edit"
        });

        this.route("show", {
          path: ":event_id"
        });
      });
      this.route('charges', function() {
        this.route('new');
        this.route('edit', {
          path: ":charge_id/edit",
        });
        this.route('show', {
          path: ":charge_id/show",
        });
      });      
      this.route('candidates', function() {
        this.route('new');
        this.route('edit', {
          path: ":candidate_id/edit",
        });
        this.route('show', {
          path: ":candidate_id/show",
        });
      });

      this.route('functionaries', function() {
        this.route('new');
        this.route('edit', {
          path: ":functionary_id/edit",
        });
        this.route('show', {
          path: ":functionary_id/show",
        });
      });

      this.route('electoral-elections', function() {
        this.route('new');
        this.route('edit', {
          path: ":electoral-election_id/edit",
        });
        this.route('show', {
          path: ":electoral-election_id/show",
        });
      });

      this.route('political-parties', function() {
        this.route('new');
        this.route('edit', {
          path: ":political-party_id/edit",
        });
        this.route('show', {
          path: ":political-party_id/show",
        });
      });   

      this.route('political-spaces', function() {
        this.route('new');
        this.route('edit', {
          path: ":political-space_id/edit",
        });
        this.route('show', {
          path: ":political-space_id/show",
        });
      });         
    });
  });

  this.route('festa');
});

export default Router;