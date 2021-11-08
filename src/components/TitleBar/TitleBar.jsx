import React from 'react';
import './TitleBar.css';

const TitleBar = (props) => {
    return ( 
        <div className = "row row-space">
            <div className = "col-md-12" style = {{padding: 0}}>
                <div className = "titlebar-nav">
                    <h1>Ok some words</h1>
                </div>
            </div>
        </div>
     );
}
 
export default TitleBar;