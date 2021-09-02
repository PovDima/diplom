import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { email } = useSelector((state) => state.users.user);

  return (
    <div className='container'>
      <p>
        Hey <b>{email}</b>
      </p>
    </div>
  );
};

export default Profile;
