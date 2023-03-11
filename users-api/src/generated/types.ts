export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  user: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  hello: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  token?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  pin: Scalars['Int'];
  username: Scalars['String'];
};
