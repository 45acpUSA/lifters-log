import React from "react"
import { Container, Row, Col } from 'reactstrap'

export default class Footer extends React.Component {
  render () {
    const { styles } = this.props
    return (
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          width: "100%",
          height: styles.footerMenuHeight,
          backgroundColor: "#333",
          color: "#fff",
          position: "fixed",
          bottom: 0
        }}
      >
        <Container>
          <Row>
            <Col xs="6" style={{ textAlign: "left" }}>Au Standard Development</Col>
            <Col xs="6" style={{ textAlign: "right" }}>
              <a href={`mailto: mattauthedev@gmail.com`} target="_blank">Contact Me</a>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
