import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function Results() {
  const { user } = useContext(AuthContext);
  const [index, setIndex] = useState("");
  const [resultsData, setResultsData] = useState([]);

  async function searchByIndex(e) {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8070/results/${index}`);
      setResultsData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="results">
      <form onSubmit={searchByIndex}>
        <label>Index:</label>
        <input type="text" value={index} onChange={(e) => setIndex(e.target.value)} />
        <button type="submit">Search by Index</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Grade</th>
            <th>Semester</th>
            <th>Subject</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          {resultsData.map((data) => (
            <tr key={data._id}>
              <td>{data.index}</td>
              <td>{data.grade}</td>
              <td>{data.semester}</td>
              <td>{data.subject}</td>
              <td>{data.mark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
