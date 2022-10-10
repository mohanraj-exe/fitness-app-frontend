import React from 'react';
import Home from '../src/pages/Home/Home';
import WorkoutForm from './pages/WorkoutForm/WorkoutForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/workoutForm' element={<WorkoutForm />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
