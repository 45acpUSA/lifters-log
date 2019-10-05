import React from "react"
import { Button, Input, Container, Row, Col } from 'reactstrap'
import '../../assets/stylesheets/olympic_lifts.scss'

export default class OlympicLifts extends React.Component {
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

  olyLiftsDisplay = () => {
    const { olyLifts } = this.props
    return olyLifts.map(value => {
      if (this.state.editable === false ) {
        return (
          <Container>
            <Button color="primary" onClick={ this.toggle } id="updateButton">Update</Button>
              <Row>
                <Col xs="6">Clean & Jerk: { value.clean_and_jerk }</Col>
                <Col xs="6" sm="4">Snatch: { value.snatch }</Col>
              </Row>
              <br />
              <Row>
                <Col>Clean: { value.clean }</Col>
                <Col>Jerk: { value.jerk }</Col>
              </Row>
              <br />
              <Row>
                <Col>Power Clean: { value.power_clean }</Col>
                <Col>Power Jerk: { value.power_jerk }</Col>
                <Col></Col>
                <Col>Power Snatch: { value.power_snatch }</Col>
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
        {this.olyLiftsDisplay()}
      </React.Fragment>
    );
  }
}
