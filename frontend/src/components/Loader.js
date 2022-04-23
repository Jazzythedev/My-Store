// the purpose of this component is to show a loading spinner when data is being retrieved from the DB or redux store. */


import React from 'react'
import { Spinner } from 'react-bootstrap'   /* Spinners can be used to show the loading state in your projects */

const Loader = () => {              /* store this whole function in a variable called Loader, to be called when pages are loading and data is being retrieved.  */
    return (
      <Spinner
        animation='border'  /* border refers to the animation style of the spinner. Simple HTML and CSS is used to display it */
        role='status'
        style={{
          width: '100px',
          height: '100px',
          margin: 'auto',
          display: 'block',
        }}
      >
        <span className='sr-only'>Loading...</span>
      </Spinner>
    )
  }
  
  export default Loader 