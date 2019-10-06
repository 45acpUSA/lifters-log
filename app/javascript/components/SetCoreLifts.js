import React from "react"
import { Link, Redirect } from 'react-router-dom'
import { Button, FormGroup, Label, Input } from 'reactstrap'

export default class SetCoreLifts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attributes: {
        back_squat: '',
        front_squat: '',
        deadlift: '',
        bench_press: '',
        strict_press: '',
      },
      success: false,
    }
  }

  handleChange = event =>{
    const { attributes } = this.state
    attributes[event.target.name] = event.target.value
    this.setState({ attributes })
  }

  handleClearForm = event => {
    event.preventDefault()
    this.setState({
      attributes: {
        back_squat: '',
        front_squat: '',
        deadlift: '',
        bench_press: '',
        strict_press: ''
      },
      success: false,
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()
    const { attributes, success } = this.state
    let userId = this.props.currentUser.id

    fetch(`/users/${userId}/core_lifts.json`, {
      method: "POST",
      body: JSON.stringify(attributes),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      response.json()
    })
    .then(data => {
      console.log("Successful" + data)
    })

    let redirect = success === false ? true : false
    this.setState({ success: redirect })
  }

  render () {
    const { attributes, success } = this.state
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-4" id="entireForm">
            <h1 id="title">Set Core Lifts</h1>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="back_squat">Back Squat</Label>
                <Input
                  type="text"
                  name="back_squat"
                  onChange={ this.handleChange }
                  value={ attributes.back_squat }
                />
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="front_squat">Front Squat</Label>
                <Input
                  type="text"
                  name="front_squat"
                  onChange={ this.handleChange }
                  value={ attributes.front_squat }
                />
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="deadlift">Deadlift</Label>
                <Input
                  type="text"
                  name="deadlift"
                  onChange={ this.handleChange }
                  value={ attributes.deadlift }
                />
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="bench_press">Bench Press</Label>
                <Input
                  type="text"
                  name="bench_press"
                  onChange={ this.handleChange }
                  value={ attributes.bench_press }
                />
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="strict_press">Strict Press</Label>
                <Input
                  type="text"
                  name="strict_press"
                  onChange={ this.handleChange }
                  value={ attributes.strict_press }
                />
              </div>
            </FormGroup>

            <Button color="primary" onClick={ this.handleFormSubmit }>Save</Button>
            <Button color="secondary" onClick={ this.handleClearForm }>Clear</Button>
            <br />
            <br />
            <hr />
            <div>
              <Link to='/'>Return to My Profile</Link>
            </div>
            {success &&
              <Redirect to='/' />
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}
