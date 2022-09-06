import React, { useEffect, useState } from 'react'
import moment from 'moment/moment'
import parse from 'html-react-parser'
import { getComments } from '../services/index'
import { comment } from 'postcss'

const Comments = ({slug}) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(slug)
      .then(res => setComments(res))
  }, [])

  return (
    <>
      {comments.length > 0 && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h4 className='text-xl mb-8 font-semibold border-b pb-4'>
            {comments.length}
            Comments
          </h4>
          {comments.map((comment, index) => (
            <div key={index} className='border-b border-gray-100 mb-4 pb-4'>
              <p className='mb-4'>
                <span className='font-semibold'>{comment.name}</span>
                {" "}
                on {" "} {moment(comment.createdAt).format("MMM DD, YYYY")}
              </p>
              <p className='whitespace-pre-line text-gray-600 w-full'>{parse(comment.comments)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments