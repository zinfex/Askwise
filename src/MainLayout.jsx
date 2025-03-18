import React from 'react';
import Sidebar from './components/Admin/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';


const MainLayout = ({ children }) => {
  return (
    
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col xs={10} className="main-content">
            {children}
          </Col>
        </Row>
      </Container>

  );
};

export default MainLayout;
