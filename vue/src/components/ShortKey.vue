<template>
  <div class="shortKey">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'shortKey',
  data() {
    return {
      msg: 'ShortKey',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
