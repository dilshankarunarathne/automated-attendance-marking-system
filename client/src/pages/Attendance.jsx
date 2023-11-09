import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './Attendance.css'
import  { useContext ,useState} from 'react'
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Topbar from '../components/topbar/Topbar';

export default function Attendance() {

  const { user } = useContext(AuthContext);
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  
  async function sendData(e){
    e.preventDefault();
    
    const attendanceData = {
        date,
        status,
        userId: user._id
      };
    
      try {
        const response = await axios.post('http://localhost:8070/attendance', attendanceData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <div>
      <Topbar/>
      <div className="attendance">
      <form onSubmit={searchByIndex}>
        <label>Index:</label>
        <input type="text" value={index} onChange={(e) => setIndex(e.target.value)} />
        <button type="submit">Search by Index</button>
      </form>
      <form onSubmit={searchByDate}>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Search by Date</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((data) => (
            <tr key={data._id}>
              <td>{data.index}</td>
              <td>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
