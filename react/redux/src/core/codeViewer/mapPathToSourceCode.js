/* eslint-disable import/no-webpack-loader-syntax */
import { rootPath } from '../routes';
import welcomeCode from '!!raw-loader!../../features/welcome/Welcome';
import stopWatchCode from '!!raw-loader!../../features/stopWatch/StopWatch';
import formSampleCode from '!!raw-loader!../../features/formSample/FormSample';
import githubUserListCode from '!!raw-loader!../../features/githubUserList/GithubUserList';
import typeWriterCode from '!!raw-loader!../../features/typeWriter/TypeWriterDemo';
import ticTacToeCode from '!!raw-loader!../../features/ticTacToe/TicTacToe';
import collapsibleCode from '!!raw-loader!../../features/collapsible/Collapsible';
import treeviewCode from '!!raw-loader!../../features/treeview/Treeview';
import countersCode from '!!raw-loader!../../features/counters/CounterList';

const mapPathToSourceCode = {
  [rootPath]: welcomeCode,
  [`${rootPath}stopWatch`]: stopWatchCode,
  [`${rootPath}form`]: formSampleCode,
  [`${rootPath}repoList`]: githubUserListCode,
  [`${rootPath}typeWriter`]: typeWriterCode,
  [`${rootPath}ticTacToe`]: ticTacToeCode,
  [`${rootPath}collapsible`]: collapsibleCode,
  [`${rootPath}treeview`]: treeviewCode,
  [`${rootPath}counterList`]: countersCode,
};
export default mapPathToSourceCode;
