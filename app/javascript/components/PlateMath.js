import React from "react"
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'


export default class PlateMath extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attributes: {
        bbWeight: 0,
        fiftyFives: 0,
        fortyFives: 0,
        thirtyFives: 0,
        twentyFives: 0,
        fifteens: 0,
        tens: 0,
        fives: 0,
        twoPointFives: 0,
      },
      submit: false,
    }
  }

  handleChange = event => {
    const { attributes } = this.state
    attributes[event.target.name] = event.target.value
    this.setState({ attributes })
  }

  handleSubmit = () => {
    this.setState({ submit: !this.state.submit })
  }

  handleClearForm = () => {
    this.setState({
      attributes: {
        bbWeight: '',
        fiftyFives: '',
        fortyFives: '',
        thirtyFives: '',
        twentyFives: '',
        fifteens: '',
        tens: '',
        fives: '',
        twoPointFives: ''
      },
      submit: false
    })
  }

  handleTotalWeight = () => {
    const { bbWeight, fiftyFives, fortyFives, thirtyFives, twentyFives, fifteens, tens, fives, twoPointFives } = this.state.attributes
    let barbell
    if (bbWeight === '45') {
      barbell = 45
    } else if (bbWeight === '35') {
      barbell = 35
    } else if (bbWeight === '15') {
      barbell = 15
    }
    let totalPounds =
      barbell +
      (parseInt(fiftyFives) * 110) +
      (parseInt(fortyFives) * 90) +
      (parseInt(thirtyFives) * 70) +
      (parseInt(twentyFives) * 50) +
      (parseInt(fifteens) * 30) +
      (parseInt(tens) * 20) +
      (parseInt(fives) * 10) +
      (parseInt(twoPointFives) * 5)
    let totalKilos =
      (barbell / 2.2) +
      (parseInt(fiftyFives) * 50) +
      (parseInt(fortyFives) * 41) +
      (parseInt(thirtyFives) * 32) +
      (parseInt(twentyFives) * 22) +
      (parseInt(fifteens) * 14) +
      (parseInt(tens) * 9) +
      (Math.ceil(parseInt(fives) * 4.6)) +
      (Math.ceil(parseInt(twoPointFives) * 2.2))

    return (
      <Container>
        <Row>
          <Col sm={{ size: 'auto', offset: 2 }} className="improveVisibility">
            <h3>Total Weight in lbs:</h3>
            <hr />
            <h5 className="needsCentering">{ totalPounds }</h5>
          </Col>
          <Col sm={{ size: 'auto', offset: 3 }} className="improveVisibility">
            <h3>Total Weight in kgs:</h3>
            <hr />
            <h5 className="needsCentering">{ totalKilos }</h5>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm="12" md={{ size: 6, offset: 6 }}>
            <Button color="danger" onClick={ this.handleClearForm }>Reset</Button>
          </Col>
        </Row>
      </Container>
    )
  }

  render () {
    const { bbWeight, fiftyFives, fortyFives, thirtyFives, twentyFives, fifteens, tens, fives, twoPointFives } = this.state.attributes
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 4 }}>
              <h3>How to Use:</h3>
            </Col>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <ol>
                <li>Look at <em>ONE SIDE</em> of your barbell</li>
                <li>Count the number of each plate per weight (e.g. 2 x 45, 2 x 10)</li>
                <li>Fill in the form below with your numbers and click 'Submit'</li>
                <li>Receive the total weight on your barbell</li>
              </ol>
            </Col>
          </Row>
        </Container>
          <br />
          <hr />
          <br />
          {!this.state.submit &&
            <Container>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <Form>
                    <FormGroup>
                      <Label for="bbWeight">Barbell Weight</Label>
                      <Input type="select" name="bbWeight" onChange={ this.handleChange }>
                        <option value={ bbWeight }>Select...</option>
                        <option value="45">45 lbs/ 20.5 kgs</option>
                        <option value="35">35 lbs/ 16 kgs</option>
                        <option value="15">15 lbs/ 7 kgs</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="fiftyFives">Number of 55 lb/ 25 kg plates:</Label>
                      <Input 
                        type="number"
                        name="fiftyFives"
                        value={ fiftyFives }
                        onChange={ this.handleChange }
                      />  
                    </FormGroup>
                    <FormGroup>
                      <Label for="fortyFives">Number of 45 lb/ 20.5 kg plates:</Label>
                      <Input 
                        type="number"
                        name="fortyFives"
                        value={ fortyFives }
                        onChange={ this.handleChange }
                      />  
                    </FormGroup>
                    <FormGroup>
                      <Label for="thirtyFives">Number of 35 lb/ 16 kg plates:</Label>
                      <Input 
                        type="number"
                        name="thirtyFives"
                        value={ thirtyFives }
                        onChange={ this.handleChange }
                      />  
                    </FormGroup>
                    <FormGroup>
                      <Label for="twentyFives">Number of 25 lb/ 11 kg plates:</Label>
                      <Input 
                        type="number"
                        name="twentyFives"
                        value={ twentyFives }
                        onChange={ this.handleChange }
                      />  
                    </FormGroup>
                    <FormGroup>
                      <Label for="fifteens">Number of 15 lb/ 7 kg plates:</Label>
                      <Input 
                        type="number"
                        name="fifteens"
                        value={ fifteens }
                        onChange={ this.handleChange }
                      />  
                    </FormGroup>
                    <FormGroup>
                      <Label for="tens">Number of 10 lb/ 4.5 kg plates:</Label>
                      <Input 
                        type="number"
                        name="tens"
                        value={ tens }
                        onChange={ this.handleChange }
                      />  
                    </FormGroup>
                    <FormGroup>
                      <Label for="fives">Number of 5 lb/ 2.3 kg plates:</Label>
                      <Input 
                        type="number"
                        name="fives"
                        value={ fives }
                        onChange={ this.handleChange }
                      />  
                    </FormGroup>
                    <FormGroup>
                      <Label for="twoPointFives">Number of 2.5 lb/ 1.1 kg plates</Label>
                      <Input 
                        type="number"
                        name="twoPointFives"
                        value={ twoPointFives }
                        onChange={ this.handleChange }
                      />  
                    </FormGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" onClick={ this.handleSubmit }>Submit</Button>
                      </Col>
                      <Col xs="6">
                        <Button color="secondary" onClick={ this.handleClearForm }>Clear</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Container>
          }
          {this.state.submit &&
            this.handleTotalWeight()
          }
      </React.Fragment>
    );
  }
}
