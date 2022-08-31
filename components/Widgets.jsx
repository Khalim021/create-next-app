import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import moment from 'moment';
import { getRecentPosts, getSimilerPosts } from '../services/index'

function Widgets({categories, slug}) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if(slug) {
      getSimilerPosts(categories, slug)
        .then(res => setRelatedPosts(res))
    } else {
      getRecentPosts()
        .then(res => setRelatedPosts(res))
    }
  }, [slug])

  return (
    <div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
      <h4 className='text-xl mb-8 font-semibold border-b pb-4'>
       {slug ? 'Related Posts' : 'Recent Posts'}  
      </h4>
      {relatedPosts.map(post => (
        <div key={post.title} className='flex items-center w-full mb-4'>
          <div className='w-16 flex-none'>
            <img 
            src={post.image.url} 
            alt={post.title}
            className="align-middle rounded-full object-cover"
            width='60px'
            height='60px'
            />
          </div>
          <div className='transition duration-300 flex-grow ml-4 border-b text-indigo-800 hover:text-indigo-400'>
            <p className='text-gray-500 font-xs'>
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Widgets;