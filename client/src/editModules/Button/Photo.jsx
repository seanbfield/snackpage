import React, { Component } from 'react'
import foto from '../../assets/foto.svg'
export default class Photo extends Component {
  render() {
    return (
      <div>
        <button><img className="zoom" src={foto} alt="photo-icon" onClick={this.props.buttonCheck} id='buttonD' /></button>
      </div>
    )
  }
}
