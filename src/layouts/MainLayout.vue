<template>
  <div class="main-layout">
    <Navbar :navbar="navbar" />
    <router-view />
  </div>
</template>

<script>
import Navbar from '../components/Navbar/Navbar.vue';
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      navbar: [
        {
          id: '0',
          title: 'Поиск',
          link: '/',
        },
        {
          id: '1',
          title: 'Избранное',
          link: '/favorites',
        },
        {
          id: '2',
          title: 'Выйти',
          link: '/auth',
        },
      ],
    };
  },
};
</script>
