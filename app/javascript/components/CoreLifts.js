import React from "react"
import { Button, Input, Container, Row, Col } from 'reactstrap'
import '../../assets/stylesheets/core_lifts.scss'

export default class CoreLifts extends React.Component {
  constructor(props) {
    super(props)
    const { value } = this.props
    this.state = {
      editable: false,
      attributes: {
        back_squat: value.back_squat,
        front_squat: value.front_squat,
        deadlift: value.deadlift,
        bench_press: value.bench_press,
        strict_press: value.strict_press
      }
    }
  }

  toggle = () => {
    this.setState({
      editable: !this.state.editable
    })
  }

  handleChange = event => {
    const { attributes } = this.state  
    attributes[event.target.name] = event.target.value
    this.setState({ attributes })
  }

  handleUpdate = () => {
    const { attributes } = this.state
    let userId = this.props.currentUser.id
    let id = this.props.value.id

    fetch(`/users/${userId}/core_lifts/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify(attributes),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(resp => {
      resp.json()
    })
    .then(data => {
      console.log(`Successful ${data}`)
    })
    this.toggle()
  }

  render () {
    const { attributes, editable } = this.state
    return (
      <React.Fragment>
        {!editable &&
          <Container>
            <Button color="primary" onClick={ this.toggle } id="updateButton">Update</Button>
              <Row>
                <Col xs="6" sm="4">Back Squat: { attributes.back_squat }</Col>
                <Col xs="6" sm="4">Front Squat: { attributes.front_squat }</Col>
                <Col xs="6" sm="4">Deadlift: { attributes.deadlift }</Col>
              </Row>
              <br />
              <Row>
                <Col sm={{ size: 'auto', offset: 2 }}>Bench Press: { attributes.bench_press }</Col>
                <Col sm={{ size: 'auto', offset: 2 }}>Strict Press: { attributes.strict_press }</Col>
              </Row>
          </Container>
        }
        {editable &&
          <Container>
            <Row>
              <Col xs="6" sm="4">
                Back Squat:
                <Input type="text" name="back_squat" onChange={ this.handleChange } placeholder={ attributes.back_squat } />
              </Col>
              <Col xs="6" sm="4">
                Front Squat:
                <Input type="text" name="front_squat" onChange={ this.handleChange } placeholder={ attributes.front_squat } />
              </Col>
              <Col xs="6" sm="4">
                Deadlift:
                <Input type="text" name="deadlift" onChange={ this.handleChange } placeholder={ attributes.deadlift } />
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={{ size: 'auto', offset: 1 }}>
                Bench Press:
                <Input type="text" name="bench_press" onChange={ this.handleChange } placeholder={ attributes.bench_press } />
              </Col>
              <Col sm={{ size: 'auto', offset: 1 }}>
                Strict Press:
                <Input type="text" name="strict_press" onChange={ this.handleChange } placeholder={ attributes.strict_press } />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Button color="primary" onClick={ this.handleUpdate } id="saveButton">Save</Button>
              </Col>
              <Col>
                <Button color="secondary" onClick={this.toggle} id="cancelButton">Cancel</Button>
              </Col>
            </Row>
          </Container>
        }
      </React.Fragment>
    )
  }
}
