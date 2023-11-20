import React, { useContext, useRef, useState } from "react";
import { loginCall } from "../apiCalls";
import "./Login.css";
import { Avatar, Grid, Paper, TextField, Checkbox, FormControlLabel, Button, Typography, Link } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

import { AuthContext } from "../context/AuthContext";

export const Login = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const [roleSelected, setRoleSelected] = useState(false);

  const handleRoleSelection = () => {
    setRoleSelected(true);
  };

  const handleGoBack = () => {
    setRoleSelected(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(email.current.value);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    )
    .then((response) => {
      console.log(response.role);
      // Check the user's role and redirect
      if (response.role === true) {
        // Redirect to admin homepage
        window.location.href = "/";
      } else {
        // Redirect to user homepage
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  console.log(user);

  const paperStyle = {
    padding : 20,
    height: 'auto',
    width: '60%',
    margin: "20px auto",
  }
  const avatarstyle ={ backgroundColor: '#1fbb60', margin: '20px'}
  const btnStyle = {margin: '10px 0', width : '100%'}
  const typoStyle = {margin: '5px 0'}
  const textStyle = {margin: '3px 0'}


  return (
    <div>
      {!roleSelected ? (
        <div className="studortech">
          <button onClick={handleRoleSelection}>Student</button>
          <button onClick={handleRoleSelection}>Teacher</button>
        </div>
      ) : (
            <Grid>
              <button onClick={handleGoBack}>Go Back</button>
                <Paper  style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarstyle}><LockIcon></LockIcon></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <form onSubmit={handleClick}>
                      <Grid align='left'>
                        <div class="mb-3">
                            <input type="text" class="form-control" id="email" placeholder="Enter Email"
                           ref={email}/>
                        </div>
                
                        <div class="mb-3">
                            <input type="password" class="form-control" id="password" placeholder="Enter Password"
                            ref={password}/>   
                        </div>

                        <FormControlLabel  control={<Checkbox  />} label="Remember me"  /><br></br>


                        <button style={btnStyle} type="submit" class="btn btn-primary">Submit</button>

                          <Typography style={typoStyle}>
                              <Link href='#'>
                                  frogot password ?
                              </Link>
                          </Typography>
                          <Typography style={typoStyle}> I don't have an account.. 
                          <a href="http://localhost:3000/Signup" >
                              <span>Sign Up</span>
                          </a>
                          </Typography>
                      </Grid>
                    </form>
                    
                </Paper>
            </Grid>
        )}
      </div>
  );
};
