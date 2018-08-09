import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';
import renderer from 'react-test-renderer';

it('renders Button without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button />, div);
});

it('render correctly', () => {
  const clickHandler = () => {};
  const button = renderer
    .create(<Button text="dumb button" onClick={clickHandler} />)
    .toJSON();

  expect(button).toMatchSnapshot();
});
