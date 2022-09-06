import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT


export const getPosts = async() => {
  const query = gql`
  query MyQuery {
    postsConnection {
      edges {
        node {
          author {
            bio
            name
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          image {
            url
          }
          categories {
            name
            slug
          }
        }
      }
    }
  }
 
  `
  const result = await request(graphqlAPI, query)
  return result.postsConnection.edges
}

export const getPostDetails = async(slug) => {
  const query = gql`
    query getPostDetails($slug: String!) {
      post(where: {slug: $slug}) {
        author{
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        image {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  
  `
  const result = await request(graphqlAPI, query, {slug})
  return result.post
}


export const getCategoryPost = async(slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          node {
            author {
              bio
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            image {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  
  `
  const result = await request(graphqlAPI, query, {slug})
  return result.postsConnection.edges
}

export const getRecentPosts = async() => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        image{
          url
        }
        createdAt
        slug
      }
    }
  
  `
  const result = await request(graphqlAPI, query)
  return result.posts
}

export const getSimilerPosts = async(categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]){
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        image {
          url
        }
        createdAt
        slug
      }
    }

  `
  const result = await request(graphqlAPI, query, {categories, slug})
  return result.posts
}

export const getCategories = async() => {
  const query = gql`
    query getCategories {
      categories {
        name
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query)
  return result.categories
}

export const submitComment = async(obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    header: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(obj)
  })
  return result.json()
} 


export const getComments = async(slug) => {
  const query = gql`
    query getComments($slug: String!) {
      comments(where: {post: {slug: $slug}}) {
        name
        createdAt
        comments
      }
    }
  
  `
  const result = await request(graphqlAPI, query, {slug})
  return result.comments
}

export const getFeatPosts = async() => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost:true}) {
        author {
          name
          photo{
            url
          }
        }
        image{
          url
        }
        title
        slug
        createdAt
      }
    }
  
  `
  const result = await request(graphqlAPI, query)
  return result.posts
}










