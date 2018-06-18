import { Component } from 'react';
import PageBase from '../components/PageBase';
import StopWatch from '../components/StopWatch';

export default class extends Component {
  render() {
    return (
        <PageBase Comp={StopWatch} />
    );
  }
}