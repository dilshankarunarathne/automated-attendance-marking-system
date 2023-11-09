import { Divider } from '@mui/material';
import { margin } from '@mui/system';
import React from 'react'
import axios from 'axios'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './feed.css'
import  { useContext ,useState} from 'react'
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Feed() {

  const { user } = useContext(AuthContext);
  const logout = () => {
    localStorage.clear();
    navigator("/login");
  };

  const navigate = useNavigate();
    const [firstname, setFirstName] = useState(user.firstname);
    const [lastname, setLastName] = useState(user.lastname);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    
    function sendData(e){
        e.preventDefault();
        
        const upStudent = {
             firstname,
             lastname,
             phone
         }
        
        axios.put(`http://localhost:8070/${user._id}`,upStudent)
        .then(()=>{
            navigate("/");
            console.log("first")
        }).catch((err)=>{
            alert(err)
        })


    }

  return (
    <div className='feed'>
        <div class="container rounded bg-white mt-5 mb-5">
          <div class="row">
              <div class="col-md-3 border-right">
                  <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span class="font-weight-bold">{user.firstname} {user.lastname}</span><span class="text-black-50">{user.email}</span><span> </span></div>
              </div>
              <div class="col-md-5 border-right">
                  <div class="p-3 py-5">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                          <h4 class="text-right">Profile Settings</h4>
                      </div>

                    <form action="" onSubmit={sendData}>
                        <div class="row mt-2">
                            <div class="col-md-6"><label class="labels">First Name</label><input type="text" class="form-control" placeholder="first name" value={firstname}
                                    onChange={(e)=>{
                                        setFirstName(e.target.value);
                                    }}
                            /></div>
                            <div class="col-md-6"><label class="labels">Last Name</label><input type="text" class="form-control" value={lastname} placeholder="last name"
                                    onChange={(e)=>{
                                        setLastName(e.target.value);
                                    }}
                            /></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder="enter phone number" value={phone}
                                    onChange={(e)=>{
                                        setPhone(e.target.value);
                                    }}
                            /></div>
                            <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control" placeholder="enter email" value={email}/></div>
                            
                            <hr className='rule' />
                            
                            <div class="col-md-12"><label class="labels">Gender</label>
                            <select placeholder='Gender' className="form-control"  value=""
                                // onChange={(e)=>{
                                //     setGender(e.target.value);
                                // }}
                            >
                                <option className='firstOption'>Select Gender</option>
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                            </select></div>
                            <div class="col-md-12"><label class="labels">Date of Birth</label><input type="Date" class="form-control" placeholder="date of birth" value=""/></div>
                            <div class="col-md-12"><label class="labels">Age</label><input type="text" class="form-control" placeholder="enter your age" value=""/></div>
                            <div class="col-md-12"><label class="labels">Height</label><input type="text" class="form-control" placeholder="enter height in centemeters" value=""/></div>
                            <div class="col-md-12"><label class="labels">Weight</label><input type="text" class="form-control" placeholder="enter weight in kilograms" value=""/></div>
                            <div class="col-md-12"><label class="labels">BMI Value</label><input type="text" class="form-control" placeholder="your BMI value" value=""/></div>
                        </div>
                        
                        <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
                    </form>


                  </div>
              </div>
              {/* <div class="col-md-4">
                  <div class="p-3 py-5">
                      <div class="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span class="border px-3 p-1 add-experience"><i class="fa fa-plus"></i>&nbsp;Experience</span></div><br/>
                      <div class="col-md-12"><label class="labels">Experience in Designing</label><input type="text" class="form-control" placeholder="experience" value=""/></div> <br/>
                      <div class="col-md-12"><label class="labels">Additional Details</label><input type="text" class="form-control" placeholder="additional details" value=""/></div>
                  </div>
              </div> */}
          </div>
      </div>
      
      
    </div>
  )
}
