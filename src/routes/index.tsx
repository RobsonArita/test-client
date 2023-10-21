import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListProperty from '../components/property/ListProperty'
import React from 'react';

function ApplicationRoutes({ selectedPath }: { selectedPath: string }) {
  console.log({ selectedPath })
  return (
    <Router>
      <Routes>
        <Route path={selectedPath} element={<ListProperty />} /> {/* Use <Route> para ListProperty */}
      </Routes>
    </Router>
  )
}

export default ApplicationRoutes
