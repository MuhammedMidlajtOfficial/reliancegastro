import React from 'react';
import "./dashboard.css";
import Dashboards from '../../Components/Dashboard/Dashboards';
import Sidebar from '../../Layout/Sidebar';
import Header from '../../Layout/Header';

const Dashboard = () => {
    return (
        <>

        <Sidebar />
        <Header />

        <div className="main-wrapper">
            <Dashboards />
        </div>
        </>
    )
}

export default Dashboard;