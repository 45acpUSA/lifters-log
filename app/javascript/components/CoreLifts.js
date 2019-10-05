import React from "react"
import { Button, Input, Container, Row, Col } from 'reactstrap'
import '../../assets/stylesheets/core_lifts.scss'

export default class CoreLifts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: false,
    }
  }

  toggle = () => {
    this.setState({
      editable: !this.state.editable
    })
  }

  coreLiftsDisplay = () => {
    const { coreLifts } = this.props
    return coreLifts.map(value => {
      if (this.state.editable === false ) {
        return (
          <Container>
            <Button color="primary" onClick={ this.toggle } id="updateButton">Update</Button>
              <Row>
                <Col xs="6" sm="4">Back Squat: { value.back_squat }</Col>
                <Col xs="6" sm="4">Front Squat: { value.front_squat }</Col>
                <Col xs="6" sm="4">Deadlift: { value.deadlift }</Col>
              </Row>
              <br />
              <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>Bench Press: { value.bench_press }</Col>
                <Col sm={{ size: 'auto', offset: 1 }}>Strict Press: { value.strict_press }</Col>
              </Row>
          </Container>
        )
      } else {
        return (
          <Container>
            <Row>
              <Col xs="6" sm="4">
                Back Squat: <Input type="text" name="back_squat" placeholder={value.back_squat} />
              </Col>
              <Col xs="6" sm="4">
                Front Squat: <Input type="text" name="front_squat" placeholder={value.front_squat} />
              </Col>
              <Col xs="6" sm="4">
                Deadlift: <Input type="text" name="deadlift" placeholder={value.deadlift} />
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={{ size: 'auto', offset: 1 }}>
                Bench Press: <Input type="text" name="bench_press" placeholder={value.bench_press} />
              </Col>
              <Col sm={{ size: 'auto', offset: 1 }}>
                Strict Press: <Input type="text" name="strict_press" placeholder={value.strict_press} />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Button color="primary" type="submit" id="saveButton">Save</Button>
              </Col>
              <Col>
                <Button color="secondary" onClick={this.toggle} id="cancelButton">Cancel</Button>
              </Col>
            </Row>
          </Container>
        )
      }
    })
  }

  render () {
    return (
      <React.Fragment>
        {this.coreLiftsDisplay()}
      </React.Fragment>
    )
  }
}
