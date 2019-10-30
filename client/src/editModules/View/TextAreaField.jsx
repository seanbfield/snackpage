import React from 'react'
import { Link } from 'react-router-dom'
import InputShow from './InputShow';


export default (props) => {
  return (

    <>
      <div className='view'>
        <InputShow node={props.inputField} inputContentHandler={props.inputContentHandler} />
      </div>
    </>
  )
}
