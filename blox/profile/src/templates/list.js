import { graphql } from "gatsby";
import ProfilesPage from "../components/list";

export default ProfilesPage;

export const query = graphql`
  query ProfilesQuery {
    site {
      siteMetadata {
        title
      }
    }
    allProfile(sort: { fields: [name], order: DESC }, limit: 1000) {
      nodes {
        id
        slug
        name
      }
    }
  }
`;
