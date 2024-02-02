import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import ListProperty from '../components/property/ListProperty'
import React from 'react';
import RegisterProperty from '../components/property/RegisterProperty';

function ApplicationRoutes({ selectedPath }: { selectedPath: string }) {
  console.log({ selectedPath })
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={getComponent(selectedPath)} />
      </Routes>
    </Router>
  )
}

function getComponent(selectedPath: string) {
  switch (selectedPath) {
    case '/property/list':
      return <ListProperty />;
    case '/property/register':
      return <RegisterProperty />;
    default:
      return <ListProperty />;
  }
}


export default ApplicationRoutes
