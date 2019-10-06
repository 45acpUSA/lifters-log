import React from "react"
import { Button, Input, Container, Row, Col } from 'reactstrap'
import '../../assets/stylesheets/olympic_lifts.scss'

export default class OlympicLifts extends React.Component {
  constructor(props) {
    super(props)
    const { value } = this.props
    this.state = {
      editable: false,
      attributes: {
        clean_and_jerk: value.clean_and_jerk,
        clean: value.clean,
        power_clean: value.power_clean,
        jerk: value.jerk,
        power_jerk: value.power_jerk,
        snatch: value.snatch,
        power_snatch: value.power_snatch
      }
    }
  }

  toggle = () => {
    this.setState({
      editable: !this.state.editable
    })
  }

  handleChange = event =>{
    const { attributes } = this.state  
    attributes[event.target.name] = event.target.value
    this.setState({ attributes })
  }

  handleUpdate = () => {
    const { attributes } = this.state
    let userId = this.props.currentUser.id
    let id = this.props.value.id

    fetch(`/users/${userId}/olympic_lifts/${id}.json`, {
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
                <Col sm={{ size: 'auto', offset: 2 }}>Clean & Jerk: { attributes.clean_and_jerk } lbs.</Col>
                <Col sm={{ size: 'auto', offset: 2 }}>Snatch: { attributes.snatch } lbs.</Col>
              </Row>
              <br />
              <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>Clean: { attributes.clean } lbs.</Col>
                <Col sm={{ size: 'auto', offset: 1 }}>Jerk: { attributes.jerk } lbs.</Col>
              </Row>
              <br />
              <Row>
                <Col xs="6" sm="4">Power Clean: { attributes.power_clean } lbs.</Col>
                <Col xs="6" sm="4">Power Jerk: { attributes.power_jerk } lbs.</Col>
                <Col xs="6" sm="4">Power Snatch: { attributes.power_snatch } lbs.</Col>
              </Row>
          </Container>
        }
        {editable &&
          <Container>
              <Row>
                <Col xs="6">
                  Clean & Jerk:
                  <Input type="text" name="clean_and_jerk" onChange={ this.handleChange } placeholder={ attributes.clean_and_jerk } />
                  lbs.
                </Col>
                <Col xs="6" sm="4">
                  Snatch:
                  <Input type="text" name="snatch" onChange={ this.handleChange } placeholder={ attributes.snatch } />
                  lbs.
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  Clean:
                  <Input type="text" name="clean" onChange={ this.handleChange } placeholder={ attributes.clean } />
                  lbs.
                </Col>
                <Col>
                  Jerk:
                  <Input type="text" name="jerk" onChange={ this.handleChange } placeholder={ attributes.jerk } />
                  lbs.
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs="6" sm="4">
                  Power Clean:
                  <Input type="text" name="power_clean" onChange={ this.handleChange } placeholder={ attributes.power_clean } />
                  lbs.
                </Col>
                <Col xs="6" sm="4">
                  Power Jerk:
                  <Input type="text" name="power_jerk" onChange={ this.handleChange } placeholder={ attributes.power_jerk } />
                  lbs.
                </Col>
                <Col xs="6" sm="4">
                  Power Snatch:
                  <Input type="text" name="power_snatch" onChange={ this.handleChange } placeholder={ attributes.power_snatch } />
                  lbs.
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
    );
  }
}
