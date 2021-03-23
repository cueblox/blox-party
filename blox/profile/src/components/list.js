import React from "react";
import { Link } from "gatsby";

const Profiles = ({ data }) => {
  const profiles = data.allProfile.nodes;

  return (
    <main>
      {profiles.map((profile) => (
        <Link to={profile.slug}>{profile.name}</Link>
      ))}
    </main>
  );
};

export default Profiles;
