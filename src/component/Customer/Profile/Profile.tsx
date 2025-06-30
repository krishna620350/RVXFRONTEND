import React from 'react';
import useResponsive from '../../../hooks/useResponsive';
import ProfileDesktop from './ProfileDesktop';
import ProfileMobile from './ProfileMobile';

const Profile: React.FC = () => {
  const isMobile = useResponsive();

  return isMobile ? <ProfileMobile /> : <ProfileDesktop />;
};

export default Profile; 