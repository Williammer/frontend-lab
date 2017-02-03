import { Component } from 'react';
import PageBase from '../components/PageBase';
import Welcome from '../components/Welcome';

export default class extends Component {
  render() {
    return (
        <PageBase Comp={Welcome} />
    );
  }
}