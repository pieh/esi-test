import React from "react"

export default class GatsbyESIIncludes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: ``,
    }

    if (
      typeof window !== `undefined` &&
      process.env.BUILD_STAGE === `build-javascript`
    ) {
      fetch(props.src)
        .then(res => res.text())
        .then(data => {
          this.setState({
            data,
          })
        })
        .catch(error => {
          console.log("Error: ", error)
        })
    }
  }

  render() {
    if (typeof window !== `undefined`) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: this.state.data,
          }}
        />
      )
    } else {
      // this is for static html
      const onErr = this.props.skipError ? `onError="continue"` : ""
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: `hello world`,
          }}
        />
      )
    }
  }
}
