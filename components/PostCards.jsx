import React from 'react';
import moment from 'moment';
import Link from 'next/link'

function PostCards({post}) {
  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
      <h2 className='transition duration-700 text-center mb-8 cursor-pointer hover:text-indigo-700 text-3xl font-semibold'>
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      <div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
        <div className='flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
          <img 
          src={post.author.photo.url} 
          alt={post.author.name}
          width='50px'
          height='50px'
          className='align-middle rounded-full'
          />
          <h6 className='inline align-middle text-gray-700 text-lg ml-2'>{post.author.name}</h6>
        </div>
        <div className='font-medium text-gray-700'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{moment(post.createAt).format('MMM DD, YYYY')}</span>
        </div>
      </div>
      <div className='relative overflow-hidden shadow-md pb-80 mb-6'>
        <img className='object-bottom absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg'
          src={post.image.url}
          alt={post.title}
        />
      </div>
      <p className='text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8'>
        {post.excerpt}
      </p>
      <div className='text-center'>
        <Link href={`/post/${post.slug}`}>
          <span className='transition duration-500 transform hover:-translate-y-1 inline-block bg-gray-700 font-medium text-lg rounded-full px-8 py-3 cursor-pointer'>
            Read More
          </span>
        </Link>
      </div>
    </div>
  );
}

export default PostCards;