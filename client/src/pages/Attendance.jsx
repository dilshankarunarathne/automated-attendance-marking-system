import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './Attendance.css'
import  { useContext ,useState} from 'react'
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Topbar from '../components/topbar/Topbar';

export default function Attendance() {
  const { user } = useContext(AuthContext);
  const [index, setIndex] = useState("");
  const [date, setDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  async function searchByIndex(e) {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8070/attendance/index/${index}`);
      setAttendanceData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function searchByDate(e) {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8070/attendance/date/${date}`);
      setAttendanceData(response.data);
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
