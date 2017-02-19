import Vue from 'vue';
import Router from 'vue-router';
import Hello from 'components/Hello';
import DataFetchList from 'components/DataFetchList';
import TypeWriter from 'components/TypeWriter';
import ShortKey from 'components/ShortKey';

Vue.use(Router);
Vue.use(require('vue-shortkey'));

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/shortKey',
      name: 'ShortKey',
      component: ShortKey,
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
