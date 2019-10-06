import React from "react"

export default class Percentages extends React.Component {
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
    return (
      <React.Fragment>
      </React.Fragment>
    );
  }
}
