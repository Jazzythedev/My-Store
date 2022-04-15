import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {                       //children passed that are text boxes rtc.
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}                               {/*  children bound here */}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer 