import { graphql } from "gatsby";
import ProfilePage from "../components/profile";

export default ProfilePage;

export const query = graphql`
  query ProfilePageQuery($id: String!, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        title
      }
    }
    profile(id: { eq: $id }) {
      id
      slug
      name
      body
    }
    previous: profile(id: { eq: $previousId }) {
      id
      slug
      name
    }
    next: profile(id: { eq: $nextId }) {
      id
      slug
      name
    }
  }
`;
