import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import Auth from '../views/Auth.vue';
import Home from '../views/Home.vue';
import Favorites from '../views/Favorites.vue';
import SaveRequest from '../views/SaveRequest.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/',
    name: 'search',
    component: Home,
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites,
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  {
    path: '/saveRequest',
    name: 'saveRequest',
    component: SaveRequest,
    meta: {
      layout: 'main',
      auth: true,
      modal: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch('setToken');
  const currentUser = store.getters.getToken;
  const requireAuth = to.matched.some((record) => record.meta.auth);

  const modalActive = store.getters.getModalActive;
  const modal = to.matched.some((record) => record.meta.modal);

  if (requireAuth && !currentUser) {
    next('/auth');
  } else if (!requireAuth && currentUser) {
    next('/');
  } else {
    next();
  }

  if (!modalActive && modal) {
    next('/');
  }
});

export default router;
