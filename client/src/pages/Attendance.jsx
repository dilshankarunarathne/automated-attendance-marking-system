import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './attendance.css'
import  { useContext ,useState} from 'react'
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
    <div className="attendance">
      <form onSubmit={sendData}>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}
