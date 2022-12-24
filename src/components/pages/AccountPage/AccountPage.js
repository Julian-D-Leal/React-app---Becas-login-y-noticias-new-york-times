import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import { useSelector } from 'react-redux';

export default function AccountPage() {
    const state = useSelector((state) => state.auth);
  return (
    <Container>
      <Row className='mt-4'>
        <Col xs={12} className="text-center">
          <img 
          src="/img/male_avatar.svg"
          alt="profile"
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
          />
        </Col>
        <Col className='mt-4'>
          <Card style={{ maxWidth: '360px' }} className='mx-auto p-4'>
            <p className="text-sm-center text-left"><b>Name: </b>{state.user.username}</p>
            <p className="text-sm-center text-left"><b>Email: </b>{state.user.email}</p>
            <p className="text-sm-center text-left"><b>Role: </b>{state.user.is_admin? 'Admin' : 'User'}</p>
            <Button>
              Edit account
            </Button>
            <Button variant='warning' className='mt-1'>
              Change password
            </Button>
            <Button variant='danger' className='mt-3'>
              Delete account
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
