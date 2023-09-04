import { useMutation } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import { EventInput  } from '@/gql/graphql.ts'

export default () => {

  const createEventMutation = (eventInput: EventInput) => {
    const gql = graphql(`
        mutation createEvent ($input: EventInput!){
            createEvent(input: $input){
                id
            }
        }
    `)
    const { mutate } = useMutation(gql, {
      variables: {
        input: eventInput
      },

    })
    const res = mutate();
    console.log(res)

  }

  const login = () => {
      try {
          const gql = graphql(`
              mutation firstLogin {
                  firstLogin{
                      email,
                      type,
                      username,
                      profilePictureUri
                  }
              }
          `)
          const { mutate } = useMutation(gql)
          const res = mutate();
          console.log(res)
      }
      catch (e) {
            console.log(e, "went wrong here")
      }

  }


  return{
    createEventMutation,
    login
  }

}
