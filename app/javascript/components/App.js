import React from "react"
import { HashRouter as Router } from 'react-router-dom'
import Footer from './Footer'
import Routes from './Routes'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      windowWidth: 0,
      windowHeight: 0
    }
  }

  componentDidMount = () => {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    this.setState({ windowWidth, windowHeight });
  }

  render () {
    const {
      user,
      user_logged_in,
      user_sign_in_route,
      user_sign_out_route,
    } = this.props

    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      topBarHeight: 40,
      footerMenuHeight: 50,
      showFooterMenuText: this.state.windowWidth > 500
    }

    return (
      <div
        style={{
          backgroundColor: styles.black(0.05),
          minHeight: "100vh",
          position: "relative"
        }}
      >
        <Router>
          <Routes
            currentUser={ user }
            userLoggedIn={ user_logged_in }
            userSignInRoute={ user_sign_in_route }
            userSignOutRoute={ user_sign_out_route }
            styles={ styles }
          />
        </Router>
        <Footer styles={styles}/>
      </div>
    );
  }
}
