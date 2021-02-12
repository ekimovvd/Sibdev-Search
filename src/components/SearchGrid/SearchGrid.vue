<template>
  <div class="search-grid" :class="'search-grid_' + typeClass">
    <div
      class="search-grid__card"
      v-for="(item, index) in video.items"
      :key="index"
    >
      <a :href="item.url" target="_blank" class="search-grid__video">
        <img :src="item.imgUrl" alt="" class="search-grid__img" />
      </a>
      <div class="search-grid__info">
        <h5 class="search-grid__title">
          {{ item.title }}
        </h5>
        <p class="search-grid__text">
          {{ item.channelTitle }}
        </p>
        <p class="search-grid__text">
          {{ item.viewCount }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import './SearchGrid.scss';
export default {
  props: {
    typeClass: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cards: [
        {
          id: 0,
          title:
            'Как кормить кошку натуралкой | Перечень полезных для кошек продуктов и советы по составлению рациона',
          text: 'Ветеринария и Кормление собак и кошек',
          views: '786 тыс. просмотров',
        },
      ],
    };
  },
  computed: {
    video() {
      return this.$store.getters.getVideo;
    },
  },
};
</script>
