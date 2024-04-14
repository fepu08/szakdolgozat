import { Container, Row, Col } from 'react-bootstrap';

type FormContainerProps = {
  children: JSX.Element | JSX.Element[];
};

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
