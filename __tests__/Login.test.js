import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../src/screens/login/Login';

describe('Login', () => {
  test('renders email and password input fields', () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  test('updates email and password values on input change', () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@gmail.com');
    fireEvent.changeText(passwordInput, 'Test@123');

    expect(emailInput.props.value).toBe('test@gmail.com');
    expect(passwordInput.props.value).toBe('Test@123');
  });

  test('calls handleLogin function on login button press', () => {
    const { getByText } = render(<Login />);
    const loginButton = getByText('LOGIN');

    const handleLoginMock = jest.fn();
    Login.handleLogin = handleLoginMock;

    fireEvent.press(loginButton);

    expect(handleLoginMock).toHaveBeenCalled();
  });
});
