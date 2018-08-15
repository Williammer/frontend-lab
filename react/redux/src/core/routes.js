import StopWatch from '../features/stopWatch/StopWatch';
import FormSample from '../features/formSample/FormSample';
import RepoList from '../features/githubUserList/GithubUserList';
import TypeWriterDemo from '../features/typeWriter/TypeWriterDemo';
import TicTacToe from '../features/ticTacToe/TicTacToe';
import Collapsible from '../features/collapsible/Collapsible';
import Draggable from '../features/draggable/Draggable';
import CounterList from '../features/counters/CounterList';

const rootPath = '/frontend-lab/';

const routes = [
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
    path: `${rootPath}draggable`,
    title: 'Draggable',
    component: Draggable,
  },
  {
    path: `${rootPath}counterList`,
    title: 'CounterList',
    component: CounterList,
  },
];

export default routes;
