
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import CoursesDetails from './Components/CoursesDetails';
import CoursesList from './Components/CoursesList';

const App = () => {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/courses-list' element={<CoursesList />} />
          <Route path='courses-details/:id' element={<CoursesDetails />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
