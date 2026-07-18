import React from 'react'
import loading from './loading.gif'

export const Spinner = () => {
  
    return (
      <div className='text-center'>
        <img src={loading} alt="Loading..." />
      </div>
    )
  
}

export default Spinner
