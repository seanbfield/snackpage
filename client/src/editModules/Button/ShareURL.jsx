
import React, { Component } from 'react'
import link from '../../assets/link-icon.svg'

export default class ShareURL extends Component {
  render() {
    return (
      <div >
        <button ><img className="zoom" src={link} alt="share-url" onClick={this.props.buttonCheck} id='buttonF' /></button>
      </div>
    )
  }
}