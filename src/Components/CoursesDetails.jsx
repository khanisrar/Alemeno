import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const CoursesDetails = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [data, setData] = useState(undefined);

    useEffect(() => {
        getCourseDtails();
    }, [id]);

    const getCourseDtails = async () => {
        let result = await fetch(`http://localhost:3214/courses/${id}`);
        result = await result.json();
        setData(result)
    }
    const enrollNow = () => {
        if (data) {
            fetch('http://localhost:3214/enrolledCourses', {
                method: 'POST',
                body: JSON.stringify({
                    ...data,
                    userid: '1',
                    enrollmentStatus: 'in-progress',
                    dueDate: '2024-03-15',
                    progress: 0,
                }),
            })
                .then(() => navigate('/'))
                .catch((error) => console.error('Enrolled Faild', error));

        }
    };

    if (!data) {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                className="loading-text"
            >
                Loading...
            </div>
        );
    }


    return (

        <>
            <div className="container">
                <h1 className='head-text'>Course Details</h1>
                <div className="details-container">
                    <div className="left">
                        <img src={data.thumbnail} alt="" />
                    </div>
                    <div className="right">
                        <div className='titles'>
                            <h2 className="name">{data.name}</h2>
                            <h3 className='ints-name'>{data.instructor}</h3>
                        </div>
                        <p className='des'>{data.description}</p>

                        <table>
                            <tr>
                                <td>Duration :</td>
                                <td>{data.duration}</td>
                            </tr>
                            <tr>
                                <td>Location :</td>
                                <td>{data.location}</td>
                            </tr>
                            <tr>
                                <td>Schedule :</td>
                                <td>{data.schedule}</td>
                            </tr>
                            <tr>
                                <td>Prerequisites :</td>
                                <td>{data.prerequisites.join(", ")}</td>
                            </tr>
                            <tr>
                                <td>Syllabus :</td>
                                <td>{data.syllabus.join(", ")}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <button className='enroll-btn' onClick={enrollNow}>Enroll Now</button>
            </div>

        </>
    )
}



export default CoursesDetails;