import React from 'react'
import { Link } from 'react-router-dom';


export default (props) => {

  return (
    <>
      <div className="react-transition drop-in">
        <div className='some-page-wrapper'>
          <div className='row'>
            <div className="full-column">
              <div className="dash-card">
                <button id="create-button">
                  <Link to="/create">+</Link>
                </button>
                <>
                  <p>Alameda</p>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}