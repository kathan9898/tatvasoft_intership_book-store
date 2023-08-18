import React from 'react';
import WithAuth from '../layout/WithAuth';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Home = () => {
  const navigate = useNavigate();
  const containerStyle = { textAlign: 'center', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' };
  const headingStyle = { fontSize: '32px', marginBottom: '20px' };
  const descriptionStyle = { fontSize: '18px', color: '#666', marginBottom: '40px' };
  const buttonContainerStyle = { display: 'flex', justifyContent: 'center', marginBottom: '20px' };
  const discoverButtonStyle = { backgroundColor: 'green', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', textDecoration: 'none', marginRight: '20px' };
  const animationVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
  const userProfileButtonStyle = { backgroundColor: '#666', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', textDecoration: 'none' };

  const UserProfileButton = () => (
    <Link to="/userprofile">
      <motion.button style={userProfileButtonStyle} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <AccountCircleIcon style={{ fontSize: '24px', marginRight: '8px' }} />
        User Profile
      </motion.button>
    </Link>
  );

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to Book-e-Sell</h1>
      <p style={descriptionStyle}>Discover a wide range of books and sell or buy books online.</p>
      <div style={buttonContainerStyle}>
        <Link to="/books">
          <motion.button style={discoverButtonStyle} variants={animationVariants} initial="initial" animate="animate">
            Discover Books
          </motion.button>
        </Link>
        <UserProfileButton />
      </div>
    </div>
  );
};

export default WithAuth(Home);
