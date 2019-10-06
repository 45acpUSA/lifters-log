import React from "react"
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import CoreLifts from './CoreLifts'
import OlympicLifts from './OlympicLifts'

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coreLifts: [],
      olyLifts: []
    }
  }

  componentDidMount = () => {
    Promise.all([fetch(`/users/:user_id/core_lifts.json`), fetch(`/users/:user_id/olympic_lifts.json`)])
    .then(([response1, response2]) => {
      return Promise.all([response1.json(), response2.json()])
    })
    .then(([data1, data2]) => {
      this.setState({
        coreLifts: data1,
        olyLifts: data2
      })
    })
  }

  render () {
    const { coreLifts, olyLifts } = this.state
    const { currentUser } = this.props

    let coreLiftsDisplay = coreLifts.map((value, index) => {
      return (
        <CoreLifts value={ value } currentUser={ currentUser } key={ index } />
      )
    })

    let olyLiftsDisplay = olyLifts.map((value, index) => {
      return (
        <OlympicLifts value={ value } currentUser={ currentUser } key={ index } />
      )
    })

    return (
      <React.Fragment>
        {currentUser &&
          <Container>
            <Row>
              <Col xs="3">Avatar</Col>
              <Col xs="3">
                <h3>{`${currentUser.first_name} ${currentUser.last_name}`}</h3>
                <h5>{`${currentUser.affiliate}`}</h5>
                <h5>{`${currentUser.location}`}</h5>
              </Col>
              {(coreLifts.length === 0) &&
                <Col xs="3">
                  <Link to='/users/:user_id/new_core_lifts'>
                    <Button color="primary" size="lg" type="button">Set Core Lifts</Button>
                  </Link>
                </Col>
              }
              {(olyLifts.length === 0) &&
                <Col xs="3">
                  <Link to='/users/:user_id/new_olympic_lifts'>
                    <Button color="primary" size="lg" type="button">Set Olympic Lifts</Button>
                  </Link>
                </Col>
              }
            </Row>
          </Container>
        }
        {(currentUser && coreLifts.length > 0) &&
          <div>
            <hr />
            <br />
            { coreLiftsDisplay }
          </div>
        }
        {(currentUser && olyLifts.length > 0) &&
          <div>
            <hr />
            <br />
            { olyLiftsDisplay }
          </div>
        }

        {(currentUser && coreLifts.length === 0 && olyLifts.length === 0) &&
          <div>
            <hr />
            <br />
            <h3>Set your Core and Olympic Lifts to begin tracking.</h3>
          </div>
        }

      </React.Fragment>
    );
  }
}
