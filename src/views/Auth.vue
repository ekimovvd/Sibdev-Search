<template>
  <div class="auth">
    <div class="container">
      <Form />
    </div>
  </div>
</template>

<script>
import Form from '../components/Form/Form.vue';
export default {
  name: 'Auth',
  components: {
    Form,
  },
};
</script>
