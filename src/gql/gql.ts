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
    "\n    mutation registerLogin($idToken: String!) {\n      firstLogin(idToken: $idToken) {\n        id\n        email\n        type\n      }\n    }\n  ": types.RegisterLoginDocument,
    "\n  mutation updateProfilePicture($input: String!) {\n    updateProfilePictureUri(uri: $input)\n  }\n": types.UpdateProfilePictureDocument,
    "\n  mutation attendEvent($eventId: String!) {\n    attendEvent(eventId: $eventId) {\n      id\n      attendees {\n        uid\n      }\n    }\n  }\n": types.AttendEventDocument,
    "\n  mutation unattendEvent($eventId: String!) {\n    unattendEvent(eventId: $eventId) {\n      id\n      attendees {\n        uid\n      }\n    }\n  }\n": types.UnattendEventDocument,
    "\n  mutation interestEvent($eventId: String!) {\n    interestedEvent(eventId: $eventId) {\n      id\n      interested {\n        uid\n      }\n    }\n  }\n": types.InterestEventDocument,
    "\n  mutation uninterestEvent($eventId: String!) {\n    uninterestedEvent(eventId: $eventId) {\n      id\n      interested {\n        uid\n      }\n    }\n  }\n": types.UninterestEventDocument,
    "\n  mutation changeUserName($username: String!) {\n    changeDisplayName(displayName: $username) {\n      id\n      username\n    }\n  }\n": types.ChangeUserNameDocument,
    "\n  query getUser($id: String!) {\n    user(uid: $id) {\n      id\n      profilePictureUri\n      email\n      username\n      socials {\n        discord\n        facebook\n        instagram\n        linkedIn\n      }\n      firebaseId\n    }\n  }\n": types.GetUserDocument,
    "\n  mutation changeSocials($socials: SocialsInput!) {\n    updateSocials(socials: $socials) {\n      id\n      socials {\n        discord\n        facebook\n        instagram\n        linkedIn\n      }\n    }\n  }\n": types.ChangeSocialsDocument,
    "\n    query getEvent($id: String!) {\n      event(id: $id) {\n        id\n        startDate\n        endDate\n        maxAttendees\n        updatedOn\n        type\n        createdOn\n        organizer {\n          profilePicture\n          name\n          uid\n        }\n        attendees {\n          profilePicture\n          name\n          uid\n        }\n        interested {\n          profilePicture\n          name\n          uid\n        }\n        description\n        audience\n        title\n        location\n      }\n    }\n  ": types.GetEventDocument,
    "\n    query getEvents(\n      $afterDate: DateTime\n      $audience: String\n      $order: SortEnumType\n      $query: String\n    ) {\n      events(\n        where: {\n          title: { contains: $query }\n          startDate: { gt: $afterDate }\n          audience: { contains: $audience }\n        }\n        order: { startDate: $order }\n      ) {\n        items {\n          id\n          startDate\n          attendees {\n            profilePicture\n            uid\n          }\n          interested {\n            profilePicture\n            uid\n          }\n          audience\n          title\n          location\n        }\n      }\n    }\n  ": types.GetEventsDocument,
    "\n    query getUpcomingEvents($afterDate: DateTime) {\n      eventsGuest(where: { startDate: { gt: $afterDate } }, take: 3) {\n        items {\n          id\n          startDate\n          attendees {\n            profilePicture\n            uid\n          }\n          interested {\n            profilePicture\n            uid\n          }\n          audience\n          title\n          location\n        }\n      }\n    }\n  ": types.GetUpcomingEventsDocument,
    "\n  mutation createNewEvent($input: EventInput!) {\n    createEvent(eventInput: $input) {\n      id\n      title\n      location\n      type\n      description\n      startDate\n      endDate\n      maxAttendees\n      openToGuests\n    }\n  }\n": types.CreateNewEventDocument,
    "\n  query getUserById($uid: String!) {\n    user(uid: $uid) {\n      firebaseId\n      email\n      profilePictureUri\n      username\n      socials {\n        discord\n        facebook\n        instagram\n        linkedIn\n      }\n    }\n  }\n": types.GetUserByIdDocument,
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
export function graphql(source: "\n    mutation registerLogin($idToken: String!) {\n      firstLogin(idToken: $idToken) {\n        id\n        email\n        type\n      }\n    }\n  "): (typeof documents)["\n    mutation registerLogin($idToken: String!) {\n      firstLogin(idToken: $idToken) {\n        id\n        email\n        type\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateProfilePicture($input: String!) {\n    updateProfilePictureUri(uri: $input)\n  }\n"): (typeof documents)["\n  mutation updateProfilePicture($input: String!) {\n    updateProfilePictureUri(uri: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation attendEvent($eventId: String!) {\n    attendEvent(eventId: $eventId) {\n      id\n      attendees {\n        uid\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation attendEvent($eventId: String!) {\n    attendEvent(eventId: $eventId) {\n      id\n      attendees {\n        uid\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation unattendEvent($eventId: String!) {\n    unattendEvent(eventId: $eventId) {\n      id\n      attendees {\n        uid\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation unattendEvent($eventId: String!) {\n    unattendEvent(eventId: $eventId) {\n      id\n      attendees {\n        uid\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation interestEvent($eventId: String!) {\n    interestedEvent(eventId: $eventId) {\n      id\n      interested {\n        uid\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation interestEvent($eventId: String!) {\n    interestedEvent(eventId: $eventId) {\n      id\n      interested {\n        uid\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uninterestEvent($eventId: String!) {\n    uninterestedEvent(eventId: $eventId) {\n      id\n      interested {\n        uid\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation uninterestEvent($eventId: String!) {\n    uninterestedEvent(eventId: $eventId) {\n      id\n      interested {\n        uid\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation changeUserName($username: String!) {\n    changeDisplayName(displayName: $username) {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  mutation changeUserName($username: String!) {\n    changeDisplayName(displayName: $username) {\n      id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUser($id: String!) {\n    user(uid: $id) {\n      id\n      profilePictureUri\n      email\n      username\n      socials {\n        discord\n        facebook\n        instagram\n        linkedIn\n      }\n      firebaseId\n    }\n  }\n"): (typeof documents)["\n  query getUser($id: String!) {\n    user(uid: $id) {\n      id\n      profilePictureUri\n      email\n      username\n      socials {\n        discord\n        facebook\n        instagram\n        linkedIn\n      }\n      firebaseId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation changeSocials($socials: SocialsInput!) {\n    updateSocials(socials: $socials) {\n      id\n      socials {\n        discord\n        facebook\n        instagram\n        linkedIn\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation changeSocials($socials: SocialsInput!) {\n    updateSocials(socials: $socials) {\n      id\n      socials {\n        discord\n        facebook\n        instagram\n        linkedIn\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getEvent($id: String!) {\n      event(id: $id) {\n        id\n        startDate\n        endDate\n        maxAttendees\n        updatedOn\n        type\n        createdOn\n        organizer {\n          profilePicture\n          name\n          uid\n        }\n        attendees {\n          profilePicture\n          name\n          uid\n        }\n        interested {\n          profilePicture\n          name\n          uid\n        }\n        description\n        audience\n        title\n        location\n      }\n    }\n  "): (typeof documents)["\n    query getEvent($id: String!) {\n      event(id: $id) {\n        id\n        startDate\n        endDate\n        maxAttendees\n        updatedOn\n        type\n        createdOn\n        organizer {\n          profilePicture\n          name\n          uid\n        }\n        attendees {\n          profilePicture\n          name\n          uid\n        }\n        interested {\n          profilePicture\n          name\n          uid\n        }\n        description\n        audience\n        title\n        location\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getEvents(\n      $afterDate: DateTime\n      $audience: String\n      $order: SortEnumType\n      $query: String\n    ) {\n      events(\n        where: {\n          title: { contains: $query }\n          startDate: { gt: $afterDate }\n          audience: { contains: $audience }\n        }\n        order: { startDate: $order }\n      ) {\n        items {\n          id\n          startDate\n          attendees {\n            profilePicture\n            uid\n          }\n          interested {\n            profilePicture\n            uid\n          }\n          audience\n          title\n          location\n        }\n      }\n    }\n  "): (typeof documents)["\n    query getEvents(\n      $afterDate: DateTime\n      $audience: String\n      $order: SortEnumType\n      $query: String\n    ) {\n      events(\n        where: {\n          title: { contains: $query }\n          startDate: { gt: $afterDate }\n          audience: { contains: $audience }\n        }\n        order: { startDate: $order }\n      ) {\n        items {\n          id\n          startDate\n          attendees {\n            profilePicture\n            uid\n          }\n          interested {\n            profilePicture\n            uid\n          }\n          audience\n          title\n          location\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getUpcomingEvents($afterDate: DateTime) {\n      eventsGuest(where: { startDate: { gt: $afterDate } }, take: 3) {\n        items {\n          id\n          startDate\n          attendees {\n            profilePicture\n            uid\n          }\n          interested {\n            profilePicture\n            uid\n          }\n          audience\n          title\n          location\n        }\n      }\n    }\n  "): (typeof documents)["\n    query getUpcomingEvents($afterDate: DateTime) {\n      eventsGuest(where: { startDate: { gt: $afterDate } }, take: 3) {\n        items {\n          id\n          startDate\n          attendees {\n            profilePicture\n            uid\n          }\n          interested {\n            profilePicture\n            uid\n          }\n          audience\n          title\n          location\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createNewEvent($input: EventInput!) {\n    createEvent(eventInput: $input) {\n      id\n      title\n      location\n      type\n      description\n      startDate\n      endDate\n      maxAttendees\n      openToGuests\n    }\n  }\n"): (typeof documents)["\n  mutation createNewEvent($input: EventInput!) {\n    createEvent(eventInput: $input) {\n      id\n      title\n      location\n      type\n      description\n      startDate\n      endDate\n      maxAttendees\n      openToGuests\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUserById($uid: String!) {\n    user(uid: $uid) {\n      firebaseId\n      email\n      profilePictureUri\n      username\n      socials {\n        discord\n        facebook\n        instagram\n        linkedIn\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUserById($uid: String!) {\n    user(uid: $uid) {\n      firebaseId\n      email\n      profilePictureUri\n      username\n      socials {\n        discord\n        facebook\n        instagram\n        linkedIn\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;