import React from 'react'
import { withRouter } from 'react-router-dom'


const Create = (props) => {
  return (
    <>
      <div className="home-hero">
        <div className='row'>
          <div className='column'>
            <div className="react-transition flip-in-y-reverse">
              <div className="form login-form box-shadow">
                <h4>give your snack page a name</h4>

                <form
                  onSubmit={props.newSite}
                >
                  <input
                    className="form-input"
                    name='name'
                    type='text'
                    placeholder='sitename'
                    value={props.snackFormData.name}
                    onChange={props.handleFormChange} />

                  <input
                    className="form-input"
                    name='category'
                    type='text'
                    placeholder='category'
                    value={props.snackFormData.category}
                    onChange={props.handleFormChange} />
                  <button className='form-button smooth'>create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
export default withRouter(Create);