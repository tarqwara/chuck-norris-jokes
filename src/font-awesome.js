import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCircle,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

library.add(
  faCircle,
  faHeart,
);

Vue.component('fa-icon', FontAwesomeIcon);
Vue.component('fa-layers', FontAwesomeLayers);
Vue.component('fa-text', FontAwesomeLayersText);
