import React from "react"
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
    let userId = this.props.currentUser.id
    Promise.all([fetch(`/users/${userId}/core_lifts.json`), fetch(`/users/${userId}/olympic_lifts.json`)])
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

    return (
      <React.Fragment>
        <br />
        <CoreLifts coreLifts={ coreLifts }/>
        <br />
        <hr />
        <br />
        <OlympicLifts olyLifts={ olyLifts }/>
      </React.Fragment>
    );
  }
}
