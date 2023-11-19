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

  const [maths, setMaths] = useState(0);
  const [sinhala, setSinhala] = useState(0);
  const [science, setScience] = useState(0);
  const [history, setHistory] = useState(0);
  const [religion, setReligion] = useState(0);
  const [english, setEnglish] = useState(0);
  const [cat1, setCat1] = useState(0);
  const [cat2, setCat2] = useState(0);
  const [cat3, setCat3] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`http://localhost:8800/students/result/${selectedStudent.index}`, {
        maths,
        sinhala,
        science,
        history,
        religion,
        english,
        cat1,
        cat2,
        cat3
      });
    } catch (error) {
      console.error('Failed to submit results', error);
    }
  };

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
                                <button onClick={() => setSelectedStudent(student)}>Add Results</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className='resultForm'>
                {selectedStudent && (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Maths: <input type="number" name="maths" value={maths} onChange={(e) => setMaths(e.target.value)} />
                            </label>
                            <label>
                                Sinhala: <input type="number" name="sinhala" value={sinhala} onChange={(e) => setSinhala(e.target.value)} />
                            </label>
                            <label>
                                Science: <input type="number" name="science" value={science} onChange={(e) => setScience(e.target.value)} />
                            </label>
                            <label>
                                History: <input type="number" name="history" value={history} onChange={(e) => setHistory(e.target.value)} />
                            </label>
                            <label>
                                Religion: <input type="number" name="religion" value={religion} onChange={(e) => setReligion(e.target.value)} />
                            </label>
                            <label>
                                English: <input type="number" name="english" value={english} onChange={(e) => setEnglish(e.target.value)} />
                            </label>
                            <label>
                                Cat1: <input type="number" name="cat1" value={cat1} onChange={(e) => setCat1(e.target.value)} />
                            </label>
                            <label>
                                Cat2: <input type="number" name="cat2" value={cat2} onChange={(e) => setCat2(e.target.value)} />
                            </label>
                            <label>
                                Cat3: <input type="number" name="cat3" value={cat3} onChange={(e) => setCat3(e.target.value)} />
                            </label>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    </div>
    )
}
