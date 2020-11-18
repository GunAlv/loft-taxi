import React from 'react';
import getClass from '../../utils/getClass';

const Profile = (props) => (
  <div className={getClass("profile", props)}>
      <h1>Профиль</h1>
  </div>
);

export default Profile;
