import React, { Component } from 'react'
import video from '../../assets/video.svg'
export default class Video extends Component {
  render() {
    return (
      <div>
        <button><img className="zoom" src={video} alt="video-icon" onClick={this.props.buttonCheck} id='buttonE' /></button>
      </div>
    )
  }
}