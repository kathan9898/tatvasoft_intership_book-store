import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Button, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthWrapper, { useAuthContext } from './context/authContext';
import Body from './components/Bodyc';
import Home from './components/Home';
import Login from './components/login';
import Logo from './logo.svg';
import Error from './components/error';
import Form from './components/Form';
import EditBook from './components/editbook';
//import Crud from './components/Crud';
import Hme from './components/edit';
import CreateBookPage from './components/Crud';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import Cart from './components/cart'
import UserProfile from './components/userprofile';

function App() {
  const { user } = useAuthContext();

  React.useEffect(() => {
    console.log("User Data:", user);
    const cookies = document.cookie.split(';');
    const userInfoCookie = cookies.find(cookie => cookie.trim().startsWith('userInfo='));
    if (userInfoCookie) {
      const userInfoValue = userInfoCookie.split('=')[1];
      const decodedUserInfo = decodeURIComponent(userInfoValue);
      const userInfoObject = JSON.parse(decodedUserInfo);
      console.log("Decoded User Info:", userInfoObject);
    }
  }, [user]);

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: 'red',
            fontFamily: 'cursive',
          },
        },
      },
    },
  });
  const cartButtonStyle = {
    position: 'absolute',
    top: '50px',
    right: '50px',
    display: 'flex',
    alignItems: 'center',
     // Align the icon and text vertically
  };

  const cartIconStyle = {
    marginRight: '5px',
    fontSize:'50px',
    border: '1px solid #007bff', // Add border around the icon
    borderRadius: '50%', // Make the border a circle shape
    padding: '5px',
  };



  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
        }}
      >
        <img style={{ height: 100 }} src={Logo} alt='logo' />
      </div>

      <ThemeProvider theme={theme}>
        <AuthWrapper>
          <BrowserRouter>
            <ToastContainer />
            <div
              style={{
                paddingLeft: 170,
                display: 'flex',
                justifyContent: 'space-between',
                width: 160,
              }}
            >
              <NavLink to='/home'>Home</NavLink>
              <NavLink to='/books'>Books</NavLink>
              <NavLink to='/form'>Form</NavLink>
              <div style={cartButtonStyle}>
        <NavLink to='/cart' style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <ShoppingCartIcon style={cartIconStyle} />cart {/* Cart icon */}
          {/* <Button variant="outlined" color="primary" style={{backgroundColor:"white"}}>
            Cart
          </Button> */}
        </NavLink>
      </div>
            </div>
            <div
              style={{
                overflowY: 'auto', // Enable vertical scrolling
                height: 'calc(100vh - 100px)', // Adjust the height to ensure content is scrollable
              }}
            >
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/crud' element={<CreateBookPage />} />
                <Route path='/userprofile' element={<UserProfile />}/>
                <Route path='/editbook' element={<EditBook />} />
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='/home' element={<Home />} />
                <Route path='/edit/:bookId' element={<Hme />} />
                <Route path='/books' element={<Body />} />
                <Route path='/form' element={<Form />} />
                <Route path='*' element={<Error />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AuthWrapper>
      </ThemeProvider>
    </div>
  );
}

export default App;

// import React from 'react';
// import './App.css';
// import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
// import { ThemeProvider } from '@emotion/react';
// import { createTheme } from '@mui/material';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AuthWrapper, { useAuthContext } from './context/authContext';
// import Body from './components/Bodyc';
// import Home from './components/Home';
// import Login from './components/login';
// import Logo from './logo.svg';
// import Error from './components/error';
// import Form from './components/Form';

// function App() {
//   const { user } = useAuthContext();

//   // This useEffect will log the user data once it's fetched and set in the context
//   React.useEffect(() => {
//     console.log("User Data:", user);
//     const cookies = document.cookie.split(';');
//     const userInfoCookie = cookies.find(cookie => cookie.trim().startsWith('userInfo='));
//     if (userInfoCookie) {
//       const userInfoValue = userInfoCookie.split('=')[1];
//       const decodedUserInfo = decodeURIComponent(userInfoValue);
//       const userInfoObject = JSON.parse(decodedUserInfo);
//       console.log("Decoded User Info:", userInfoObject);
//     }
//   }, [user]);

//   const theme = createTheme({
//     components: {
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             backgroundColor: 'red',
//             fontFamily: 'cursive',
//           },
//         },
//       },
//     },
//   });

//   return (
//     <div>
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100px',
//         }}
//       >
//         <img style={{ height: 100 }} src={Logo} alt='logo' />
//       </div>

//       <ThemeProvider theme={theme}>
//         <AuthWrapper>
//           <BrowserRouter>
//             <ToastContainer />
//             <div
//               style={{
//                 paddingLeft: 170,
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 width: 160,
//               }}
//             >
//               <NavLink to='/home'>Home</NavLink>
//               <NavLink to='/books'>Books</NavLink>
//               <NavLink to='/form'>Form</NavLink>
//             </div>
//             <Routes>
//               <Route path='/' element={<Login />} />
//               <Route path='/home' element={<Home />} />
//               <Route path='/books' element={<Body />} />
//               <Route path='/form' element={<Form />} />
//               <Route path='*' element={<Error />} />
//             </Routes>
//           </BrowserRouter>
//         </AuthWrapper>
//       </ThemeProvider>
//     </div>
//   );
// }

// export default App;


// import React, { createContext } from 'react';
// import './App.css';
// import Body from './components/Bodyc';
// import Home from './components/Home';
// import Login from './components/login';
// import Logo from './logo.svg';
// import Error from './components/error';
// import { BrowserRouter,Routes,Route, NavLink } from "react-router-dom";
// import Form from './components/Form';
// import { ThemeProvider } from '@emotion/react';
// import { createTheme } from '@mui/material';
// import { ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
// import AuthWrapper from './context/authContext';

// export const userData = createContext();

// function App() {
//   const theme = createTheme({
// components:{
//   MuiButton:{
//     styleOverrides:{
//       root:{
//         backgroundColor:"red",
//         fontFamily:"cursive",
//       }
//     }
//   }
// }

//   })
//   return (
//     <div>
//       <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center', // Center the logo horizontally
//         alignItems: 'center', // Center the logo vertically
//         height: '100px', // Set a fixed height
//       }}>
//       <img style={{height:100}} src={Logo} alt='logo'/></div>
//    {/* <a style={{marginRight:10,display:'-ms-flexbox',width:100}} href="/">Home</a> 
//     <a href="/body">Body</a> */}
//     <ThemeProvider theme={theme}>
//       {/* <userData.Provider value={{name: "kp"}}> */}
//       <AuthWrapper>
//  <BrowserRouter>
//  <ToastContainer />
//  <div style={{
// paddingLeft:170,
// display:'flex',
// justifyContent:'space-between',
// width:160,

//  }}>
//  <NavLink to='/home'>Home</NavLink>
//  <NavLink to='/body'>Body</NavLink>
//  <NavLink to='/form'>Form</NavLink>
//  </div>
//  <Routes>
//     <Route path='/' element={<Login />}></Route>
//     <Route path='/home' element={<Home />}></Route>
//     <Route path='/body' element={<Body />}></Route>
//     <Route path='/form' element={<Form />}></Route>
//     <Route path='*' element={<Error />}></Route>
//  </Routes>
//  </BrowserRouter>
//  </AuthWrapper>
//  </ThemeProvider>
//  </div>
//   );
// }

// export default App;
