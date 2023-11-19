import { Divider } from '@mui/material';
import { margin } from '@mui/system';
import React, { useEffect } from 'react';
import axios from 'axios'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './feed.css'
import  { useContext ,useState} from 'react'
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Feed() {
  const { user } = useContext(AuthContext);
    const id = user.user._id;

  const logout = () => {
    localStorage.clear();
    navigator("/login");
  };

  const navigate = useNavigate();
    const [firstname, setFirstName] = useState(user.firstname);
    const [lastname, setLastName] = useState(user.lastname);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [age, setAge] = useState("");
    
    function sendData(e){
        e.preventDefault();
        
        const upStudent = {
            user,
            firstname,
            lastname,
            phone,
            email,
            gender,
            dateOfBirth,
            age,
        }
        
        const res = axios.put(`http://localhost:8800/users/${id}`, upStudent)
        .then(()=>{
            navigate("/");
        }).catch((err)=>{
            alert(err)
        })
        console.log(res);
    }

    useEffect(() => {
        axios.get(`http://localhost:8800/users/${id}`)
          .then((response) => {
            const userData = response.data;
            setFirstName(userData.firstname);
            setLastName(userData.lastname);
            setPhone(userData.phone);
            setEmail(userData.email);
            setGender(userData.gender);
            setDateOfBirth(userData.dateOfBirth);
            setAge(userData.age);
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);

  return (
    <div className='feed'>
        <div class="container rounded bg-white mt-5 mb-5">
          <div class="row">
              <div class="col-md-3 border-right">
                  <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span class="font-weight-bold">{user.firstname} {user.lastname}</span><span class="text-black-50">{user.email}</span><span> </span></div>
              </div>
              <div class="col-md-5 border-right">
                  <div class="p-3 py-5 settings">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                          <h4 class="text-right">Profile Settings</h4>
                      </div>

                    <form action="" onSubmit={sendData}>
                        <div class="row mt-2">
                            <div class="col-md-6"><label class="labels">First Name</label>
                            <input type="text" class="form-control" placeholder="first name" value={firstname}
                                    onChange={(e)=>{
                                        setFirstName(e.target.value);
                                    }}
                            /></div>

                            <div class="col-md-6"><label class="labels">Last Name</label>
                            <input type="text" class="form-control" value={lastname} placeholder="last name"
                                    onChange={(e)=>{
                                        setLastName(e.target.value);
                                    }}
                            /></div>
                        </div>
                        
                        <div class="row mt-3">
                            <div class="col-md-12"><label class="labels">Mobile Number</label>
                            <input type="text" class="form-control" placeholder="enter phone number" value={phone}
                                    onChange={(e)=>{
                                        setPhone(e.target.value);
                                    }}
                            /></div>
                            <div class="col-md-12"><label class="labels">Email</label>
                                <input type="text" class="form-control" placeholder="enter email" value={email} onChange={ (e)=>{
                                    setEmail(e.target.value);
                                }}/>
                            </div>
                            
                            <hr className='rule' />
                            
                            <div class="col-md-12"><label class="labels">Gender</label>
                            <select placeholder='Gender' className="form-control"  value={gender}
                                onChange={(e)=>{
                                    setGender(e.target.value);
                                }}
                            >
                                <option className='firstOption'>Select Gender</option>
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                            </select></div>

                            <div class="col-md-12"><label class="labels">Date of Birth</label>
                            <input type="Date" class="form-control" placeholder="date of birth" value={dateOfBirth}
                            onChange={(e)=>{
                                setDateOfBirth(e.target.value);
                            }}/>
                            </div>

                            <div class="col-md-12"><label class="labels">Age</label>
                            <input type="text" class="form-control" placeholder="enter your age" value={age} 
                            onChange={(e)=>{
                                setAge(e.target.value);
                            }}/>
                            </div>

                        </div>
                        
                        <div class="mt-5 text-center"><button class="btn btn-primary profile-button" onClick={sendData} type="button">Save Profile</button></div>
                    </form>


                  </div>
              </div>
              
          </div>
      </div>
      
      
    </div>
  )
}
