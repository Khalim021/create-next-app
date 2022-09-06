import React from 'react'
import { Widgets, Categories, Author, PostDetails, CommentForm, Comments, Loader } from '../../components/zindex'
import { getPostDetails, getPosts } from '../../services'
import { useRouter } from 'next/router'

const PostDetail = ({post}) => {
  const router = useRouter()

  if(router.isFallback) {
    return <Loader />
  }

  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <Widgets slug={post.slug} categories={post.categories.map(category => category.slug)} />
            <Categories />
          </div>
        </div>
        <div className='col-span-1 lg:col-span-8'>
          <PostDetails post={post} />
          <Author author={post.author} />
          <CommentForm slug={post.slug} />
          <Comments slug={post.slug}/>
        </div>
      </div>
    </div>
  )
}

export default PostDetail

export async function getStaticProps({params}) {
  const data = await getPostDetails(params.slug)

  return {
    props: {
      post: data
    }
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map(({node: {slug}}) => ({params: {slug}})),
    fallback: true
  }
}





