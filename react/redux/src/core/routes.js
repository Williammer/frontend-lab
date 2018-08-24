import React from 'react';
import Loadable from 'react-loadable';
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading({ error, retry, timedOut }) {
  if (error || timedOut) {
    return (
      <div>
        Fail to load the module! <button onClick={retry}>Retry</button>
      </div>
    );
  }
  return <CircularProgress />;
}
const lazyload = path => {
  return Loadable({
    // webpack need to know at least some file path information to handle dynamic statements
    loader: () => import(`../features/${path}`),
    loading() {
      return <Loading />;
    },
    timeout: 6000,
  });
};

const Welcome = lazyload('welcome/Welcome');
const StopWatch = lazyload('stopWatch/StopWatch');
const FormSample = lazyload('formSample/FormSample');
const RepoList = lazyload('githubUserList/GithubUserList');
const TypeWriterDemo = lazyload('typeWriter/TypeWriterDemo');
const TicTacToe = lazyload('ticTacToe/TicTacToe');
const Collapsible = lazyload('collapsible/Collapsible');
const Treeview = lazyload('treeview/Treeview');
const CounterList = lazyload('counters/CounterList');

export const rootPath = '/frontend-lab/';

const routes = [
  {
    path: `${rootPath}`,
    title: 'Welcome',
    component: Welcome,
    soloLink: true,
  },
  {
    path: `${rootPath}repoList`,
    title: 'Repo list',
    component: RepoList,
  },
  {
    path: `${rootPath}stopWatch`,
    title: 'Stop watch',
    component: StopWatch,
  },
  {
    path: `${rootPath}form`,
    title: 'Form sample',
    component: FormSample,
  },
  {
    path: `${rootPath}typeWriter`,
    title: 'Type writer',
    component: TypeWriterDemo,
  },
  {
    path: `${rootPath}ticTacToe`,
    title: 'TicTacToe game',
    component: TicTacToe,
  },
  {
    path: `${rootPath}collapsible`,
    title: 'Collapsible',
    component: Collapsible,
  },
  {
    path: `${rootPath}treeview`,
    title: 'Treeview',
    component: Treeview,
  },
  {
    path: `${rootPath}counterList`,
    title: 'CounterList',
    component: CounterList,
  },
];

export default routes;
