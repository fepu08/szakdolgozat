import { SyntheticEvent, useState } from 'react';
import FormContainer from '../../components/FormContainer';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import useRedirectIfAuthenticated from '../../hooks/useRedirectIfAuthenticated';
import { useAsyncOperation } from '../../hooks/useAsyncOperation';
import { useAppContext } from '../../app/context/AppContext';

const RegisterScreen = () => {
  useRedirectIfAuthenticated();
  const { register } = useAppContext();
  const { execute, loading } = useAsyncOperation<void>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    execute(() => register({ name, email, password }));
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>
            Email Address
            <span className='required-asterisk'>*</span>
          </Form.Label>
          <Form.Control
            required
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>
            Password
            <span className='required-asterisk'>*</span>
          </Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>
            Confirm Password<span className='required-asterisk'>*</span>{' '}
          </Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Enter password again'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </Form.Group>

        <Button
          type='submit'
          variant='primary'
          className='mt-2'
          disabled={loading}
        >
          Sign Up
        </Button>
        {loading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account?&nbsp;
          <Link to={'/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
