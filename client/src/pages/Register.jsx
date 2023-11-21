import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { Avatar, Grid, Paper, TextField, Checkbox, FormControlLabel, Button, Typography, Link } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { AuthContext } from '../context/AuthContext';

export const Register = () => {
  const firstname = useRef();
  const lastname = useRef();
  const phone = useRef();
  const email = useRef();
  const password = useRef();
  const cpassword = useRef();
  const [role, setRole] = useState(null); 
  const [index, setIndex] = useState(null); 
  const [roleSelected, setRoleSelected] = useState(false);

  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { dispatch } = useContext(AuthContext);

  const handleRoleSelection = (role) => {
    setRole(role);
    setRoleSelected(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (cpassword.current.value !== password.current.value) {
      cpassword.current.setCustomValidity("Password don't match!");
    } else {
      const user = {
        firstname: firstname.current.value,
        lastname: lastname.current.value,
        phone: phone.current.value,
        email: email.current.value,
        password: password.current.value,
        role: role, 
        index: role ? null : index, 
      };
      
      try {
        await axios.post("http://localhost:8800/api/auth/register", user);

        // Dispatch login start action
        dispatch({ type: "LOGIN_START" });

        // Try to login the user
        const loginResponse = await axios.post("http://localhost:8800/api/auth/login", {
          email: user.email,
          password: user.password,
        });

        // Dispatch login success action
        dispatch({ type: "LOGIN_SUCCESS", payload: loginResponse.data });

        navigate("/");
      } catch (error) {
        // Dispatch login failure action
        dispatch({ type: "LOGIN_FAILURE", payload: error });
      }

      };
    }

  const paperStyle = {
    padding : 20,
    height: 'auto',
    width: 340,
    margin: "20px auto",
    backgroundColor : '#dfe6e9',
  }
  const avatarstyle ={ backgroundColor: '#1fbb60', margin: '20px'}
  const btnStyle = {margin: '10px 0',width : '100%' }
  const typoStyle = {margin: '5px 0'}
  const textStyle = {margin: '3px 0' }


  return (
    <div>
      {!roleSelected ? (
        <div className="studortech">
          <button onClick={() => handleRoleSelection(false)}>Student</button>
          <button onClick={() => handleRoleSelection(true)}>Teacher</button>
        </div>
      ) : (
            <Grid>
              <button onClick={() => navigate(-1)}>Go Back</button>
                <Paper  style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarstyle}><AddCircleIcon></AddCircleIcon></Avatar>
                        <h2>Sign Up</h2>
                    </Grid>
                    <Grid>
                    <form onSubmit={submitHandler}>
                        <div class="mb-3">
                            <input type="text" class="form-control" id="firstname" placeholder="Enter First Name" 
                            ref={firstname}/>
                        </div>
                        <div class="mb-3">
                            <input type="text" class="form-control" id="lastname" placeholder="Enter Last Name" 
                            ref={lastname}/>
                        </div>

                        <div class="mb-3">
                            <input type="text" class="form-control" id="email" placeholder="Enter Email"
                           ref={email}/>
                        </div>

                        <div class="mb-3">
                            <input type="contact" class="form-control" id="contact" placeholder="Enter Contact Number"
                            ref={phone}/>   
                        </div>
                        <div class="mb-3">
                            <input type="password" class="form-control" id="password" placeholder="Enter Password"
                            ref={password}/>   
                        </div>
                        <div class="mb-3">
                            <input type="password" class="form-control" id="cpassword" placeholder="ReEnter Password"
                            ref={cpassword}/>   
                        </div>

                        {/* <div class="mb-3">
                          <label>
                            <input type="checkbox" checked={role} onChange={(e) => setRole(e.target.checked)} />
                            I am a teacher
                          </label>
                        </div>*/}

                        {!role && (
                          <div class="mb-3">
                            <input type="text" class="form-control" id="index" placeholder="Enter Index" 
                            onChange={(e) => setIndex(e.target.value)} />
                          </div>
                        )} 

                        <button style={btnStyle} type="submit" class="btn btn-primary">Submit</button>
                     </form>

                     <Typography style={typoStyle}> I have an account..  
                          <a href="http://localhost:3000" >
                              <span>Sign In</span>
                          </a>
                          </Typography>   
                    </Grid>
                    
                </Paper>
            </Grid>
        )}
    </div>
  );
};
