import React from 'react';
import ReactDOM from 'react-dom';
import Label from '../Label';

it('renders Label without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Label />, div);
});
