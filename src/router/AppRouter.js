import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import AddOdds from '../components/AddOdds';
import OddsList from '../components/OddsList';
import EditOdds from '../components/EditOdds';
import '../styles.css';
import useLocalStorage from '../hooks/useLocalStorage'

const AppRouter = () => {
    const [odds, setOdds] = useLocalStorage('odds', []);
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <Routes>
            <Route element={<OddsList odds={odds} setOdds={setOdds} />} path="/" />
            <Route element={<AddOdds odds={odds} setOdds={setOdds} />} path="/add" />
            <Route element={<EditOdds odds={odds} setOdds={setOdds} />} path="/edit/:id" />
            <Route path="*" element={<Navigate to="/" />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;