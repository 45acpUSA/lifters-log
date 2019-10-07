import React from "react"
import { Button, Container, Row, Col, FormGroup, Input, Label, Table } from 'reactstrap'
import '../../assets/stylesheets/MyPercentages.scss'

export default class PercentageFinder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attributes: {
        weight: '',
        lowestPercent: '',
        highestPercent: ''
      }
    }
  }

  handleChange = event => {
    const { attributes } = this.state
    attributes[event.target.name] = event.target.value
    this.setState({ attributes })
  }

  handleTableData = () => {
    const { weight, lowestPercent, highestPercent } = this.state.attributes
    let newWeight = parseInt(weight)
    let high = parseInt(highestPercent)
    let low = parseInt(lowestPercent)
    let tData = []
    let incrementor = high - low > 15 ? 5 : 1
    if (high - low > 0) {
      for (let i=low; i<=high; i+=incrementor) {
        let percent = `${i}%`
        let percentWeight = `${Math.ceil(newWeight * (i/100))} lbs.`
        tData.push(percent)
        tData.push(percentWeight)
      }
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
    
  handleClearForm = () => {
    this.setState({
      attributes: {
        weight: '',
        lowestPercent: '',
        highestPercent: ''
      }
    })
  }
      

  render () {
    const { weight, lowestPercent, highestPercent } = this.state.attributes

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs="6" sm="4">
              <FormGroup>
                <Label for="weight">Weight</Label>
                <Input type="number" name="weight" value={ weight } onChange={ this.handleChange } />
              </FormGroup>
            </Col>
            <Col xs="6" sm="4">
              <FormGroup>
                <Label for="lowestPercent">Lowest Percent</Label>
                <Input type="number" name="lowestPercent" value={ lowestPercent } onChange={ this.handleChange } />
              </FormGroup>
            </Col>
            <Col xs="6" sm="4">
              <FormGroup>
                <Label for="highestPercent">Highest Percent</Label>
                <Input type="number" name="highestPercent" value={ highestPercent } onChange={ this.handleChange } />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 'auto', offset: 5}}>
              <Button color="secondary" onClick={ this.handleClearForm }>Clear</Button>
            </Col>
          </Row>
        </Container>
        <br />
        <hr />
        <br />
        {(weight > 0 && lowestPercent > 0 && highestPercent > 0) &&
          <Container>
            <Row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Table>
                  <tbody>
                    <tr>
                      <th>Percentage</th>
                      <th>Weight (in lbs.)</th>
                    </tr>
                    { this.handleTableData() }
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        }
      </React.Fragment>
    );
  }
}
