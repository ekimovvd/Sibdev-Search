import axios from 'axios';

export default {
  state: {
    modalActive: false,
    activeHeart: false,
    favorites: [],
    modal: {
      id: '',
      request: '',
      name: '',
      sort: '',
      range: 0,
      title: '',
      disabled: true,
      btn_1: '',
      btn_2: '',
      store: '',
      to: '',
    },
  },
  mutations: {
    setModalActive(state, payload) {
      state.modalActive = payload;
    },
    setFavorites(state, payload) {
      state.favorites.push(payload);
    },
    setClearFavorites(state) {
      state.favorites = [];
    },
    setModal(state, payload) {
      state.modal = payload;
    },
    setActiveHeart(state, payload) {
      state.activeHeart = payload;
    },
    setClearActiveHeart(state) {
      state.activeHeart = false;
    },
  },
  actions: {
    setModalActive({commit}, payload) {
      commit('setModalActive', payload);
    },
    async setPostFavorites({}, {request, name, sort, range}) {
      console.log(request, name, sort, range);

      await axios.post(
        `https://sibdev-ebcb8-default-rtdb.firebaseio.com/favorites/.json`,
        {
          request,
          name,
          sort,
          range,
        }
      );
    },
    async setFavorites({commit}) {
      commit('setClearFavorites');

      const favorites = await axios.get(
        'https://sibdev-ebcb8-default-rtdb.firebaseio.com/favorites/.json'
      );

      let data = favorites.data;
      let key;
      let obj;

      if (data) {
        for (let item in Object.keys(data)) {
          key = Object.keys(data)[item];

          obj = {
            id: key,
            request: data[key].request,
            name: data[key].name,
            sort: data[key].sort,
            range: data[key].range,
          };

          commit('setFavorites', obj);
        }
      }
    },
    async updateFavorites(
      {commit, dispatch},
      {id, request, name, sort, range}
    ) {
      commit('setModalActive', false);
      await axios.put(
        `https://sibdev-ebcb8-default-rtdb.firebaseio.com/favorites/${id}.json`,
        {
          request,
          name,
          sort,
          range,
        }
      );
      dispatch('setFavorites');
    },
    async deleteFavorites({dispatch}, payload) {
      await axios.delete(
        `https://sibdev-ebcb8-default-rtdb.firebaseio.com/favorites/${payload}.json`
      );

      dispatch('setFavorites');
    },
    setModal({commit}, payload) {
      commit('setModal', payload);
    },
    setActiveHeart({commit}, payload) {
      commit('setActiveHeart', payload);
    },
    setClearActiveHeart({commit}) {
      commit('setClearActiveHeart');
    },
  },
  getters: {
    getModalActive(state) {
      return state.modalActive;
    },
    getFavorites(state) {
      return state.favorites;
    },
    getModal(state) {
      return state.modal;
    },
    getActiveHeart(state) {
      return state.activeHeart;
    },
  },
};
