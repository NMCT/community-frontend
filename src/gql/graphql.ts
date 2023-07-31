/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  /** The ObjectId scalar type represents a 12 byte ObjectId, represented as UTF-8 character sequences. */
  ObjectId: { input: any; output: any; }
  URL: { input: any; output: any; }
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Event = {
  __typename?: 'Event';
  attendees?: Maybe<Array<ShortUser>>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  endDate: Scalars['DateTime']['output'];
  id?: Maybe<Scalars['ObjectId']['output']>;
  interested?: Maybe<Array<ShortUser>>;
  location: Scalars['String']['output'];
  maxAttendees: Scalars['Int']['output'];
  openToGuests: Scalars['Boolean']['output'];
  organizer: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  type: EventType;
  updatedOn?: Maybe<Scalars['DateTime']['output']>;
};

export type EventFilterInput = {
  and?: InputMaybe<Array<EventFilterInput>>;
  attendees?: InputMaybe<ListFilterInputTypeOfShortUserFilterInput>;
  createdOn?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  endDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<ObjectIdOperationFilterInput>;
  interested?: InputMaybe<ListFilterInputTypeOfShortUserFilterInput>;
  location?: InputMaybe<StringOperationFilterInput>;
  maxAttendees?: InputMaybe<IntOperationFilterInput>;
  openToGuests?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<EventFilterInput>>;
  organizer?: InputMaybe<StringOperationFilterInput>;
  startDate?: InputMaybe<DateTimeOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  type?: InputMaybe<EventTypeOperationFilterInput>;
  updatedOn?: InputMaybe<DateTimeOperationFilterInput>;
};

export type EventInput = {
  attendees?: InputMaybe<Array<ShortUserInput>>;
  createdOn?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  endDate: Scalars['DateTime']['input'];
  id?: InputMaybe<Scalars['ObjectId']['input']>;
  interested?: InputMaybe<Array<ShortUserInput>>;
  location: Scalars['String']['input'];
  maxAttendees: Scalars['Int']['input'];
  openToGuests: Scalars['Boolean']['input'];
  organizer: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
  type: EventType;
  updatedOn?: InputMaybe<Scalars['DateTime']['input']>;
};

export type EventSortInput = {
  createdOn?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  endDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  location?: InputMaybe<SortEnumType>;
  maxAttendees?: InputMaybe<SortEnumType>;
  openToGuests?: InputMaybe<SortEnumType>;
  organizer?: InputMaybe<SortEnumType>;
  startDate?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
  updatedOn?: InputMaybe<SortEnumType>;
};

export enum EventType {
  Community = 'COMMUNITY',
  Official = 'OFFICIAL'
}

export type EventTypeOperationFilterInput = {
  eq?: InputMaybe<EventType>;
  in?: InputMaybe<Array<EventType>>;
  neq?: InputMaybe<EventType>;
  nin?: InputMaybe<Array<EventType>>;
};

export type EventUpdateInput = {
  link?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  sendUpdate: Scalars['Boolean']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  updateAudience?: InputMaybe<UpdateAudience>;
};

/** A segment of a collection. */
export type EventsCollectionSegment = {
  __typename?: 'EventsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Event>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type ListFilterInputTypeOfShortUserFilterInput = {
  all?: InputMaybe<ShortUserFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ShortUserFilterInput>;
  some?: InputMaybe<ShortUserFilterInput>;
};

export type ListObjectIdOperationFilterInput = {
  all?: InputMaybe<ObjectIdOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ObjectIdOperationFilterInput>;
  some?: InputMaybe<ObjectIdOperationFilterInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  attendEvent: Event;
  createEvent: Event;
  deleteUser: Scalars['Boolean']['output'];
  firstLogin: User;
  interestedEvent: Event;
  readNotification: Notification;
  showInterest: User;
  unattendEvent: Event;
  uninterestedEvent: Event;
  updateEvent: Event;
  updateSocials: User;
};


export type MutationAttendEventArgs = {
  eventId: Scalars['String']['input'];
  idToken: Scalars['String']['input'];
  user: ShortUserInput;
};


export type MutationCreateEventArgs = {
  input: EventInput;
};


export type MutationDeleteUserArgs = {
  idToken: Scalars['String']['input'];
};


export type MutationFirstLoginArgs = {
  idToken: Scalars['String']['input'];
};


export type MutationInterestedEventArgs = {
  eventId: Scalars['String']['input'];
  user: ShortUserInput;
};


export type MutationReadNotificationArgs = {
  id: Scalars['String']['input'];
  idToken: Scalars['String']['input'];
};


export type MutationShowInterestArgs = {
  eventId: Scalars['String']['input'];
  idToken: Scalars['String']['input'];
};


export type MutationUnattendEventArgs = {
  eventId: Scalars['String']['input'];
  user: ShortUserInput;
};


export type MutationUninterestedEventArgs = {
  eventId: Scalars['String']['input'];
  user: ShortUserInput;
};


export type MutationUpdateEventArgs = {
  input: EventInput;
  update?: InputMaybe<EventUpdateInput>;
};


export type MutationUpdateSocialsArgs = {
  idToken: Scalars['String']['input'];
  socials: SocialsInput;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime']['output'];
  eventId?: Maybe<Scalars['ObjectId']['output']>;
  id?: Maybe<Scalars['ObjectId']['output']>;
  isRead: Scalars['Boolean']['output'];
  link?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ObjectIdOperationFilterInput = {
  eq?: InputMaybe<Scalars['ObjectId']['input']>;
  gt?: InputMaybe<Scalars['ObjectId']['input']>;
  gte?: InputMaybe<Scalars['ObjectId']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  lt?: InputMaybe<Scalars['ObjectId']['input']>;
  lte?: InputMaybe<Scalars['ObjectId']['input']>;
  neq?: InputMaybe<Scalars['ObjectId']['input']>;
  ngt?: InputMaybe<Scalars['ObjectId']['input']>;
  ngte?: InputMaybe<Scalars['ObjectId']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  nlt?: InputMaybe<Scalars['ObjectId']['input']>;
  nlte?: InputMaybe<Scalars['ObjectId']['input']>;
};

export type Query = {
  __typename?: 'Query';
  event?: Maybe<Event>;
  eventPublic?: Maybe<Event>;
  events?: Maybe<EventsCollectionSegment>;
  eventsPublic: Array<Event>;
  notifications: Array<Notification>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryEventArgs = {
  id: Scalars['String']['input'];
};


export type QueryEventPublicArgs = {
  id: Scalars['String']['input'];
};


export type QueryEventsArgs = {
  order?: InputMaybe<Array<EventSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventFilterInput>;
};


export type QueryNotificationsArgs = {
  idToken: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};

export type ShortUser = {
  __typename?: 'ShortUser';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ObjectId']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<Scalars['String']['output']>;
  uid: Scalars['String']['output'];
};

export type ShortUserFilterInput = {
  and?: InputMaybe<Array<ShortUserFilterInput>>;
  email?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ObjectIdOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ShortUserFilterInput>>;
  profilePicture?: InputMaybe<StringOperationFilterInput>;
  uid?: InputMaybe<StringOperationFilterInput>;
};

export type ShortUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ObjectId']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  uid: Scalars['String']['input'];
};

export type Socials = {
  __typename?: 'Socials';
  discord: Scalars['String']['output'];
  facebook: Scalars['URL']['output'];
  instagram: Scalars['URL']['output'];
  linkedIn: Scalars['URL']['output'];
};

export type SocialsFilterInput = {
  and?: InputMaybe<Array<SocialsFilterInput>>;
  discord?: InputMaybe<StringOperationFilterInput>;
  facebook?: InputMaybe<UrlOperationFilterInput>;
  instagram?: InputMaybe<UrlOperationFilterInput>;
  linkedIn?: InputMaybe<UrlOperationFilterInput>;
  or?: InputMaybe<Array<SocialsFilterInput>>;
};

export type SocialsInput = {
  discord: Scalars['String']['input'];
  facebook: Scalars['URL']['input'];
  instagram: Scalars['URL']['input'];
  linkedIn: Scalars['URL']['input'];
};

export type SocialsSortInput = {
  discord?: InputMaybe<SortEnumType>;
  facebook?: InputMaybe<UriSortInput>;
  instagram?: InputMaybe<UriSortInput>;
  linkedIn?: InputMaybe<UriSortInput>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onEventChanged: Notification;
};

export enum UpdateAudience {
  All = 'ALL',
  Attendees = 'ATTENDEES',
  Interested = 'INTERESTED',
  None = 'NONE'
}

export type UriSortInput = {
  absolutePath?: InputMaybe<SortEnumType>;
  absoluteUri?: InputMaybe<SortEnumType>;
  authority?: InputMaybe<SortEnumType>;
  dnsSafeHost?: InputMaybe<SortEnumType>;
  fragment?: InputMaybe<SortEnumType>;
  host?: InputMaybe<SortEnumType>;
  hostNameType?: InputMaybe<SortEnumType>;
  idnHost?: InputMaybe<SortEnumType>;
  isAbsoluteUri?: InputMaybe<SortEnumType>;
  isDefaultPort?: InputMaybe<SortEnumType>;
  isFile?: InputMaybe<SortEnumType>;
  isLoopback?: InputMaybe<SortEnumType>;
  isUnc?: InputMaybe<SortEnumType>;
  localPath?: InputMaybe<SortEnumType>;
  originalString?: InputMaybe<SortEnumType>;
  pathAndQuery?: InputMaybe<SortEnumType>;
  port?: InputMaybe<SortEnumType>;
  query?: InputMaybe<SortEnumType>;
  scheme?: InputMaybe<SortEnumType>;
  userEscaped?: InputMaybe<SortEnumType>;
  userInfo?: InputMaybe<SortEnumType>;
};

export type UrlOperationFilterInput = {
  eq?: InputMaybe<Scalars['URL']['input']>;
  gt?: InputMaybe<Scalars['URL']['input']>;
  gte?: InputMaybe<Scalars['URL']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['URL']['input']>>>;
  lt?: InputMaybe<Scalars['URL']['input']>;
  lte?: InputMaybe<Scalars['URL']['input']>;
  neq?: InputMaybe<Scalars['URL']['input']>;
  ngt?: InputMaybe<Scalars['URL']['input']>;
  ngte?: InputMaybe<Scalars['URL']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['URL']['input']>>>;
  nlt?: InputMaybe<Scalars['URL']['input']>;
  nlte?: InputMaybe<Scalars['URL']['input']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  eventsAttending?: Maybe<Array<Scalars['ObjectId']['output']>>;
  eventsInterested?: Maybe<Array<Scalars['ObjectId']['output']>>;
  firebaseId: Scalars['String']['output'];
  id?: Maybe<Scalars['ObjectId']['output']>;
  profilePictureUri?: Maybe<Scalars['String']['output']>;
  socials?: Maybe<Socials>;
  type: UserType;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserFilterInput = {
  and?: InputMaybe<Array<UserFilterInput>>;
  email?: InputMaybe<StringOperationFilterInput>;
  eventsAttending?: InputMaybe<ListObjectIdOperationFilterInput>;
  eventsInterested?: InputMaybe<ListObjectIdOperationFilterInput>;
  firebaseId?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ObjectIdOperationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  profilePictureUri?: InputMaybe<StringOperationFilterInput>;
  socials?: InputMaybe<SocialsFilterInput>;
  type?: InputMaybe<UserTypeOperationFilterInput>;
  username?: InputMaybe<StringOperationFilterInput>;
};

export type UserSortInput = {
  email?: InputMaybe<SortEnumType>;
  firebaseId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  profilePictureUri?: InputMaybe<SortEnumType>;
  socials?: InputMaybe<SocialsSortInput>;
  type?: InputMaybe<SortEnumType>;
  username?: InputMaybe<SortEnumType>;
};

export enum UserType {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  User = 'USER'
}

export type UserTypeOperationFilterInput = {
  eq?: InputMaybe<UserType>;
  in?: InputMaybe<Array<UserType>>;
  neq?: InputMaybe<UserType>;
  nin?: InputMaybe<Array<UserType>>;
};

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { __typename?: 'Query', events?: { __typename?: 'EventsCollectionSegment', items?: Array<{ __typename?: 'Event', id?: any | null, title: string, location: string }> | null } | null };

export type CreateEventMutationVariables = Exact<{
  input: EventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id?: any | null } };


export const GetEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]}}]}}]} as unknown as DocumentNode<GetEventsQuery, GetEventsQueryVariables>;
export const CreateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;