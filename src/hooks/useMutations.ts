import {useMutation} from '@vue/apollo-composable'
import {graphql} from '@/gql'
import { provideApolloClient } from "@vue/apollo-composable";

export default () => {



    // const createEventMutation = (eventInput: EventInput) => {
    //     const gql = graphql(`
    //         mutation createEvent ($input: EventInput!){
    //             createEvent(input: $input){
    //                 id
    //             }
    //         }
    //     `)
    //     const {mutate} = useMutation(gql, {
    //         variables: {
    //             input: eventInput
    //         },
    //
    //     })
    //     const res = mutate();
    //     console.log(res)
    //
    // }



    return {
        login
    }

}
