/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query getUser($id: String!) {\n    user(uid: $id) {\n      id\n      profilePictureUri\n      email\n      username\n      socials {\n        discord\n        facebook\n        instagram\n        linkedIn\n      }\n      firebaseId\n       }\n  }": types.GetUserDocument,
    "\n       query getEvents {\n            events{\n            items {\n               id,\n               title,\n               location,\n            }\n          }\n       }": types.GetEventsDocument,
    "\n    mutation createNewEvent($input: EventInput!) {\n        createEvent(input: $input) {\n            title\n            location\n            type\n            description\n            startDate\n            endDate\n            maxAttendees\n            openToGuests\n        }\n    }\n": types.CreateNewEventDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getUser($id: String!) {\n    user(uid: $id) {\n      id\n      profilePictureUri\n      email\n      username\n      socials {\n        discord\n        facebook\n        instagram\n        linkedIn\n      }\n      firebaseId\n       }\n  }"): (typeof documents)["query getUser($id: String!) {\n    user(uid: $id) {\n      id\n      profilePictureUri\n      email\n      username\n      socials {\n        discord\n        facebook\n        instagram\n        linkedIn\n      }\n      firebaseId\n       }\n  }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n       query getEvents {\n            events{\n            items {\n               id,\n               title,\n               location,\n            }\n          }\n       }"): (typeof documents)["\n       query getEvents {\n            events{\n            items {\n               id,\n               title,\n               location,\n            }\n          }\n       }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createNewEvent($input: EventInput!) {\n        createEvent(input: $input) {\n            title\n            location\n            type\n            description\n            startDate\n            endDate\n            maxAttendees\n            openToGuests\n        }\n    }\n"): (typeof documents)["\n    mutation createNewEvent($input: EventInput!) {\n        createEvent(input: $input) {\n            title\n            location\n            type\n            description\n            startDate\n            endDate\n            maxAttendees\n            openToGuests\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;