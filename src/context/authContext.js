import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const intialUserValue = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: 0,
    role: "",
    password: "",
};

const intialState = {
    setUser: () => {},
    user: intialUserValue,
    signOut: () => {},
};

export const AuthContext = createContext(intialState);

const AuthWrapper = ({ children }) => {
    const [userData, setUserData] = useState();
   

    const setUser = (data) => {
        console.log("data1111", data);
        Cookies.set("userInfo", JSON.stringify(data));
        localStorage.setItem("userInfo", JSON.stringify(data)); // Set data in localStorage
        setUserData(data);
    };

    const signOut = () => {
        localStorage.removeItem("userInfo"); // Remove data from localStorage when signing out
        setUserData(intialUserValue);
    };
    let value = {
        user: userData,
        setUser,
        signOut,
    };
    

    useEffect(() => {
            const data = JSON.parse(localStorage.getItem("userInfo")) || intialUserValue;

            if (!data.email){
                console.log("email");
            }
            setUserData(data);
    },[]);
    console.log("dataxx",userData);
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthWrapper;

export const useAuthContext = () =>{
    return useContext(AuthContext);
};


// import Cookies from "js-cookie";
// import React, { createContext, useState } from "react";

// const intialUserValue = {
//     id: 0,
//     email: "",
//     firstName: "",
//     lastName: "",
//     roleId: 0,
//     role: "",
//     password: "",
// };

// const intialState = {
//     setUser: () => {},
//     user: intialUserValue,
//     signOut: () => {},
// };

// export const AuthContext = createContext(intialState);

// const AuthWrapper = ({ children }) => {
//     const [userData, setUserData] = useState();

//     const setUser = (data) => {
//         console.log("data1111", data);
//        // Cookies.set("userInfo", JSON.stringify(data));
//         setUserData(data);
//     };
//     const signOut = () => {
//        // Cookies.set("userInfo", {});
//     };

//     let value = {
//         setUser,
//         userData,
//         signOut,
//     };
    
//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default AuthWrapper;
