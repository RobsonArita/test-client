import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importe BrowserRouter, Route e Routes
import ListProperty from '../components/property/ListProperty';
import RegisterProperty from '../components/property/RegisterProperty';
import PropertyDetails from '../components/property/ShowProperty';

function ApplicationRoutes() {
  return (
      <Routes>
        <Route path="/property/list" element={<ListProperty />} />
        <Route path="/property/register" element={<RegisterProperty />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="*" element={<ListProperty />} />
      </Routes>
  );
}

export default ApplicationRoutes;
