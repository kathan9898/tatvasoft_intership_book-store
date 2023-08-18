import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  const userId = cookies.userId;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`https://book-e-sell-node-api.vercel.app/api/user/byId?id=${userId}`);
        setUserInfo(response.data.result);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
  };

  const tableStyle = {
    width: '50%',
    margin: 'auto',
    border: '1px solid #ddd',
    borderRadius: '6px',
  };

  const tableHeaderStyle = {
    background: '#f2f2f2',
    padding: '8px',
    borderBottom: '1px solid #ddd',
  };

  const tableCellStyle = {
    padding: '8px',
    borderBottom: '1px solid #ddd',
  };

  const logoutButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  };

  const handleLogout = () => {
    removeCookie('userId');
    removeCookie('email');
    removeCookie('userInfo');
    removeCookie('role');
    window.location.href = '/'; 
  };

  return (
    <div style={containerStyle}>
      <h1>User Profile</h1>
      {userInfo && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Cradentials</th>
              <th style={tableHeaderStyle}>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tableCellStyle}><strong>Email:</strong></td>
              <td style={tableCellStyle}>{userInfo.email}</td>
            </tr>
            <tr>
              <td style={tableCellStyle}><strong>First Name:</strong></td>
              <td style={tableCellStyle}>{userInfo.firstName}</td>
            </tr>
            <tr>
              <td style={tableCellStyle}><strong>Last Name:</strong></td>
              <td style={tableCellStyle}>{userInfo.lastName}</td>
            </tr>
            <tr>
              <td style={tableCellStyle}><strong>Role:</strong></td>
              <td style={tableCellStyle}>{userInfo.role}</td>
            </tr>
          </tbody>
        </table>
      )}<br></br>
      <motion.button
        style={logoutButtonStyle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.0 }}
        onClick={handleLogout}
      >
        Logout
      </motion.button>
    </div>
  );
};

export default UserProfile;
