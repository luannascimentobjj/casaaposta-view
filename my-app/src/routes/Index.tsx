import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import { Table } from '../pages/Table';

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/table" element={<Table />}/>
    </Routes>
  )
}

export default Index