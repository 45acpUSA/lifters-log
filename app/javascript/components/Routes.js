import React from "react"
import { Route, Switch } from 'react-router-dom'
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
import MyPercentages from './MyPercentages'
import PercentageFinder from './PercentageFinder'
import Profile from './Profile'
import UserSession from './UserSession'


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

  render () {
    const { currentUser, userLoggedIn, userSignInRoute, userSignOutRoute, styles } = this.props

    const navBarStyle = {
      position: "fixed",
      top: 0,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      height: styles.topBarHeight,
      backgroundColor: "#333",
      borderBottom: `1px solid ${styles.black(0.1)}`,
      fontWeight: "bold",
      padding: "0px 20px",
      boxSizing: "border-box",
      zIndex: 10
    }

    const contentStyle = {
      paddingTop: styles.topBarHeight + 20,
      paddingRight: 20,
      paddingBottom: styles.footerMenuHeight + 20,
      paddingLeft: 20
    }

    return (
      <React.Fragment>
        <Navbar expand="md" style={ navBarStyle }>
          <NavbarBrand href="/">Lifter's Log</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#percentage_finder">Percentage Finder</NavLink>
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
                    <DropdownItem href="#">
                      My Profile
                    </DropdownItem>
                    <DropdownItem href="#users/percentages">
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
        
        <div style={ contentStyle }>
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

            <Route path="/percentage_finder" component={ PercentageFinder } />

            <Route path="/users/percentages" component={ MyPercentages } />

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
        </div>
      </React.Fragment>
    );
  }
}
