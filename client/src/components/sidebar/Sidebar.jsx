import React, { useContext } from 'react'
import  './sidebar.css'
import GroupsIcon from '@mui/icons-material/Groups';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import PaymentIcon from '@mui/icons-material/Payment';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink, useLocation } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext'

export default function Sidebar() {
  const location = useLocation(); 
  const { user } = useContext(AuthContext); 

  const role = user.role;
  console.log(role);

  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
          <ul className="sidebarList">
          <hr className='sidebarHr'/>
              <li className={`sidebarListItem ${location.pathname === "/" ? "activeLink" : ""}`}>
                  <HomeIcon className='sidebarIcon'/>
                  <NavLink exact to="/"><span  className="sidebarListItemText" >
                    Home
                  </span></NavLink>
              </li>
              
              {role !== false && (
                <li className={`sidebarListItem ${location.pathname === "/Admin" ? "activeLink" : ""}`}>
                    <GroupsIcon className='sidebarIcon'/>
                    <NavLink to="/Admin"><span  className="sidebarListItemText" >
                      Students
                    </span></NavLink>
                </li>
              )}

              <li className={`sidebarListItem ${location.pathname === "/attendance" ? "activeLink" : ""}`}>
                  <NoteAltIcon className='sidebarIcon'/>
                  <NavLink to="/attendance" className="sidebarListItemText">
                    Attendance
                  </NavLink>
              </li>
              <li className={`sidebarListItem ${location.pathname === "/results" ? "activeLink" : ""}`}>
                  <PaymentIcon className='sidebarIcon'/>
                  <NavLink to="/results" className="sidebarListItemText">
                    Results
                  </NavLink>
              </li>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>

          </ul>
          
          <hr className='sidebarHr'/>
          <span className="sidebarBootomListItemText">
               Dimuthu Pre School <br/>
               Negombo Road <br/>
               Kotadeniyawa <br/><br></br>
               +94 70 211 5657 <br/>
               www.dimuthupreschool.com <br/>
               dimuthupscl@gmail.com
          </span>
      </div>
    </div>
  )
}
