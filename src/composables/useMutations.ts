import { provideApolloClient, useMutation } from '@vue/apollo-composable'
import { useApolloClient } from '@/composables/useApolloClient.ts'
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

const interestEventGql = graphql(`
  mutation interestEvent($eventId: String!) {
    interestedEvent(eventId: $eventId) {
      id
      interested {
        uid
      }
    }
  }
`)

const { mutate: interestEvent } = useMutation(interestEventGql)

const uninterestEventGql = graphql(`
  mutation uninterestEvent($eventId: String!) {
    uninterestedEvent(eventId: $eventId) {
      id
      interested {
        uid
      }
    }
  }
`)

const { mutate: uninterestEvent } = useMutation(uninterestEventGql)

export const useMutations = () => {
  return {
    updateProfilePicture,
    attendEvent,
    unattendEvent,
    interestEvent,
    uninterestEvent,
  }
}
