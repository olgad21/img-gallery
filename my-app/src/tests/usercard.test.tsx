import React from 'react';
import { render, screen } from '@testing-library/react';
import UserCard from '../routes/form/usercard.component';
import { users } from '../constants';

test('renders usercard', () => {
  render(<UserCard user = {users[0]}/>);
  const card = screen.getByTestId('formcard');
  expect(card).toBeDefined();
});