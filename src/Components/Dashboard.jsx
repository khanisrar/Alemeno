import React, { useState, useEffect } from 'react';


const Dashboard = () => {
    const [progress, setProgress] = useState(0);
    const [courseData, setCourseData] = useState([]);
    const [userData, setUserData] = useState([]);


    const increaseProgress = (id) => {
        setCourseData(prevCourses => {
            return prevCourses.map(course =>
                course.id === id ? { ...course, progress: Math.min(course.progress + 10, 100) } : course
            );
        });
    };

    useEffect(() => {
        getCourses()
        userProfile()
    }, []);


    const getCourses = async () => {
        let result = await fetch('http://localhost:3214/enrolledCourses')
        result = await result.json();
        setCourseData(result);
    }
    const deleteCourse = async (id) => {
        let result = await fetch(`http://localhost:3214/enrolledCourses/${id}`,
            {
                method: 'DELETE'
            })
        result = await result.json();
        if (result) {
            getCourses()
        }
    }
    const userProfile = async () => {
        let result = await fetch('http://localhost:3214/profile')
        result = await result.json();
        setUserData(result);
    }

    return (
        <>
            <div className="container">
                <h1 className='head-text'>Dashboard</h1>
                <div className="user-profile">
                    <img src={userData.avatar} alt="userId" />
                    <div className='text'>
                        <h2 className='name'>{userData.name}</h2>
                        <p className="email">{userData.email}</p>
                    </div>
                </div>
                <div className="user-courses">

                    {courseData.map((item) =>
                        <div className="cards" key={item.id}>
                            <button className='deleteCourse' onClick={() => deleteCourse(item.id)}>&#x2716;</button>
                            <img src={item.thumbnail} alt="courses" />

                            <div className="content">
                                <h2 className='name'>{item.name}</h2>
                                <h3 className='inst-name'>{item.instructor}</h3>
                                {/* <i className='status'>{item.enrollmentStatus}</i> */}
                                <p>Due Date : {item.dueDate}</p>
                                <div className="progress-bar">
                                    <progress value={item.progress} max="100"></progress>
                                    {item.progress == 100 ? <p className='comp'>Completed</p> :
                                        <div className='progress-text'>
                                            <p>Progress: {item.progress}%</p>
                                            <button onClick={() => increaseProgress(item.id)}>+</button>
                                        </div>}

                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </>
    )
}

export default Dashboard;