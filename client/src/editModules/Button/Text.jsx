import React, { Component } from 'react'
import txt from '../../assets/text.svg'
export default class Text extends Component {
  render() {
    return (
      <div>
        <button><img className="zoom" src={txt} alt="test" onClick={this.props.buttonCheck} id='buttonC' /></button>
      </div>
    )
  }
}
