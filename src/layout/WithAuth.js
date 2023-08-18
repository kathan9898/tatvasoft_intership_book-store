import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Make sure to import the Cookies library

const WithAuth = (Component) => {
    const Authentication = () => {
        const email = Cookies.get("email");
        const navigate = useNavigate();

        useEffect(() => {
            if (!email) {
                navigate("/");
            }
        }, [email]);

        return email ? (<Component />) : null;
    };

    return Authentication;
};

export default WithAuth;
