// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "./Dashboard.css";

// export const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const logout = () => {
//     localStorage.clear();
//     navigator("/login");
//   };
//   return (
//     <div>
//       <div class="dashboard">
//         <div class="navbar">
//           <nav>
//             <ul id="MenuItems">
//               <li>
//                 <a href="">Dashboard</a>
//               </li>

//               <li>
//                 <Link
//                   to={`/`}
//                   onClick={logout}
//                   // style={{ backgroundColor: "red", color: "white", padding: "20px" }}
//                 >
//                   Log Out
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//         <div className="propDetails">
//           <div>
//             <img
//               className="postProfileImg"
//               src={"http://localhost:8800/images/" + user.image}
//             ></img>
//           </div>
//           <div className="details">{user.firstname}</div>
//           <div className="details">{user.lastname}</div>
//           <div className="details">{user.email}</div>
//           <div className="details">{user.phone}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useContext } from 'react'
import Feed from '../components/feed/Feed';
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar'
import { AuthContext } from "../context/AuthContext";
 import "./Dashboard.css";

export default function Dashboard() {

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
    </div>

  )
}