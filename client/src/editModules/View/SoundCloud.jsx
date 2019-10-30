// https://www.npmjs.com/package/react-soundcloud-embed

import React, { Component } from 'react'
import ReactSoundcloud from 'react-soundcloud-embed';

export default class SoundCloud extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scURL: ''

    }
  }

  render() {
    return (
      <div>
        <h1>SoundCloud Component</h1>
      </div>
    )
  }
}
