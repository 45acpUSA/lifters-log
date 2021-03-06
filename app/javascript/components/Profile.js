import React from "react"
import { Container, Row, Col, Button } from 'reactstrap'
import CoreLifts from './CoreLifts'
import OlympicLifts from './OlympicLifts'
import SetCoreLifts from './SetCoreLifts'
import SetOlympicLifts from './SetOlympicLifts'

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coreLifts: [],
      olyLifts: [],
      showNewCore: false,
      showNewOly: false,
    }
  }

  componentDidMount = () => {
    if (this.props.currentUser) {
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
  }

  toggleCoreLift = () => {
    this.setState({ showNewCore: !this.state.showNewCore })
  }

  toggleOlyLift = () => {
    this.setState({ showNewOly: !this.state.showNewOly })
  }

  handleNewCoreLift = newLift => {
    this.toggleCoreLift()
    this.setState({ coreLifts: newLift })
  }

  handleNewOlyLift = newLift => {
    this.toggleOlyLift()
    this.setState({ olyLifts: newLift })
  }

  render () {
    const { coreLifts, olyLifts, showNewCore, showNewOly } = this.state
    const { currentUser } = this.props

    const coreLiftsDisplay = () => {
      return coreLifts.map((value, index) => {
        return (
          <CoreLifts value={ value } currentUser={ currentUser } key={ index } />
        )
      })
    }

    const olyLiftsDisplay = () => {
      return olyLifts.map((value, index) => {
        return (
          <OlympicLifts value={ value } currentUser={ currentUser } key={ index } />
        )
      })
    }

    return (
      <React.Fragment>
        {!currentUser &&
          <Container>
            <Row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <div id="welcomeHeader">
                  <h2>Focus on your lift, not the math</h2>
                </div>
                <br />
                <div id="welcomeMessage">
                  <p>If you haven't already, sign up to take full advantage of the app</p>
                </div>
              </Col>
            </Row>
          </Container>
        }
        {currentUser &&
          <Container>
            <Row>
              <Col xs="3">Avatar</Col>
              <Col xs="3">
                <h3>{`${currentUser.first_name} ${currentUser.last_name}`}</h3>
                <h5>{`${currentUser.affiliate}`}</h5>
                <h5>{`${currentUser.location}`}</h5>
              </Col>
              {(coreLifts.length < 1 && !showNewOly && !showNewCore) &&
                <Col xs="3">
                  <Button color="primary" size="lg" onClick={ this.toggleCoreLift }>Set Core Lifts</Button>
                </Col>
              }
              {(coreLifts.length < 1 && !showNewOly && showNewCore) &&
                <Col xs="3">
                  <Button color="secondary" size="lg" onClick={ this.toggleCoreLift }>Cancel</Button>
                </Col>
              }
              {(olyLifts.length < 1 && !showNewCore && !showNewOly) &&
                <Col xs="3">
                  <Button color="primary" size="lg" onClick={ this.toggleOlyLift }>Set Olympic Lifts</Button>
                </Col>
              }
              {(olyLifts.length < 1 && !showNewCore && showNewOly) &&
                <Col xs="3">
                  <Button color="secondary" size="lg" onClick={ this.toggleOlyLift }>Cancel</Button>
                </Col>
              }
            </Row>
          </Container>
        }
        {(currentUser && coreLifts && !showNewCore && !showNewOly) &&
          <div>
            <hr />
            { coreLiftsDisplay() }
          </div>
        }
        {(currentUser && olyLifts && !showNewCore && !showNewOly) &&
          <div>
            <hr />
            { olyLiftsDisplay() }
          </div>
        }

        {(currentUser && !coreLifts && !olyLifts && !showNewCore && !showNewOly) &&
          <div>
            <hr />
            <br />
            <h3>Set your Core and Olympic Lifts to begin tracking.</h3>
          </div>
        }

        {showNewCore &&
          <div>
            <hr />
            <br />
            <SetCoreLifts currentUser={ currentUser } handleNewCoreLift={ this.handleNewCoreLift } />
          </div>
        }

        {showNewOly &&
          <div>
            <hr />
            <br />
            <SetOlympicLifts currentUser={ currentUser } handleNewOlyLift={ this.handleNewOlyLift } />
          </div>
        }

      </React.Fragment>
    );
  }
}
