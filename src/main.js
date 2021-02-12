import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/main.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    var firebaseConfig = {
      apiKey: 'AIzaSyCn9ao3byGHaMW2lBUPzXSgTCHmMNfjWKI',
      authDomain: 'sibdev-ebcb8.firebaseapp.com',
      databaseURL: 'https://sibdev-ebcb8-default-rtdb.firebaseio.com',
      projectId: 'sibdev-ebcb8',
      storageBucket: 'sibdev-ebcb8.appspot.com',
      messagingSenderId: '77108501423',
      appId: '1:77108501423:web:4f863049eb450b2d022d5a',
    };
    firebase.initializeApp(firebaseConfig);
  },
  render: (h) => h(App),
}).$mount('#app');
