import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import "./Results.css";
import Topbar from '../components/topbar/Topbar';


export default function Results() {
  const { user } = useContext(AuthContext);
  const [index, setIndex] = useState("");
  const [resultsData, setResultsData] = useState([]);

  async function searchByIndex(e) {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8800/results/${index}`);
      setResultsData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
        <Topbar/>
        <div className="results">
          <form onSubmit={searchByIndex} className="results-form">
            <label>Index:</label>
            <input type="text" value={index} onChange={(e) => setIndex(e.target.value)} />
            <button type="submit">Search by Index</button>
          </form>
          <table className="results-table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Semester</th>
                <th>Maths</th>
                <th>Sinhala</th>
                <th>Science</th>
                <th>History</th>
                <th>Religion</th>
                <th>English</th>
                <th>CAT1</th>
                <th>CAT2</th>
                <th>CAT3</th>
              </tr>
            </thead>
            <tbody>
              {resultsData.map((data) => (
                <tr key={data._id}>
                  <td>{data.index}</td>
                  <td>{data.semester}</td>
                  <td>{data.maths}</td>
                  <td>{data.sinhala}</td>
                  <td>{data.science}</td>
                  <td>{data.history}</td>
                  <td>{data.religion}</td>
                  <td>{data.english}</td>
                  <td>{data.cat1}</td>
                  <td>{data.cat2}</td>
                  <td>{data.cat3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}
