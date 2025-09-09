import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query GetAllPosts($limit: Int = 10, $skip: Int = 0) {
    pageBlogPostCollection(limit: $limit, skip: $skip) {
      items {
        sys {
          id
        }
        title
        slug
        shortDescription
        featuredImage {
          url
        }
        content
        publishedDate
        tags
        category
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    pageBlogPostCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
        }
        title
        slug
        shortDescription
        featuredImage {
          url
        }
        content
        publishedDate
        tags
        category
      }
    }
  }
`;
