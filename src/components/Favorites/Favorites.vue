<template>
  <div class="favorites">
    <div class="container">
      <div class="favorites-form">
        <h2 class="favorites-form__title">
          Избранное
        </h2>
        <ul class="favorites-form__requests">
          <li
            class="favorites-form__request"
            v-for="item in favorites"
            :key="item.id"
          >
            <router-link to="/" class="favorites-form__link">
              <p class="favorites-form__text" @click="onSearch(item)">
                {{ item.request }}
              </p>
            </router-link>
            <div class="favorites-form__group">
              <button
                class="favorites-form__btn favorites-form__btn_edit"
                @click="
                  onEdit(
                    item.id,
                    item.request,
                    item.name,
                    item.sort,
                    item.range
                  )
                "
              >
                Изменить
              </button>
              <button
                class="favorites-form__btn favorites-form__btn_delete"
                @click="onDelete(item.id)"
              >
                Удалить
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import './Favorites.scss';
export default {
  created() {
    this.$store.dispatch('setFavorites');
    this.$store.dispatch('setClearSearchParams');
    this.$store.dispatch('setClearActiveHeart');
  },
  computed: {
    favorites() {
      return this.$store.getters.getFavorites != null
        ? this.$store.getters.getFavorites
        : [];
    },
    modalActive() {
      return this.$store.getters.getModalActive;
    },
  },
  methods: {
    onEdit(id, request, name, sort, range) {
      let obj = {
        id,
        request,
        name,
        sort,
        range,
        title: 'Изменить запрос',
        disabled: false,
        btn_1: 'Не изменять',
        btn_2: 'Изменить',
        store: 'updateFavorites',
        to: '/favorites',
        activeHeart: false,
      };
      this.$store.dispatch('setModalActive', true);
      this.$store.dispatch('setModal', obj);

      this.$router.push('/saveRequest');
    },
    onDelete(id) {
      this.$store.dispatch('deleteFavorites', id);
    },
    onSearch(item) {
      this.$store.dispatch('setSearchParams', item);
    },
  },
};
</script>
