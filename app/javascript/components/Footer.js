import React from "react"

export default class Footer extends React.Component {
  render () {
    const { styles } = this.props
    return (
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          width: "100%",
          height: styles.footerMenuHeight,
          backgroundColor: "#333",
          color: "#fff",
          position: "fixed",
          bottom: 0
        }}
      >
      </div>
    );
  }
}
