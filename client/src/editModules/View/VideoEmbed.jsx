import React, { Component } from 'react'

export default class VideoEmbed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      embeds: [],
      url: '',
    }
  }



  //handleChange
  onChange = (e) => {
    e.preventDefault(e)
    const fixedString = this.fixUrlString(e.target.value)
    this.setState({
      [e.target.name]: fixedString,
      url: fixedString
    })
  }

  fixUrlString = (original) => {
    const urlString = original.toString()
    return urlString.replace('/watch?v=', '/embed/')
  }

  render() {

    if (this.state.url === '') {
      return (
        <>
          {/* This is the form */}
          <div className="center-it">
            <div>
              <form>
                <input
                  className="video-input"
                  name="url"
                  type="text" // This is where the URL goes
                  placeholder="paste YouTube embed code"
                  value={this.state.url}
                  onChange={(e) => this.onChange(e)}
                />
              </form>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="center-it">
            {/* This is the returned result */}
            <iframe
              className="video"
              title="youtube player" width="560" height="100%"
              src={this.state.url} />
          </div>
        </>
      )
    }
  }
}