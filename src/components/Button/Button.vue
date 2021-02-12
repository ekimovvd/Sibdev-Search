<template>
  <button :class="btn.class" @click="click">
    {{ btn.title }}
  </button>
</template>

<script>
import './Button.scss';
export default {
  props: {
    btn: {
      type: Object,
      required: true,
    },
  },
  methods: {
    click() {
      this.$emit('click');
    },
  },
};
</script>
