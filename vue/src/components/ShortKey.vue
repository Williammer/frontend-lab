<template>
  <div class="shortKey">
    <h1>{{ msg }}</h1>
    <button v-shortkey="['ctrl', 'o']" @shortkey="theAction()">Open</button>
  </div>
</template>

<script>

export default {
  name: 'shortKey',
  data() {
    return {
      msg: 'ctrl+o',
    };
  },
  methods: {
    theAction() {
      console.log('theAction called.');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
