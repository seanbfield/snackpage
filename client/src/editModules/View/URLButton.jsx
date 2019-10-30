


import React, { Component } from 'react'
export default class URLButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      links: [],
      url: '',
      title: ''
    }
  }

  // onChange
  onChange = e => {
    e.preventDefault(e);
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    console.log(e.target.name, e.target.value);
    console.log(pattern.test(e.target.value));
    if (pattern.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value })
    }
  };

  // onSubmit

  onSubmit = e => {
    e.preventDefault()
    console.log(e);

  };


  render() {
    const { title, url } = this.state;

    if (url === "") {
      return (
        <div className="center-it" >
          <form onClick={this.onSubmit}>
            <input
              className="url-input"
              name="title"
              type="text"
              placeholder="add button text"
              onChange={e => this.setState({ title: e.target.value })}
            />
            <input
              className="url-input"
              name="url"
              type="url"
              value={this.url}
              placeholder="your-link.com"
              onBlur={e => this.setState({ url: e.target.value })}
            />
            <br />
          </form>
          <button className="upload-button">Submit</button>
        </div>
      )
    } else {
      return (
        <>
          <div className="center-it" >
            <a
              href={url}
              className="link-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
          </div >
        </>
      )
    }
  }
}
