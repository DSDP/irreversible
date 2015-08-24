import Ember from 'ember';

export default Ember.Controller.extend({
	groupList: [],
	processing: false,
	resetFlag: false,

	typeList: [
		{id: 0, multiplier: 2, top: 0},
		{id: 1, multiplier: 1, top: 0},
		{id: 2, multiplier: 2, top: 200}
	],

	actions: {
		reset: function () {
			this.toggleProperty('reset');
		},

		process: function  () {
			var _this = this;
			var fr = new FileReader();
			var fileInputElement = document.getElementById("file");
			fr.readAsText(fileInputElement.files[0]);
			this.set('processing', true);

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
			                tarr.set(headers[j].toLowerCase(), data[j]);
			            }
			            lines.push(tarr);
			        }
			    }
			    _this.proccesLines(lines);
			};
		}
	},

	proccesLines: function (lines) {
		lines.forEach(function (line){
			if (line.get('townname')) {
				var obj = this.findTownStatus(line.get('townname').toUpperCase());
				if (obj.townStatus) {
					var ts = obj.townStatus;
					var ss = obj.section;

					var ssl = ss.get('lineAvalCount').findBy('name', line.get('sourcelist'));
					var sdl = ss.get('lineAvalCount').findBy('name', line.get('destinationlist'));
					ssl.set('entry', parseInt(ssl.get('entry')) - parseInt(line.get('count')));
					sdl.set('entry', parseInt(sdl.get('entry')) + parseInt(line.get('count')));

					var sl = ts.get('lineStatuses').findBy('name', line.get('sourcelist'));
					var dl = ts.get('lineStatuses').findBy('name', line.get('destinationlist'));
					sl.set('entry', parseInt(sl.get('entry')) - parseInt(line.get('count')));
					dl.set('entry', parseInt(dl.get('entry')) + parseInt(line.get('count')));

					var type = this.get('typeList').findBy('id', dl.get('type'));
					if (type.id == 2) {
						if ((dl.get('need') * type.multiplier) < 200) {
							if (dl.get('entry') >= (dl.get('need') * type.multiplier)) {
								dl.set('valid', true);
							} else {
								dl.set('valid', false);
							}
						} else {
							if (parseInt(dl.get('entry')) >= 200) {
								dl.set('valid', true);
							} else {
								dl.set('valid', false);
							}
						}
					} else {
						if (dl.get('entry') >= (dl.get('need') * type.multiplier)) {
							dl.set('valid', true);
						} else {
							dl.set('valid', false);
						}						 
					}	
				}
			}
		}, this);
		this.set('processing', false);
	},

	findTownStatus: function (townName) {
		var townStatus = null;
		var s = null;
		this.get('sections').forEach(function (section){
			section.get('townStatuses').forEach(function (ts) {
				if (ts.get('name') === townName) {
					townStatus = ts;
					s = section
				}
			});
		});
		return {townStatus: townStatus, section: s};
	},


	sections: Ember.computed('model.lines.@each', 'reset', function () {
		var sections = [];
		var _this = this;
		if (this.get('model.lines')) {
			this.get('model.lines').forEach(function (line) {
				line.get('avalStatuses').forEach(function (avalStatus) {
					var electoralSection = avalStatus.get('electoralSection');
					var g = sections.findBy('id', electoralSection.get('id'));
					if (!g) {
						g = Ember.Object.create({
							id: avalStatus.get('electoralSection').get('id'), 
							electoralSection: electoralSection, 
							townStatuses: [],
							total: 0,
							lineAvalCount: [
								Ember.Object.create({order: 0, need: 0, entry: 0, name: 'Lista 2'}), 
								Ember.Object.create({order: 1, need: 0, entry: 0, name: 'Lista 1'}), 
								Ember.Object.create({order: 2, need: 0, entry: 0, name: 'Lista 10'}), 
								Ember.Object.create({order: 3, need: 0, entry: 0, name: 'Lista 4'}),
								Ember.Object.create({order: 4, need: 0, entry: 0, name: 'Lista 6'}),
								Ember.Object.create({order: 5, need: 0, entry: 0, name: 'Lista 8'}),
								Ember.Object.create({order: 6, need: 0, entry: 0, name: 'Lista 34'}),
								Ember.Object.create({order: 7, need: 0, entry: 0, name: 'Lista 36'}),
								Ember.Object.create({order: 8, need: 0, entry: 0, name: 'Lista 38'}),
							]
						});
						sections.pushObject(g);
					}
					var t = g.get('townStatuses').findBy('name', avalStatus.get('townName'));
					if (!t) {
						t = Ember.Object.create({
							name: avalStatus.get('townName'), 
							lineStatuses: [
								Ember.Object.create({order: 0, need: 0, entry: 0, name: 'Lista 2', type: 0}), 
								Ember.Object.create({order: 1, need: 0, entry: 0, name: 'Lista 1', type: 1}), 
								Ember.Object.create({order: 2, need: 0, entry: 0, name: 'Lista 10', type: 1}), 
								Ember.Object.create({order: 3, need: 0, entry: 0, name: 'Lista 4', type: 2}),
								Ember.Object.create({order: 4, need: 0, entry: 0, name: 'Lista 6', type: 2}),
								Ember.Object.create({order: 5, need: 0, entry: 0, name: 'Lista 8', type: 2}),
								Ember.Object.create({order: 6, need: 0, entry: 0, name: 'Lista 34', type: 2}),
								Ember.Object.create({order: 7, need: 0, entry: 0, name: 'Lista 36', type: 2}),
								Ember.Object.create({order: 8, need: 0, entry: 0, name: 'Lista 38', type: 2}),
							],
							total: 0,
							need: avalStatus.get('avalesNeed'),
							needDouble: parseInt(avalStatus.get('avalesNeed')) * 2,
						});
						g.get('townStatuses').pushObject(t);
					}
					var l = t.get('lineStatuses').findBy('order', line.get('avalesNeed'));
					var lt = g.get('lineAvalCount').findBy('order', line.get('avalesNeed'));
					lt.set('entry', lt.get('entry') + parseInt(avalStatus.get('avalesEntry')))
					t.set('total', t.get('total') + parseInt(avalStatus.get('avalesEntry')));
					g.set('total', g.get('total') + parseInt(avalStatus.get('avalesEntry')));
					l.set('need', avalStatus.get('avalesNeed'));
					l.set('entry', avalStatus.get('avalesEntry'));
					//l.set('name', line.get('number'));
					l.set('type', line.get('avalesEntry'));
					_this.set('linesName', t.get('lineStatuses'));

					var type = _this.get('typeList').findBy('id', line.get('avalesEntry'));
					if (type.id == 2) {
						if ((l.get('need') * type.multiplier) < 200) {
							if (l.get('entry') >= (l.get('need') * type.multiplier)) {
								l.set('valid', true);
							}
						} else {
							if (parseInt(l.get('entry')) >= 200) {
								l.set('valid', true);
							}
						}
					} else {
						if (l.get('entry') >= (l.get('need') * type.multiplier)) {
							l.set('valid', true);
						}						
					}					
				}, this);
			});
		}
		return sections;
	}),	
});
