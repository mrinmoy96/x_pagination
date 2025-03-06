// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";

const App = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                alert("Failed to fetch data");
            }
        };
        fetchData();
    }, []);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

    const nextPage = () => {
        if (currentPage < Math.ceil(data.length / rowsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Employee Data Table</h2>
            <table border="1" style={{ width: "80%", margin: "auto", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "green", color: "white" }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: "10px" }}>
                <button onClick={prevPage} disabled={currentPage === 1}  style={{backgroundColor: "green", color: "white" }}>
                    Previous
                </button>
                <span style={{ margin: "0px 20px", padding:"5px 5px", backgroundColor: "green", color: "white"  }}>{currentPage}</span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(data.length / rowsPerPage)}  style={{backgroundColor: "green", color: "white" }}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default App;
