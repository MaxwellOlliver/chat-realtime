import React, { useState, useContext } from 'react';
import * as Yup from 'yup';

import { Container, Form } from './styles';
import api from '../../services/api';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { ThemeContext } from '../../context/ThemeContext';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [disable, setDisable] = useState(true);

  const { selectedTheme } = useContext<any>(ThemeContext);

  let timeout: any;

  async function handleSubmit(e: Event) {
    e.preventDefault();

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(8).required(),
      confirmPassword: Yup.string()
        .min(8)
        .required()
        .oneOf([Yup.ref('password')]),
    });

    if (!(await schema.isValid({ name, email, password, confirmPassword }))) {
      if (email.length === 0 && password.length === 0) {
        setError('You forgot to fill in all the fields, sir!');
        setShowError(true);
      } else if (email.length === 0) {
        setError("Don't forget your email!");
        setShowError(true);
      } else if (password.length === 0) {
        setError('Hey, dummy, you forgot to type your password.');
        setShowError(true);
      } else if (password.length < 8) {
        setError('Password too short...');
        setShowError(true);
      } else if (password !== confirmPassword) {
        setError('Passwords does not match.');
        setShowError(true);
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => setShowError(false), 5000);

      return;
    }

    // try {
    //   const response = await api.post('/session', { email, password });
    // } catch (error) {
    //   setError('I think you typed something wrong.');
    //   setShowError(true);

    //   setTimeout(() => setShowError(false), 5000);
    // }
  }
  return (
    <Container theme={selectedTheme}>
      <ThemeSwitcher />
      <Form onSubmit={handleSubmit} theme={selectedTheme}>
        <h1>Sign Up</h1>
        <div>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onKeyDown={() =>
              password.length >= 8 ? setDisable(false) : setDisable(true)
            }
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={disable}
          />
          <span style={{ opacity: showError ? 100 : 0 }}>{error}</span>

          <button type="submit">Create account</button>
        </div>
      </Form>
    </Container>
  );
};

export default SignUp;
