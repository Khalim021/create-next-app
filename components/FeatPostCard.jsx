import React from 'react'
import moment from 'moment/moment'
import Image from 'next/image'

const FeatPostCard = ({post}) => {
  return (
    <div className='relative h-72'>
      <div className='absolute rounded-lg bg-center bg-no-repeat shadow-lg bg cover inline-block w-full h-72' 
      style={{backgroundImage: `url(${post.image.url})`}} />
      <div className='absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black h-72' />
      <div className='flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full'>
        <p className='text-white text-shadow mb-4 font-semibold text-xs'>
          {moment(post.createdAt).format("MMM DD, YYYY")}
        </p>
        <p className='text-white text-shadow mb-4 font-semibold text-2xl text-center'>{post.title}</p>
        <div className='flex items-center absolute bottom-5 w-full justify-center'>
          <Image 
            unoptimized
            alt={post.author.name}
            height={30}
            width={30}
            className='align-middle drop-shadow-lg rounded-full'
            src={post.author.photo.url}
          />
          <p className='inline align-middle text-white text-shadow ml-2 font-medium'>{post.author.name}</p>
        </div>
      </div>
    </div>
  )
}

export default FeatPostCard