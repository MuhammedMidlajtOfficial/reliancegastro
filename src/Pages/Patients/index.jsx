import React from 'react';
import "./patients.css"
import Sidebar from '../../Layout/Sidebar';
import Header from '../../Layout/Header';
import Patients from '../../Components/Patients/Patients';

const Patient = () => {
    return (
        <>

        <Sidebar />
        <Header />

        <div className="main-wrapper">
            <Patients />
        </div>
        </>
    )
}

export default Patient;