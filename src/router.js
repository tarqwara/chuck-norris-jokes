import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Jokes from './views/Jokes.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: ':category',
          name: 'jokes',
          component: Jokes,
        },
      ],
    },
  ],
});
