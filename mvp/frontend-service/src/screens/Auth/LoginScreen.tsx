import { Button, Col, Form, Row } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { Link } from 'react-router-dom';
import { SyntheticEvent, useState } from 'react';
import Loader from '../../components/Loader';
import { useAppContext } from '../../app/context/AppContext';
import useRedirectIfAuthenticated from '../../hooks/useRedirectIfAuthenticated';

const LoginScreen = () => {
  useRedirectIfAuthenticated();
  const { login } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
    } catch (error) {
      console.log('Login failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label className="label-left-align">
            Email Address
            <span className="required-asterisk">*</span>
          </Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>
            Password
            <span className="required-asterisk">*</span>
          </Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={loading}
        >
          Sign In
        </Button>
        {loading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New user?&nbsp;
          <Link to={'/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
