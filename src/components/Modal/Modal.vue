<template>
  <div class="modal-window">
    <form class="modal" @submit.prevent="">
      <h3 class="modal__title">
        {{ title }}
      </h3>
      <div class="modal__group">
        <label for="" class="modal__label">
          Запрос
        </label>
        <input
          type="text"
          class="modal__input"
          v-model="request"
          :disabled="disabled"
        />
      </div>
      <div class="modal__group">
        <label for="" class="modal__label">
          <span class="modal__star">*</span> Название
        </label>
        <input
          type="text"
          class="modal__input"
          v-model="name"
          placeholder="Укажите название"
        />
      </div>
      <div class="modal__group">
        <label for="" class="modal__label">
          Сортировать по длительности
        </label>
        <div class="modal__box">
          <select class="modal__select" v-model="sort">
            <option value="any">По умолчанию</option>
            <option value="long">Более 20 минут</option>
            <option value="medium">От 4 до 20 минут</option>
            <option value="short">Менее 4 минут</option>
          </select>
        </div>
      </div>
      <div class="modal__group modal__group_last">
        <label for="" class="modal__label">
          Максимальное количество
        </label>
        <div class="modal__slider">
          <input
            type="range"
            class="modal__input"
            min="0"
            max="50"
            v-model="range"
          />
          <input type="text" v-model="range" class="modal__value" />
        </div>
      </div>
      <div class="modal__submit">
        <button class="modal__btn modal__btn_cancel btn" @click="onCancel">
          {{ btn_1 }}
        </button>
        <button class="modal__btn modal__btn_save btn" @click="onSave">
          {{ btn_2 }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import './Modal.scss';
export default {
  created() {
    const {
      id,
      request,
      name,
      sort,
      range,
      title,
      disabled,
      btn_1,
      btn_2,
      store,
      to,
      activeHeart,
    } = this.$store.getters.getModal;
    this.id = id;
    this.request = request;
    this.name = name;
    this.sort = sort;
    this.range = range;
    this.title = title;
    this.disabled = disabled;
    this.btn_1 = btn_1;
    this.btn_2 = btn_2;
    this.store = store;
    this.to = to;
    this.activeHeart = activeHeart;
  },
  data() {
    return {
      id: '',
      request: '',
      name: '',
      sort: '',
      range: 0,
      title: '',
      disabled: false,
      btn_1: '',
      btn_2: '',
      store: '',
      to: '',
      activeHeart: false,
    };
  },
  methods: {
    onCancel() {
      this.$store.dispatch('setModalActive', false);
      this.$router.push(this.to);
    },
    onSave() {
      const data = {
        id: this.id,
        request: this.request,
        name: this.name,
        sort: this.sort,
        range: this.range,
      };

      this.$store.dispatch(this.store, data);
      this.$store.dispatch('setActiveHeart', this.activeHeart);
      this.$store.dispatch('setModalActive', false);
      this.$router.push(this.to);
    },
  },
};
</script>
