import Vue from 'vue';
import Router from 'vue-router';
import Hello from 'components/Hello';
import DataFetchList from 'components/DataFetchList';
import TypeWriter from 'components/TypeWriter';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/dataFetchList',
      name: 'DataFetchList',
      component: DataFetchList,
    },
    {
      path: '/typeWriter',
      name: 'TypeWriter',
      component: TypeWriter,
    },
  ],
});
