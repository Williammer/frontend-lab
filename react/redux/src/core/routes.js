import StopWatch from '../features/stopWatch/StopWatch';
import FormSample from '../features/formSample/FormSample';
import RepoList from '../features/githubUserList/GithubUserList';
import TypeWriter from '../features/typeWriter/TypeWriter';
import TicTacToe from '../features/ticTacToe/TicTacToe';
import Collapsible from '../features/collapsible/Collapsible';
import Draggable from '../features/draggable/Draggable';
import CounterList from '../features/counters/CounterList';

const TypeWriterDemo = () => {
  const str =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices dolor ac dolor imperdiet ullamcorper. Suspendisse quam libero, luctus auctor mollis sed, malesuada condimentum magna. Quisque in ante tellus, in placerat est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec a mi magna, quis mattis dolor. Etiam sit amet ligula quis urna auctor imperdiet nec faucibus ante. Mauri';
  const speed = 20;
  // [Todo] how to handle these config inputs more nicely?
  return TypeWriter(str, speed);
};

const routes = [
  {
    path: '/frontend-lab/repoList',
    title: 'Repo list',
    component: RepoList,
  },
  {
    path: '/frontend-lab/stopWatch',
    title: 'Stop watch',
    component: StopWatch,
  },
  {
    path: '/frontend-lab/form',
    title: 'Form sample',
    component: FormSample,
  },
  {
    path: '/frontend-lab/typeWriter',
    title: 'Type writer',
    component: TypeWriterDemo,
  },
  {
    path: '/frontend-lab/ticTacToe',
    title: 'TicTacToe game',
    component: TicTacToe,
  },
  {
    path: '/frontend-lab/collapsible',
    title: 'Collapsible',
    component: Collapsible,
  },
  {
    path: '/frontend-lab/draggable',
    title: 'Draggable',
    component: Draggable,
  },
  {
    path: '/frontend-lab/counterList',
    title: 'CounterList',
    component: CounterList,
  },
];

export default routes;
