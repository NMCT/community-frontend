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
const { mutate: updateProfilePicture } = useMutation(updateProfilePictureGql)

const attendEventGql = graphql(`
  mutation attendEvent($eventId: String!) {
    attendEvent(eventId: $eventId) {
      id
      attendees {
        uid
        name
      }
    }
  }
`)

const { mutate: attendEvent } = useMutation(attendEventGql)

const unattendEventGql = graphql(`
  mutation unattendEvent($eventId: String!) {
    unattendEvent(eventId: $eventId) {
      id
      attendees {
        uid
      }
    }
  }
`)

const { mutate: unattendEvent } = useMutation(unattendEventGql)

export const useMutations = () => {
  return {
    updateProfilePicture,
    attendEvent,
    unattendEvent,
  }
}
