import { provideApolloClient } from '@vue/apollo-composable'
import { useApolloClient } from '@/composables/useApolloClient.ts'
import { useMutation } from '@vue/apollo-composable'
import { graphql } from '@/gql'

const { apolloClient } = useApolloClient()

provideApolloClient(apolloClient)
const updateProfilePictureGql = graphql(`
  mutation updateProfilePicture($input: String!) {
    updateProfilePictureUri(uri: $input)
  }
`)
const { mutate: UpdateProfilePicture } = useMutation(updateProfilePictureGql)

export const useMutations = () => {
  return {
    UpdateProfilePicture,
  }
}
