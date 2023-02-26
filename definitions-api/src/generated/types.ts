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
  File: any;
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID'];
  categoryId: Scalars['Int'];
  ingredients: Array<Ingredient>;
  name: Scalars['String'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  _id: Scalars['ID'];
  category: Category;
  categoryId: Scalars['Int'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  getFileName?: Maybe<Scalars['String']>;
};


export type MutationGetFileNameArgs = {
  file: Scalars['File'];
};

export type Query = {
  __typename?: 'Query';
  allIngredients: Array<Ingredient>;
  categories: Array<Category>;
  hello?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  countdown: Scalars['Int'];
};


export type SubscriptionCountdownArgs = {
  from: Scalars['Int'];
};
