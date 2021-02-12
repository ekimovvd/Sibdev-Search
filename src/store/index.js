import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

import user from './user.js';
import modal from './modal.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    video: {},
    countVideo: 0,
    searchParams: {
      request: '',
      sort: 'any',
      range: 12,
    },
  },
  mutations: {
    setVideo(state, payload) {
      state.video = payload;
    },
    setVideoClear(state) {
      state.video = {};
    },
    setSearchParams(state, payload) {
      state.searchParams = payload;
    },
    setClearSearchParams(state) {
      state.searchParams = {
        request: '',
        sort: 'any',
        range: 12,
      };
    },
  },
  actions: {
    async setVideo({commit}, {request, sort, range}) {
      const api_key = 'AIzaSyBIWPkp_E41y5A4N0tnZfLNS2rjhl7wA54';

      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${request}&type=video&videoDuration=${sort}&maxResults=${range}&key=${api_key}`
      );

      const data = response.data;
      const items = data.items;
      const countVideo = data.pageInfo.resultsPerPage;

      let url = 'https://www.youtube.com/watch?v=';
      let videoId;
      let views;
      let viewCount;
      let imgUrl;
      let title;
      let channelTitle;

      let tmp = [];
      let obj;

      for (let item in items) {
        videoId = items[item].id.videoId;

        url += videoId;

        views = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${api_key}`
        );

        viewCount = views.data.items[0].statistics.viewCount + ' просмотров';

        imgUrl = items[item].snippet.thumbnails.medium.url;

        title = items[item].snippet.title;

        channelTitle = items[item].snippet.channelTitle;

        obj = {
          url,
          imgUrl,
          title,
          viewCount,
          channelTitle,
        };

        url = 'https://www.youtube.com/watch?v=';

        tmp.push(obj);
      }

      let video = {
        request,
        countVideo,
        items: tmp,
      };

      commit('setVideo', video);
    },
    setVideoClear({commit}) {
      commit('setVideoClear');
    },
    setSearchParams({commit, dispatch}, {request, sort, range}) {
      commit('setSearchParams', {request, sort, range});
      dispatch('setVideoClear');
    },
    setClearSearchParams({commit}) {
      commit('setClearSearchParams');
    },
  },
  getters: {
    getVideo(state) {
      return state.video;
    },
    getSearchParams(state) {
      return state.searchParams;
    },
  },
  modules: {
    user,
    modal,
  },
});
