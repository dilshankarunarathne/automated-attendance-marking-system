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

  const [selectedStudent, setSelectedStudent] = useState(null);

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
                            <td>
                                <button onClick={() => setSelectedStudent(student.index)}>Add Results</button>
                                {selectedStudent === student.index && (
                                    <div>
                                        <form>
                                            <label>
                                                Maths: <input type="number" name="maths" />
                                            </label>
                                            <label>
                                                Sinhala: <input type="number" name="sinhala" />
                                            </label>
                                            <label>
                                                Science: <input type="number" name="science" />
                                            </label>
                                            <label>
                                                History: <input type="number" name="history" />
                                            </label>
                                            <label>
                                                Religion: <input type="number" name="religion" />
                                            </label>
                                            <label>
                                                English: <input type="number" name="english" />
                                            </label>
                                            <label>
                                                Cat1: <input type="number" name="cat1" />
                                            </label>
                                            <label>
                                                Cat2: <input type="number" name="cat2" />
                                            </label>
                                            <label>
                                                Cat3: <input type="number" name="cat3" />
                                            </label>
                                            <button type="submit">Submit</button>
                                        </form>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    </div>
  )
}
