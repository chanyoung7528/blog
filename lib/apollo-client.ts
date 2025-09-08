import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const isPreview = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === "true";

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
    headers: {
      Authorization: `Bearer ${
        isPreview
          ? process.env.NEXT_CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
      }`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
