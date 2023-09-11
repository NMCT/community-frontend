import { useFirebase } from '@/composables/useFirebase.ts'
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const { firebaseUser } = useFirebase()

// set possible id fields to _id, id, or uid
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          keyArgs: ['_id', 'id', 'uid'],
        },
      },
    },
  },
})

const baseUrl = import.meta.env.VITE_BASE_URL
const httpLink = createHttpLink({
  uri: `${baseUrl}/graphql`,
})

const authMiddleware = setContext(async () => {
  if (!firebaseUser.value) throw new Error('not logged in')
  const token = await firebaseUser.value.getIdToken()
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const link = ApolloLink.from([authMiddleware, httpLink])

const apolloClient = new ApolloClient({
  cache,
  link: link,
})

export const useApolloClient = () => {
  return {
    apolloClient,
  }
}
