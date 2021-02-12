<template>
  <div class="search-filter">
    <h4 class="search-flter__title">
      Видео по запросу <span>«{{ request }}»</span>
    </h4>
    <p class="search-filter__text">
      {{ countVideo }}
    </p>
    <div class="search-filter__switcher">
      <i
        class="bx bx-list-ul search-filter__icon search-filter__icon_list"
        :class="{'search-filter__icon_active': typeSwitcher === 'list'}"
        @click="switcher('list')"
      ></i>
      <i
        class="bx bx-grid-alt search-filter__icon search-filter__icon_grid"
        :class="{'search-filter__icon_active': typeSwitcher === 'grid'}"
        @click="switcher('grid')"
      ></i>
    </div>
  </div>
</template>

<script>
import './SearchFilter.scss';
export default {
  props: {
    typeSwitcher: {
      type: String,
      required: true,
    },
  },
  computed: {
    countVideo() {
      return Object.keys(this.$store.getters.getVideo).length > 0
        ? this.$store.getters.getVideo.countVideo
        : 0;
    },
    request() {
      return Object.keys(this.$store.getters.getVideo).length > 0
        ? this.$store.getters.getVideo.request
        : '';
    },
  },
  methods: {
    switcher(type) {
      this.$emit('typeSwitcherChanged', type);
    },
  },
};
</script>
