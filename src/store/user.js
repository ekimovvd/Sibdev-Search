import firebase from 'firebase/app';
import router from '../router';

export default {
  state: {
    token: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setRemoveToken(state) {
      state.token = null;
    },
  },
  actions: {
    setToken({commit}) {
      let token = localStorage.getItem('token');

      if (!token) {
        return false;
      } else {
        commit('setToken', token);
      }
    },
    async setLoginUser({}, {email, password}) {
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        localStorage.setItem('token', user.user.uid);
        router.push('/');
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    async setLogout({commit}) {
      let token = localStorage.getItem('token');

      if (token) {
        localStorage.removeItem('token');
        await firebase.auth().signOut();
        commit('setRemoveToken');
        router.push('/auth');
      }
    },
  },
  getters: {
    getToken(state) {
      return state.token === null ? false : true;
    },
  },
};
