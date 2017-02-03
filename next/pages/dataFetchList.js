import { Component } from 'react';
import PageBase from '../components/PageBase';
import DataFetchList from '../components/DataFetchList';

function getUsername() {
  return 'Williammer';
}

function getWrappedDataFetchList() {
  return (
    <DataFetchList username={getUsername()} />
  );
}

export default class extends Component {
  render() {
    return (
      <PageBase Comp={getWrappedDataFetchList} />
    );
  }
}
