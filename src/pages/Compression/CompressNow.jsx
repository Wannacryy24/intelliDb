import React from "react";
import './CompressNow.css';

const CompressNow = () => {
    return (
        <div className="compress-container">
            <div className="compress-spinner"></div>
            <p className="compress-text">Compressing... Please wait</p>
        </div>
    );
};

export default CompressNow;
