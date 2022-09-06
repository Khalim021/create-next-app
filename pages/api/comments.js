// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {GraphQLClient, gql} from 'graphql-request';

const graphAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
const graphToken = process.env.GRAPHCMS_TOKEN

export default async function comments(req, res) {
  const graphQLClient = new GraphQLClient(graphAPI, {
    headers: {
      authorization: `Bearer  ${graphToken}`
    }
  })
  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}){id}
    }
  `
  try{
    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result)
  }catch(e) {
    console.log(e)
  }
}




