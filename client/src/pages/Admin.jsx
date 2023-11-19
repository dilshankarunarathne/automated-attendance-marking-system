import React, { useContext } from 'react'
import Feed from '../components/feed/Feed';
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar'
import { AuthContext } from "../context/AuthContext";
import "./Dashboard.css";

export default function AdminPage() {
  const { user } = useContext(AuthContext);
  const logout = () => {
    localStorage.clear();
    navigator("/login");
  };

  return (
    <div>
        <Topbar/>
        <div className="homeContainer">
            <Sidebar/>
            <Feed/>
        </div>

        <div className='studentList'>

        </div>
    </div>
  )
}
