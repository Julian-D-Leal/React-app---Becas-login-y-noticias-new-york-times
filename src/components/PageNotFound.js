import {Container, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <Container>
      <Row className='mt-5'>
        <Col md={{span:6}} className='text-center'>
          <img 
            style={{ width: '100%', height: '100%' }}
            src="/img/404-not-found.svg"
            alt="error-404"
          />
          <h2>¿Te has perdido?</h2>
          <p>
            <Link to={'/'}>Regresa al inicio</Link>
          </p>
        </Col>
        
      </Row>
    </Container>
  )
}
