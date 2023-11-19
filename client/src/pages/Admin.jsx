import React, { useContext, useState, useEffect } from 'react'
import Feed from '../components/feed/Feed';
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar'
import { AuthContext } from "../context/AuthContext";
import "./Admin.css";
import axios from 'axios';

export default function AdminPage() {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch students', error);
      }
    };
  
    fetchData();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigator("/login");
  };

  return (
    <div>
        <Topbar/>
        <div className="homeContainer">
            {/* <Sidebar/> */}
            
            <div className='studentList'>
                <table>
                    <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Student Index</th>
                        <th>Add Results</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((student) => (
                        <tr key={student.index}>
                        <td>{student.name}</td>
                        <td>{student.index}</td>
                        <td><button>Add Results</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    </div>
  )
}
