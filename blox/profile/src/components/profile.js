import React from "react";

const Profile = ({ data }) => {
  const profile = data.profile;

  return (
    <main>
      <article className="profile">
        <header>
          <p>Name: {profile.name}</p>
        </header>
        <section className="profile-body">{profile.body}</section>
      </article>
    </main>
  );
};

export default Profile;
