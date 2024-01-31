import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';


const CoursesList = () => {
    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getUsers()
    }, []);

    const getUsers = async () => {
        let result = await fetch("http://localhost:3214/courses");
        result = await result.json();
        setData(result);
        setFilteredData(result);

    }
    const filterCourses = () => {
        if (searchInput.length == 0) {
            setFilteredData([...data]);
            return;
        }
        const filteredCourses = data.filter(
            item =>
                item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.instructor.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredData(filteredCourses);
    };
    const refresh = () => {
        window.location.reload();
    }
    const enrollNow = ({ id, ...course }) => {
        fetch('http://localhost:3214/enrolledCourses',
            {
                method: 'POST',
                body: JSON.stringify({
                    ...course, userid: '1', enrollmentStatus: 'in-progress', dueDate: '2024-03-15', progress: 0
                }),
            }
        )
            .then(() => navigate('/'))
            .catch((error) => console.error('Enrollment failed:', error));
    }
    return (
        <>
            <div className="container">
                <h1 className="head-text">Courses List</h1>

                <div className="top-content">
                    <div className="serch-container">

                        <input type="text" placeholder="Search Here..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        <button onClick={filterCourses}>Search</button>
                    </div>
                    <button className="ref-btn" onClick={refresh}>Refresh</button>
                </div>
                <div className="scrollTable">
                    <table>
                        <tr>
                            <th>S.N.</th>
                            <th>Name</th>
                            <th>Instructor's name</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                        {filteredData.length == 0 &&
                            <tr style={{ textAlign: "center" }}>
                                <td colSpan={5}>No data found</td>
                            </tr>

                        }
                        {

                            filteredData.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.instructor}</td>
                                    <td>{item.location}</td>
                                    <td>
                                        <Link to={`/courses-details/${item.id}`}> Details</Link>
                                        <Link onClick={() => enrollNow(item)}>Enroll</Link>
                                    </td>

                                </tr>
                            )
                        }

                    </table>
                </div>
            </div >

        </>
    )
}

export default CoursesList