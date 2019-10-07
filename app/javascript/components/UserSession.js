import React from "react"

export default class UserSession extends React.Component {
  render () {
    const { userLoggedIn, userSignInRoute, userSignOutRoute } = this.props
    return (
      <React.Fragment>
        {!userLoggedIn &&
          <div>
            <h3 id="userSessionMessage">You are not logged in! Please Log In or Sign Up to manage your numbers!</h3>
            <div>
              <a href={ userSignInRoute }>Log In or Sign Up</a>
            </div>
          </div>
        }
        {userLoggedIn &&
          <div>
            <h3 id="userSessionMessage">You are logged in!</h3>
            <div>
              <a href={ userSignOutRoute }>Log Out</a>
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}
