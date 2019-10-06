import React from "react"
import { Button, FormGroup, Label, Input } from 'reactstrap'
import '../../assets/stylesheets/olympic_lifts.scss'


export default class SetOlympicLifts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attributes: {
        clean_and_jerk: '',
        clean: '',
        power_clean: '',
        jerk: '',
        power_jerk: '',
        snatch: '',
        power_snatch: ''
      }
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
        clean_and_jerk: '',
        clean: '',
        power_clean: '',
        jerk: '',
        power_jerk: '',
        snatch: '',
        power_snatch: ''
      }
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()
    const { attributes } = this.state
    let userId = this.props.currentUser.id

    fetch(`/users/${userId}/olympic_lifts.json`, {
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
    .then(success => {
      fetch('/users/:user_id/olympic_lifts.json')
      .then(resp => resp.json())
      .then(data => this.props.handleNewOlyLift(data))
    })
  }

  render () {
    const { attributes } = this.state
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-4" id="entireForm">
            <h1>Set Olympic Lifts</h1>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="clean_and_jerk">Clean & Jerk</Label>
                <Input
                  type="text"
                  name="clean_and_jerk"
                  onChange={ this.handleChange }
                  value={ attributes.clean_and_jerk }
                />
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="snatch">Snatch</Label>
                <Input
                  type="text"
                  name="snatch"
                  onChange={ this.handleChange }
                  value={ attributes.snatch }
                />
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="clean">Clean</Label>
                <Input
                  type="text"
                  name="clean"
                  onChange={ this.handleChange }
                  value={ attributes.clean }
                />
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="jerk">Jerk</Label>
                <Input
                  type="text"
                  name="jerk"
                  onChange={ this.handleChange }
                  value={ attributes.jerk }
                />
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="power_clean">Power Clean</Label>
                <Input
                  type="text"
                  name="power_clean"
                  onChange={ this.handleChange }
                  value={ attributes.power_clean }
                />
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="power_jerk">Power Jerk</Label>
                <Input
                  type="text"
                  name="power_jerk"
                  onChange={ this.handleChange }
                  value={ attributes.power_jerk }
                />
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="power_snatch">Power Snatch</Label>
                <Input
                  type="text"
                  name="power_snatch"
                  onChange={ this.handleChange }
                  value={ attributes.power_snatch }
                />
              </div>
            </FormGroup>

            <Button color="primary" id="newOlyLiftSaveButton" onClick={ this.handleFormSubmit }>Save</Button>
            <Button color="secondary" id="newOlyLiftClearButton" onClick={ this.handleClearForm }>Clear</Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
