import React from "react"
import { Route, Switch, Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

//Routes
import Profile from './Profile'
import UserSession from './UserSession'
// import SetCoreLifts from './SetCoreLifts'
// import SetOlympicLifts from './SetOlympicLifts'


export default class Routes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleNewCoreLifts = data => {

  }

  render () {
    const { currentUser, userLoggedIn, userSignInRoute, userSignOutRoute } = this.props
    return (
      <React.Fragment>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Lifter's Log</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#">Percentages</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Plate Math</NavLink>
              </NavItem>

              {userLoggedIn &&
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {`${currentUser.first_name}'s Stuff`}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      My Profile
                    </DropdownItem>
                    <DropdownItem>
                      My Percentages
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem href="#users/session">
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }

              {!userLoggedIn &&
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Hello, Guest
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href="#users/session">
                      Log In
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }

            </Nav>
          </Collapse>
        </Navbar>

        <Switch>
          <Route
          exact path="/"
          render={
            props =>
            <Profile
              {...props}
              currentUser={ currentUser }
            />
          }
        />

          {/* <Route
            path="/users/:user_id/new_core_lifts"
            render={
              props =>
              <SetCoreLifts
                {...props}
                currentUser={ currentUser }
              />
            }
          />

          <Route
            path="/users/:user_id/new_olympic_lifts"
            render={
              props =>
              <SetOlympicLifts
                {...props}
                currentUser={ currentUser }
              />
            }
          /> */}

          <Route
            path="/users/session"
            render={
              props =>
              <UserSession
                {...props}
                userLoggedIn={ userLoggedIn }
                userSignInRoute={ userSignInRoute }
                userSignOutRoute={ userSignOutRoute }
              />
            }
          />

        </Switch>
      </React.Fragment>
    );
  }
}
