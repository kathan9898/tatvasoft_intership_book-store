import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormHelperText,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import authService from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Form1 = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("2"); // Default role is "Buyer"

  const validationSchema = Yup.object().shape({
    UserName: Yup.string().required("UserName Required"),
    age: Yup.number().min(18).required("Age Required"),
    email: Yup.string().required("Email Required"),
    Password: Yup.string().required("Password Required"),
  });

  const HandleClick = async (values) => {
    const payload = {
      firstName: values.UserName,
      lastName: "test",
      email: values.email,
      roleId: parseInt(userRole), // Convert userRole to integer
      password: values.Password,
    };

    await authService
      .Register(payload)
      .then((response) => {
        if (response && response.status === 200) {
          toast.success("User created", { position: "bottom-left" });
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("User registration failed", { position: "bottom-left" });
      });
  };

  return (
    <Formik
      initialValues={{
        UserName: "",
        age: "",
        email: "",
        Password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => HandleClick(values)}
    >
      {({ values, errors, setFieldValue }) => {
        return (
          <Form>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50%", // Center vertically
              }}
            >
              <div
                style={{
                  paddingLeft: 100,
                  paddingTop: 50,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: 300,
                  gap: 10,
                }}
              >
                <Typography variant="h5">Register Here!</Typography>
                <TextField
                  label="UserName"
                  name="UserName"
                  variant="outlined"
                  value={values.UserName}
                  onChange={(e) => setFieldValue("UserName", e.target.value)}
                  required
                />
                <FormHelperText error>
                  <ErrorMessage name="UserName" />
                </FormHelperText>

                <TextField
                  label="Age"
                  name="age"
                  variant="outlined"
                  value={values.age}
                  onChange={(e) => setFieldValue("age", e.target.value)}
                  required
                />
                <FormHelperText error>
                  <ErrorMessage name="age" />
                </FormHelperText>

                <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={values.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  required
                />
                <FormHelperText error>
                  <ErrorMessage name="email" />
                </FormHelperText>

                <TextField
                  type="password"
                  name="Password"
                  label="Password"
                  variant="outlined"
                  value={values.Password}
                  onChange={(e) => setFieldValue("Password", e.target.value)}
                  required
                />
                <FormHelperText error>
                  <ErrorMessage name="Password" />
                </FormHelperText>

                <Select
                  label="Role"
                  name="role"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  required
                >
                  <MenuItem value="2">Buyer</MenuItem>
                  <MenuItem value="3">Seller</MenuItem>
                </Select>

                <Button variant="contained" type="submit">
                  Register
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Form1;









// import { Button, FormHelperText, TextField, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import {Formik,Form, ErrorMessage} from "formik";
// import * as Yup from "yup";

// const Form1 =() =>{
//     const [UserName,setUserName] = useState("");
//     const [Password,setPassword] = useState("");
//     const [userDetails,setDetails] = useState({
//         UserName:"",
//         age:"",
//         email:"",
//         Password:"",
//     });
//     useEffect(() => {
//         console.log("call");
//     },[])
//     const validationSchema =Yup.object().shape({
//         UserName:Yup.string().required("UserName Required"),
//         age:Yup.string().required("Age Required"),
//         email:Yup.string().required("Email Required"),
//         Password:Yup.string().required("Password Required"),
//     })
//     const HandleClick =() =>{
//              console.log("user:",userDetails.UserName);
//              console.log("age:",userDetails.age);
//              console.log("Email:",userDetails.Email);
//              console.log("pwd:",userDetails.Password);
//     }
//     return(
//         <Formik initialValues={{UserName: "",age: "",Email: "",Password: ""}}
//         validationSchema={validationSchema}
//         onSubmit={(values)=>HandleClick()}
//         >
//             { ({values,errors,setFieldValue})=> {
//                 console.log("errors:",errors);
//                 return (
//                     <Form>
//                     <div style={{paddingLeft:100,paddingTop:50,display:'flex',flexDirection:'column',width:300,gap:10}}>
//                     <Typography varient="h1">Login Here!</Typography>
//                     <TextField label="UserName"
//                      name="UserName"
//                       variant="outlined" 
//                       value={values.UserName}
//                          onChange={(e) => setFieldValue("UserName",e.target.value)}
//                          required
//                          ></TextField>
//                          {/* <FormHelperText error>
//                             <ErrorMessage name="age" />
//                          </FormHelperText> */}
                    
//                     {/* <TextField label="UserName" name="UserName" variant="outlined" value={userDetails.UserName} onChange={(e) => setDetails((prev) => ({...prev,UserName:e.target.value}))}></TextField> */}
//                     <TextField label="age" 
//                     name="age" 
//                     variant="outlined" 
//                     value={values.age} 
//                     onChange={(e) => setFieldValue("age",e.target.value)}
//                     required></TextField>
                    
//                     <TextField label="Email" 
//                     name="Email" 
//                     variant="outlined" 
//                     value={values.Email} onChange={(e) => setFieldValue("Email",e.target.value)}
//                     required></TextField>

//                     <TextField type="password"
//                      name="password" 
//                      label="Password" 
//                      variant="outlined" 
//                      value={values.Password} onChange={(e) => setFieldValue("Password",e.target.value)}
//                      required></TextField>

//                     <Button variant="contained" value='submit' onClick={HandleClick}>Login</Button>
//                     </div>
//                     </Form>
//                 )
//             }}

//         </Formik>
       
//     )

// }
// export default Form1;