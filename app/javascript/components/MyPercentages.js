import React from "react"
import { Container, Row, Col, FormGroup, Input, Label, Table } from 'reactstrap'
import '../../assets/stylesheets/MyPercentages.scss'

export default class MyPercentages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coreLifts: [],
      olyLifts: [],
      allLifts: [],
      
    }
  }

  componentDidMount = () => {
    Promise.all([fetch(`/users/:user_id/core_lifts.json`), fetch(`/users/:user_id/olympic_lifts.json`)])
    .then(([response1, response2]) => {
      return Promise.all([response1.json(), response2.json()])
    })
    .then(([data1, data2]) => {
      let allLifts = data1.concat(data2)
      this.setState({
        coreLifts: data1,
        olyLifts: data2,
        allLifts: allLifts,
        corePercentagesOf: 0,
        olyPercentagesOf: 0,
      })
    })
  }

  handleCoreLiftName = string => {
    return eval(string)
  }

  handleCoreLiftSelector = event => {
    let core = this.state.coreLifts[0]
    let lift
    let weight
    let str = JSON.stringify(event.target.value)
    if (/select/i.test(str) === false) {
      lift = event.target.value
      console.log(`${lift}: ${core[event.target.value]}`)
      weight = core[event.target.value]
      this.setState({ corePercentagesOf: weight })
    }
  }

  handleOlyLiftSelector = event => {
    let oly = this.state.olyLifts[0]
    let lift
    let weight
    let str = JSON.stringify(event.target.value)
    if (/select/i.test(str) === false) {
      lift = event.target.value
      console.log(`${lift}: ${oly[event.target.value]}`)
      weight = oly[event.target.value]
      this.setState({ olyPercentagesOf: weight })
    }
  }

  handleCorePercentagesDisplay = () => {
    const { corePercentagesOf } = this.state
    let tData = []
    for (let i=5; i<=100; i+=5) {
      let percent = `${i}%`
      let weight = `${Math.ceil(corePercentagesOf * (i/100))} lbs.`
      tData.push(percent)
      tData.push(weight)
    }
    return tData.map((value, index) => {
      if (index % 2 === 0) {
        return (
          <tr key={ index }>
            <td>{ value }</td>
            <td>{ tData[index+1] }</td>
          </tr>
        )
      }
    })
  }

  handleOlyPercentagesDisplay = () => {
    const { olyPercentagesOf } = this.state
    let tData = []
    for (let i=5; i<=100; i+=5) {
      let percent = `${i}%`
      let weight = `${Math.ceil(olyPercentagesOf * (i/100))} lbs.`
      tData.push(percent)
      tData.push(weight)
    }
    return tData.map((value, index) => {
      if (index % 2 === 0) {
        return (
          <tr key={ index }>
            <td>{ value }</td>
            <td>{ tData[index+1] }</td>
          </tr>
        )
      }
    })
  }

  render () {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs="6">
              <FormGroup>
                <Label for="coreLift">Core Lifts</Label>
                <Input 
                  type="select" 
                  name="coreLifts"
                  onChange={ this.handleCoreLiftSelector }
                >
                  <option>Select...</option>
                  <option value="back_squat">Back Squat</option>
                  <option value="front_squat">Front Squat</option>
                  <option value="deadlift">Deadlift</option>
                  <option value="bench_press">Bench Press</option>
                  <option value="strict_press">Strict Press</option>
                </Input>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label for="olyLift">Olympic Lifts</Label>
                <Input 
                  type="select" 
                  name="olyLift"
                  onChange={ this.handleOlyLiftSelector }
                >
                  <option>Select...</option>
                  <option value="clean_and_jerk">Clean & Jerk</option>
                  <option value="snatch">Snatch</option>
                  <option value="clean">Clean</option>
                  <option value="jerk">Jerk</option>
                  <option value="power_clean">Power Clean</option>
                  <option value="power_jerk">Power Jerk</option>
                  <option value="power_snatch">Power Snatch</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Container>
        <br />
        <hr />
        <br />
        <Container>
          <Row>
            {(this.state.corePercentagesOf > 0) &&
              <Col xs="6">
                <Table>
                  <tbody>
                    <tr>
                      <th>Percentage</th>
                      <th>Weight (in lbs.)</th>
                    </tr>
                    { this.handleCorePercentagesDisplay() }
                  </tbody>
                </Table>
              </Col>
            }
            {(this.state.olyPercentagesOf > 0) &&
              <Col xs="6">
                <Table>
                  <tbody>
                    <tr>
                      <th>Percentage</th>
                      <th>Weight (in lbs.)</th>
                    </tr>
                    { this.handleOlyPercentagesDisplay() }
                  </tbody>
                </Table>
              </Col>
            }
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
