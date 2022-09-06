import { comment } from 'postcss'
import React, { useRef, useState } from 'react'
import {submitComment} from '../services//index'

const CommentForm = ({slug}) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl = useRef()
  const nameElement = useRef()
  const emailEl = useRef()
  const storeData = useRef()

  const handleCommentSubmit = () => {
    setError(false)
    const {value: comment} = commentEl.current
    const {value: name} = nameElement.current
    const {value: email} = emailEl.current

    if(!name || !comment || !email) {
      setError(true)
      return
    }
    const commentObj = {name, email, comment, slug}

    if(storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)
    }

    submitComment(commentObj)
      .then(res => {
        setShowSuccessMessage(true)
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 3000)
      })

  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h4 className='text-xl mb-8 font-semibold border-b pb-4'>Comment</h4>
      <div className='grid grid-cols-1 gap-4 pb-4'>
        <textarea 
          className='p-4 outline-none w-full rounded-lg focus:right-2 focus:ring-gray-100 bg-gray-100 text-gray-700'
          ref={commentEl}
          placeholder='Comment...'
          name='comment'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4'>
        <input 
          type="text" 
          ref={nameElement}
          name="name"
          placeholder='Name...'
          className='p-4 outline-none w-full rounded-lg focus:right-2 focus:ring-gray-100 bg-gray-100 text-gray-700'
          />
        <input 
          type="email" 
          ref={emailEl}
          placeholder='Email...'
          name='email'
          className='p-4 outline-none w-full rounded-lg focus:right-2 focus:ring-gray-100 bg-gray-100 text-gray-700'
        />
      </div>
      <div className='grid grid-cols-1 gap-4 pb-4'>
        <div>
          <input type='checkbox' id='storeData' name='storeData' value='true' ref={storeData}/>
          <label htmlFor="storeData" className='text-gray-500 cursor-pointer ml-2'>Save my name, email for the next time</label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'>All fields are required</p>}
      <div className='mt-8'>
        <button type='button'
          className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-indigo-400 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'
          onClick={handleCommentSubmit}
        >Post Comment</button>
        {showSuccessMessage && <span className='font-semibold mt-2 text-green-500 text-xl float-right'>Comment submitted Successfully</span>}
      </div>
    </div>
  )
}

export default CommentForm