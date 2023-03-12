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

export type CreatePizzaInput = {
  ingredients: Array<IngredientInput>;
  name?: InputMaybe<Scalars['String']>;
  userId: Scalars['ID'];
};

export type CreatePizzaResult = Error | Pizza;

export type Error = {
  __typename?: 'Error';
  errorCode?: Maybe<Scalars['Int']>;
  errorMessage: Scalars['String'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  _id: Scalars['ID'];
  definitionId: Scalars['ID'];
};

export type IngredientInput = {
  definitionId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPizza: CreatePizzaResult;
};


export type MutationCreatePizzaArgs = {
  createPizzaInput: CreatePizzaInput;
};

export type Pizza = {
  __typename?: 'Pizza';
  _id: Scalars['ID'];
  ingredients: Array<Ingredient>;
  name?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
};
