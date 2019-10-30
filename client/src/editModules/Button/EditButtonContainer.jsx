import React, { Component } from 'react'
import Headline from './Headline'
import Text from './Text';
import SubHeadline from './SubHeadline';
import Photo from './Photo';
import ShareURL from './ShareURL';
import Video from './Video';
import logo from '../../assets/sp-square-logo.svg'
import pub from '../../assets/publish.svg'
import { Link } from 'react-router-dom'

export default class ElementContainer extends Component {
  render() {
    return (

      <div className="append-header">
        <Link to="/dashboard"><img src={logo} width="30px" alt="snack-page" /></Link>
        <Headline buttonCheck={this.props.buttonCheck} />
        <SubHeadline buttonCheck={this.props.buttonCheck} />
        <Text buttonCheck={this.props.buttonCheck} />
        <Photo buttonCheck={this.props.buttonCheck} />
        <Video buttonCheck={this.props.buttonCheck} />
        <ShareURL buttonCheck={this.props.buttonCheck} />
        <select>
          <option>MailChimp</option>
          <option>Stripe</option>
          <option>Paypal</option>
        </select>
      </div>
    )
  }
}
