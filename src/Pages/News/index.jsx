import React from 'react';
import "./news.css"
import Sidebar from '../../Layout/Sidebar';
import Header from '../../Layout/Header';
import News from '../../Components/News/news';

const New = () => {
    return (
        <>

        <Sidebar />
        <Header />

        <div className="main-wrapper">
            <News />
        </div>
        </>
    )
}

export default New;