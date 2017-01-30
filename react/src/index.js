import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import App from './App';
import Welcome from './components/Welcome';
import StopWatch from './components/StopWatch';
import NameForm from './components/NameForm';
import RepoList from './components/DataFetchList';
import './index.css'


const repoListContainer = React.createClass({
    render() {
        return <RepoList username="Williammer" />
    }
})

ReactDOM.render(
    <Router history={hashHistory}>
	    <Route path="/" component={App}>
	    	<IndexRoute component={Welcome} />
		    <Route path="/repoList" component={repoListContainer} />
		    <Route path="/stopWatch" component={StopWatch} />
		    <Route path="/nameForm" component={NameForm} />
	    </Route>
	</Router>,
    document.getElementById('root')
)
