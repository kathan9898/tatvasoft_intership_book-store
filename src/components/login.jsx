import React, { useContext } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from 'yup';
import authService from "../services/authService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { AuthContext } from "../context/authContext";

function Login() {
  const userContext = useContext(AuthContext);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().min(3).required("Password is required"),
  });

  const navigate = useNavigate();
  const handleLogin = async(values) => {
    const payload ={
        email:values.email,
        password:values.password,
    }
    await authService
    .Login(payload)
    .then((response) =>{
       if(response && response.status === 200)
       {
        navigate("/home");
           toast.success("user login",{position:"bottom-left",});
           Cookies.set("email",values.email);
           userContext.setUser(response.data.result);
           console.log("samplel",response.data.result.roleId);
           Cookies.set("role",response.data.result.roleId);
           Cookies.set("userId",response.data.result.id);
       }
    })
    .catch((error) => {
       console.log(error);
       toast.error("not found",{position:"bottom-left"});
    });
       };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {handleLogin(values)}}
    >
      {({ values, handleChange }) => (
        <Form>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#f4f4f4",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: 300,
                padding: 3,
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h5" align="center">
                Login Page
              </Typography>
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.email}
                onChange={handleChange}
                required
              />
              <FormHelperText>
                <ErrorMessage name="email" />
              </FormHelperText>
              <TextField
                label="Password"
                name="password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={values.password}
                onChange={handleChange}
                required
              />
              <FormHelperText>
                <ErrorMessage name="password" />
              </FormHelperText>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                sx={{ marginTop: 2 }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate('/form')}
                sx={{ marginTop: 1 }}
              >
                Register
              </Button>
            </Paper>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default Login;


// // import React, { useState } from "react";
// import {
//   Container,
//   Paper,
//   TextField,
//   Button,
//   Typography,
//   FormHelperText,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { ErrorMessage, Form, Formik } from "formik";
// import * as Yup from 'yup';

// function Login() {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
//   const validationSchema = Yup.object().shape({
//     email: Yup.string().required("Email Required"),
//     Password: Yup.string().required("Password Required"),
    
// });

//   const handleLogin = () => {
//     // Perform login logic here
//     console.log("Logging in...");
//   };
//   const navigate = useNavigate();
//   const handleRegister = () => {
//     navigate('/form');
    
//   };

//   return (
//     <Formik initialValues={{email:"",password:""}} 
//     validationSchema={validationSchema}
//     onSubmit={() => {}}>
//         {({values,setFieldValue}) => {
//                 console.log(values);
//         return (
//                     <Form>
//          <Container
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         backgroundColor: "#f4f4f4",
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           width: 300,
//           padding: 3,
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//           boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <Typography variant="h5" align="center">
//           Login Page
//         </Typography>
//         <TextField
//           label="Email"
//           name="email"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={values.email}
//           onChange={(e) => setFieldValue("email",e.target.value)}
//           required
//         />
//         <FormHelperText>
//             <ErrorMessage name="email" />
//         </FormHelperText>
//         <TextField
//           label="Password"
//           name="password"
//           variant="outlined"
//           type="password"
//           fullWidth
//           margin="normal"
//           value={values.password}
//           onChange={(e) => setFieldValue("password",e.target.value)}
//           required
//         />
//         <FormHelperText>
//             <ErrorMessage name="password" />
//         </FormHelperText>
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleLogin}
//           sx={{ marginTop: 2 }}
//         >
//           Login
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleRegister}
//           sx={{ marginTop: 1 }}
//         >
//           Register
//         </Button>
//       </Paper>
//     </Container>
//                     </Form>
//             )
//         }}
//     </Formik>
 
//   );
// }

// export default Login;
