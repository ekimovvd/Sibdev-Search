<template>
  <form class="form" @submit.prevent="login">
    <div class="form__logo">
      <img
        src="../../assets/img/logo.png"
        alt="sibdev-logo"
        class="form__img"
      />
      <h3 class="form__title">
        Вход
      </h3>
    </div>
    <div class="form__group">
      <label for="" class="form__label">
        Логин
      </label>
      <input type="text" class="form__input" v-model="email" />
    </div>
    <div class="form__group">
      <label for="" class="form__label">
        Пароль
      </label>
      <input :type="type" class="form__input" v-model="password" />
      <i
        class="bx bx-show form__icon"
        v-if="eyeActive === 'show'"
        @click="eye('hide', 'password')"
      ></i>
      <i
        class="bx bx-hide form__icon"
        v-if="eyeActive === 'hide'"
        @click="eye('show', 'text')"
      ></i>
    </div>
    <Button :btn="btn" />
  </form>
</template>

<script>
import './Form.scss';
import Button from '../Button/Button.vue';
export default {
  name: 'Form',
  components: {
    Button,
  },
  data() {
    return {
      eyeActive: 'hide',
      type: 'password',
      btn: {
        title: 'Войти',
        class: 'form__btn btn',
      },
      email: 'ekimov_vd@mail.ru',
      password: '12345678',
    };
  },
  methods: {
    eye(eye, type) {
      this.eyeActive = eye;
      this.type = type;
    },
    login() {
      const user = {
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch('setLoginUser', user);
    },
  },
};
</script>
