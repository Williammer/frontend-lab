import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import App from './App';
import Welcome from './components/Welcome';
import StopWatch from './components/StopWatch';
import NameForm from './components/NameForm';
import RepoList from './components/DataFetchList';
import TypeWriter from './components/TypeWriter';
import './index.css'


const repoListContainer = React.createClass({
  render() {
    return <RepoList username="Williammer" />
  }
})

const typeWriterContainer = () => {
    const str = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices dolor ac dolor imperdiet ullamcorper. Suspendisse quam libero, luctus auctor mollis sed, malesuada condimentum magna. Quisque in ante tellus, in placerat est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec a mi magna, quis mattis dolor. Etiam sit amet ligula quis urna auctor imperdiet nec faucibus ante. Mauri';
    const speed = 20;
    // [Todo] how to handle these config inputs more nicely?
    return TypeWriter(str, speed);
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Welcome} />
	    <Route path="/repoList" component={repoListContainer} />
	    <Route path="/stopWatch" component={StopWatch} />
      <Route path="/nameForm" component={NameForm} />
	    <Route path="/typeWriter" component={typeWriterContainer} />
    </Route>
	</Router>,
  document.getElementById('root')
)
