import React from 'react'
import  './sidebar.css'
import GroupsIcon from '@mui/icons-material/Groups';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import PaymentIcon from '@mui/icons-material/Payment';
import HomeIcon from '@mui/icons-material/Home';


export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
          <ul className="sidebarList">
          <hr className='sidebarHr'/>
              <li className="sidebarListItem" >
                  <HomeIcon className='sidebarIcon'/>
                  <a href="/"><span  className="sidebarListItemText" >
                    Home
                  </span></a>
              </li>
              <li className="sidebarListItem" >
                  <GroupsIcon className='sidebarIcon'/>
                  <a href=""><span  className="sidebarListItemText" >
                    Students
                  </span></a>
              </li>
              <li className="sidebarListItem" onClick={"/student"}>
                  <a><NoteAltIcon className='sidebarIcon'/></a>
                  <a className="sidebarListItemText" href='/attendance'>
                    Attendence
                  </a>
              </li>
              <li className="sidebarListItem">
                  <PaymentIcon className='sidebarIcon'/>
                  <a className="sidebarListItemText" href='/results'>
                    Results
                  </a>
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
