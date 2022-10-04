import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../components/card/card.component';

const monsters = [{
  id: 'string',
  name: 'string',
  website: 'string',
  email: 'string',
  username: 'string',
}];

test('renders card', () => {
  render(<Card monster = {monsters[0]}/>);
  const card = screen.getByTestId('card');
  expect(card).toBeDefined();
});