import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './font-awesome';

Vue.config.productionTip = false;

document.title = 'Chuck Norris Jokes';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
