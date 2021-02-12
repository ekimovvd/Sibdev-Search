<template>
  <div class="navbar">
    <div class="container">
      <div class="nav">
        <div class="nav__logo">
          <img src="../../assets/img/logo.png" alt="" class="nav__img" />
        </div>
        <ul class="nav__menu">
          <li class="nav__item" v-for="item in navbar" :key="item.id">
            <router-link
              :to="item.link"
              class="nav__link"
              v-if="item.id != navbar.length - 1"
            >
              {{ item.title }}
            </router-link>
          </li>
        </ul>
        <router-link :to="navbar[navbar.length - 1].link" class="nav__logout">
          <p class="nav__text" @click="logout">
            {{ navbar[navbar.length - 1].title }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import './Navbar.scss';
export default {
  props: {
    navbar: {
      type: Array,
      required: true,
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('setLogout');
    },
  },
};
</script>
