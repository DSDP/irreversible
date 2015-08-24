import Ember from 'ember';

export function percentOf(params) {
	if (params[0] && params[1]) {
		return Math.ceil(params[0] / params[1] * 100) + "%";
	}
	return "0%";
}

export default Ember.HTMLBars.makeBoundHelper(percentOf);
