import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppContext } from '../app/context/AppContext';
import { useAsyncOperation } from '../hooks/useAsyncOperation';

const Header = () => {
  const { appState, logout } = useAppContext();
  const { execute, loading } = useAsyncOperation<void>();

  const onLogout = async () => {
    execute(() => logout());
  };

  return (
    <header className='pb-3'>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container fluid className='px-5'>
          <LinkContainer to='/'>
            <Navbar.Brand>Movie Recommender</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav style={{ marginLeft: 'auto' }}>
              {appState.user ? (
                <Button onClick={onLogout} disabled={loading}>
                  Log Out
                </Button>
              ) : (
                <>
                  <Button variant={'outline-primary'}>
                    <LinkContainer to='/login'>
                      <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                  </Button>
                  <Button variant={'outline-success'}>
                    <LinkContainer to='/register'>
                      <Nav.Link>Register</Nav.Link>
                    </LinkContainer>
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
