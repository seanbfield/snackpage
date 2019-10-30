import React, { Component } from 'react'
import hl from '../../assets/hl-icon.svg'
export default class Headline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: JSON.parse(localStorage.getItem('id')) || ''
    }
  }

  render() {
    return (
      <div >
        <button><img className="zoom" src={hl} alt="headline-icon" onClick={this.props.buttonCheck} id='buttonA' /></button>
      </div>
    )
  }
}

