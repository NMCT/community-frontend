import { useApolloClient } from '@/composables/useApolloClient.ts'
import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'

const { apolloClient } = useApolloClient()

provideApolloClient(apolloClient)

const query = graphql(`
  query getUser($id: String!) {
    user(uid: $id) {
      id
      profilePictureUri
      email
      username
      socials {
        discord
        facebook
        instagram
        linkedIn
      }
      firebaseId
    }
  }
`)

const getUser = async (id: string) => {
  return useQuery(query, { id })
}

export const useUser = () => {
  return {
    getUser,
    getUserQuery: query,
  }
}
