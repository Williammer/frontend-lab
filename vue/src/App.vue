<template>
  <div id="app">
    <router-link to="/"><img width="100" src="./assets/logo.png"></router-link>
    <ul class="nav-router">
        <li><router-link to="/dataFetchList">DataFetchList</router-link></li>
        <li><router-link to="/typeWriter">TypeWriter</router-link></li>
        <li><router-link to="/shortkey">ShortKey</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

.nav-router {
  width: 100%;
  background: #555;
  margin: 0;
  padding: 14px 0;
}

.nav-router > li {
  color: #FFF;
  list-style: none;
  display: inline-block;
  margin-right: 20px;
}

.nav-router > li > a {
  color: #FFF;
  text-decoration: none;
}

.nav-router > li > a.router-link-active {
  border-bottom: 1px solid;
}
</style>
