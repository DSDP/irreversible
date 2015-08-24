import Ember from 'ember';
import layout from '../templates/components/entry-brief';
import imageRegex from '../utils/image-regex';
import videoRegex from '../utils/video-regex';
import audioRegex from '../utils/audio-regex';
import youtubeRegex from '../utils/youtube-regex';
import urlRegex from '../utils/url-regex';

export default Ember.Component.extend({
  layout: layout,

  video: null,
  audio: null,
  image: null,
  youtube: null,

  didInsertElement: function () {
    if (RegExp(imageRegex()).test(this.get('message'))) {
      this.set('image', RegExp(imageRegex()).exec(this.get('message'))[0]);
    } 
    if (RegExp(videoRegex()).test(this.get('message'))) {
      this.set('video', RegExp(videoRegex()).exec(this.get('message'))[0]);
    }     
    if (RegExp(audioRegex()).test(this.get('message'))) {
      this.set('audio', RegExp(audioRegex()).exec(this.get('message'))[0]);
    }  
    if (RegExp(youtubeRegex()).test(this.get('message'))) {
      this.set('youtube', "https://www.youtube.com/embed/" + RegExp(youtubeRegex()).exec(this.get('message'))[1]);
    } 
  }
});
