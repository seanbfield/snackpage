import React, { Component } from 'react'
import shl from '../../assets/shl-icon.svg'
export default class SubHeadline extends Component {

  render() {
    return (
      <div>
        <button><img className="zoom" src={shl} alt="sub-head" onClick={this.props.buttonCheck} id='buttonB' /></button>
      </div>
    )
  }
}
