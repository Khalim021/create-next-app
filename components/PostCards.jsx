import React from 'react';

function PostCards({post}) {
  return (
    <div>
      {post.name} -- 
      {post.excerpt}
    </div>
  );
}

export default PostCards;