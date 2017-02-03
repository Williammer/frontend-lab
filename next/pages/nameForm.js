import { Component } from 'react';
import PageBase from '../components/PageBase';
import NameForm from '../components/NameForm';

export default class extends Component {
  render() {
    return (
        <PageBase Comp={NameForm} />
    );
  }
}