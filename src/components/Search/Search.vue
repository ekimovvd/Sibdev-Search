<template>
  <div class="search">
    <div class="container">
      <div class="search-form" :class="{'search-form_active': video}">
        <h1 class="search-form__title">
          Поиск видео
        </h1>
        <div class="search-form__group">
          <div class="search-form__block">
            <input
              type="text"
              placeholder="Что хотите посмотреть?"
              class="search-form__input"
              v-model="request"
            />
            <svg
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              @click="modalShow"
              v-if="video && !activeHeart"
              class="search-form__icon"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.8401 3.60999C20.3294 3.099 19.7229 2.69364 19.0555 2.41708C18.388 2.14052 17.6726 1.99817 16.9501 1.99817C16.2276 1.99817 15.5122 2.14052 14.8448 2.41708C14.1773 2.69364 13.5709 3.099 13.0601 3.60999L12.0001 4.66999L10.9401 3.60999C9.90843 2.5783 8.50915 1.9987 7.05012 1.9987C5.59109 1.9987 4.19181 2.5783 3.16012 3.60999C2.12843 4.64169 1.54883 6.04096 1.54883 7.49999C1.54883 8.95903 2.12843 10.3583 3.16012 11.39L4.22012 12.45L12.0001 20.23L19.7801 12.45L20.8401 11.39C21.3511 10.8792 21.7565 10.2728 22.033 9.60535C22.3096 8.93789 22.4519 8.22248 22.4519 7.49999C22.4519 6.77751 22.3096 6.0621 22.033 5.39464C21.7565 4.72718 21.3511 4.12075 20.8401 3.60999V3.60999Z"
                stroke="#1390E5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              v-if="video && activeHeart"
              @click="modalShow"
              class="search-form__icon"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.8401 3.60999C20.3294 3.099 19.7229 2.69364 19.0555 2.41708C18.388 2.14052 17.6726 1.99817 16.9501 1.99817C16.2276 1.99817 15.5122 2.14052 14.8448 2.41708C14.1773 2.69364 13.5709 3.099 13.0601 3.60999L12.0001 4.66999L10.9401 3.60999C9.90843 2.5783 8.50915 1.9987 7.05012 1.9987C5.59109 1.9987 4.19181 2.5783 3.16012 3.60999C2.12843 4.64169 1.54883 6.04096 1.54883 7.49999C1.54883 8.95903 2.12843 10.3583 3.16012 11.39L4.22012 12.45L12.0001 20.23L19.7801 12.45L20.8401 11.39C21.3511 10.8792 21.7565 10.2728 22.033 9.60535C22.3096 8.93789 22.4519 8.22248 22.4519 7.49999C22.4519 6.77751 22.3096 6.0621 22.033 5.39464C21.7565 4.72718 21.3511 4.12075 20.8401 3.60999Z"
                fill="#C5E4F9"
                stroke="#1390E5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="search-form__tooltip" v-if="video && activeHeart">
              <p class="search-form__text">
                Поиск сохранён в разделе «Избранное»
              </p>
              <router-link to="/favorites" class="search-form__link">
                Перейти в избранное
              </router-link>
            </div>
          </div>
          <Button :btn="btn" @click="search" />
        </div>
      </div>
      <SearchFilter
        @typeSwitcherChanged="typeSwitcher = $event"
        :typeSwitcher="typeSwitcher"
        v-if="video"
      />
      <SearchGrid :typeClass="typeSwitcher" v-if="video" />
    </div>
  </div>
</template>

<script>
import './Search.scss';
import Button from '../Button/Button.vue';
import SearchFilter from '../SearchFilter/SearchFilter.vue';
import SearchGrid from '../SearchGrid/SearchGrid.vue';
export default {
  components: {
    Button,
    SearchFilter,
    SearchGrid,
  },
  data() {
    return {
      typeSwitcher: 'grid',
      request: '',
      sort: 'any',
      range: 12,
      btn: {
        title: 'Найти',
        class: 'search-form__btn btn',
      },
      modal: {
        title: 'Сохранить запрос',
        disabled: true,
        btn_1: 'Не сохранять',
        btn_2: 'Сохранить',
        emit: 'save',
      },
    };
  },
  created() {
    let {request, sort, range} = this.$store.getters.getSearchParams;
    this.request = this.video.request || request;
    this.sort = sort;
    this.range = range;
  },
  computed: {
    modalActive() {
      return this.$store.getters.getModalActive;
    },
    activeHeart() {
      return this.$store.getters.getActiveHeart;
    },
    video() {
      return Object.keys(this.$store.getters.getVideo).length > 0
        ? this.$store.getters.getVideo
        : false;
    },
  },
  methods: {
    search() {
      let obj = {
        request: this.request,
        sort: this.sort,
        range: this.range,
      };
      this.$store.dispatch('setVideo', obj);
    },
    modalShow() {
      let obj = {
        id: '',
        request: this.request,
        name: '',
        sort: 'any',
        range: 12,
        title: 'Сохранить запрос',
        disabled: true,
        btn_1: 'Не сохранять',
        btn_2: 'Сохранить',
        store: 'setPostFavorites',
        activeHeart: true,
        to: '/',
      };
      this.$store.dispatch('setModalActive', true);
      this.$store.dispatch('setModal', obj);

      this.$router.push('/saveRequest');
    },
  },
};
</script>
