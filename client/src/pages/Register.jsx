import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { Avatar, Grid, Paper, TextField, Checkbox, FormControlLabel, Button, Typography, Link } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle'


export const Register = () => {
  const firstname = useRef();
  const lastname = useRef();
  const phone = useRef();
  const email = useRef();
  const password = useRef();
  const cpassword = useRef();
  //const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  
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
      };
      //console.log(user);
      // if (file) {
      //   const data = new FormData();
      //   const fileName = Date.now() + file.name;
      //   data.append("name", fileName);
      //   data.append("file", file);
  
      //   user.image = fileName;
      //   console.log(user.image);
      //   try {
      //     await axios.post("http://localhost:8800/api/upload", data);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
      try {
        await axios.post("http://localhost:8800/api/auth/register", user);
        navigate("/");
      } catch (error) {}
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
           
            <Grid>
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
        </div>
  );
};
