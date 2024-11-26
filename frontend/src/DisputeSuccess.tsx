import React from 'react'
import Check from '../src/asset/Checkmark.png'

const DisputeSuccess = () => {
  return (
    <div className='flex flex-col font-semibold items-center justify-center mx-auto w-3/4 py-3 shadow-sm mt-5 ' >
      <h1 className='text-4xl' >Dispute Resolution</h1>
      <img src={Check} alt="logo" width={100} height={100} className='bg-blue-400 border mt-3 py-2 px-2' />
      <p className='text-2xl pt-2' >Complaint Submitted!! </p>
    </div>
  )
}

export default DisputeSuccess
